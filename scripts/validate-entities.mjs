#!/usr/bin/env node
/**
 * Entity-graph validator.
 *
 * Structural checks always run against `dist/`:
 *   - every JSON-LD block parses
 *   - no duplicate @id inside a single document
 *   - every internal @id reference resolves somewhere in the build
 *   - the canonical Person node is present and identical wherever it is declared
 *   - ProfilePage nodes carry mainEntity, isPartOf, inLanguage and dateModified
 *
 * `--online` additionally fetches every sameAs URL and fails on 404/410.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const DIST = "dist";
const SITE_ORIGIN = "https://maksim-sokal.github.io";
const PERSON_ID = `${SITE_ORIGIN}/#person`;
const online = process.argv.includes("--online");

const failures = new Set();
const warnings = new Set();

const walk = (dir) =>
  readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    return statSync(path).isDirectory() ? walk(path) : path.endsWith(".html") ? [path] : [];
  });

const files = walk(DIST);
if (files.length === 0) {
  console.error("No HTML in dist/. Run `npm run build` first.");
  process.exit(1);
}

const isDefinition = (value) =>
  value && typeof value === "object" && typeof value["@id"] === "string" && Object.keys(value).length > 1;

const isReference = (value) =>
  value && typeof value === "object" && typeof value["@id"] === "string" && Object.keys(value).length === 1;

const collectDefinitions = (value, ids) => {
  if (Array.isArray(value)) {
    for (const item of value) collectDefinitions(item, ids);
    return ids;
  }
  if (value && typeof value === "object") {
    if (isDefinition(value)) ids.add(value["@id"]);
    for (const item of Object.values(value)) collectDefinitions(item, ids);
  }
  return ids;
};

const collectReferences = (value, refs) => {
  if (Array.isArray(value)) {
    for (const item of value) collectReferences(item, refs);
    return refs;
  }
  if (value && typeof value === "object") {
    if (isReference(value)) {
      refs.add(value["@id"]);
      return refs;
    }
    for (const item of Object.values(value)) collectReferences(item, refs);
  }
  return refs;
};

const collectSameAs = (value, urls) => {
  if (Array.isArray(value)) {
    for (const item of value) collectSameAs(item, urls);
    return urls;
  }
  if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      if (key === "sameAs") {
        for (const url of Array.isArray(item) ? item : [item]) {
          if (typeof url === "string") urls.add(url);
        }
      } else {
        collectSameAs(item, urls);
      }
    }
  }
  return urls;
};

const documents = [];
const knownIds = new Set();

for (const file of files) {
  const name = relative(DIST, file);
  const html = readFileSync(file, "utf8");
  const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];

  if (blocks.length === 0) {
    if (!name.includes("404") && !name.startsWith("google")) {
      warnings.add(`${name}: no JSON-LD block`);
    }
    continue;
  }

  const nodes = [];
  for (const [, raw] of blocks) {
    let graph;
    try {
      graph = JSON.parse(raw);
    } catch (error) {
      failures.add(`${name}: invalid JSON-LD — ${error.message}`);
      continue;
    }
    const graphNodes = Array.isArray(graph) ? graph : (graph["@graph"] ?? [graph]);
    for (const node of graphNodes) {
      nodes.push(node);
      collectDefinitions(node, knownIds);
    }
  }

  documents.push({ name, nodes });
}

// Second pass: references can point at nodes declared on another page.
for (const { name, nodes } of documents) {
  const ids = new Set();
  for (const node of nodes) {
    const topLevelId = node?.["@id"];
    if (topLevelId) {
      if (ids.has(topLevelId)) failures.add(`${name}: duplicate @id ${topLevelId}`);
      ids.add(topLevelId);
    }

    const types = Array.isArray(node?.["@type"]) ? node["@type"] : [node?.["@type"]];
    if (types.includes("ProfilePage")) {
      if (!node.mainEntity) failures.add(`${name}: ProfilePage without mainEntity`);
      if (!node.isPartOf) failures.add(`${name}: ProfilePage without isPartOf`);
      if (!node.dateModified) failures.add(`${name}: ProfilePage without dateModified`);
      if (node.inLanguage !== "en") failures.add(`${name}: ProfilePage without inLanguage`);
    }
  }

  const refs = collectReferences(nodes, new Set());
  for (const ref of refs) {
    if (ref.startsWith(SITE_ORIGIN) && ref.includes("#") && !knownIds.has(ref)) {
      failures.add(`${name}: unresolved internal reference ${ref}`);
    }
  }
}

const canonicalPersons = documents.flatMap(({ name, nodes }) =>
  nodes.filter((node) => node?.["@id"] === PERSON_ID).map((node) => ({ name, node })),
);

if (canonicalPersons.length === 0) {
  failures.add(`Canonical Person node ${PERSON_ID} not found`);
} else {
  const baseline = JSON.stringify(canonicalPersons[0].node);
  for (const { name, node } of canonicalPersons.slice(1)) {
    if (JSON.stringify(node) !== baseline) {
      failures.add(`${name}: Person node differs from the canonical declaration`);
    }
  }
}

if (online) {
  const urls = new Set();
  for (const { nodes } of documents) {
    for (const node of nodes) {
      if (node?.["@id"] === PERSON_ID) collectSameAs(node, urls);
    }
  }

  const queue = [...urls];
  const workers = Array.from({ length: 5 }, async () => {
    while (queue.length > 0) {
      const url = queue.shift();
      try {
        const response = await fetch(url, {
          redirect: "follow",
          signal: AbortSignal.timeout(15000),
          headers: { "user-agent": "entity-validator/1.0 (+https://maksim-sokal.github.io/)" },
        });
        if (response.status === 404 || response.status === 410) {
          failures.add(`sameAs ${response.status}: ${url}`);
        } else if (!response.ok) {
          warnings.add(`sameAs ${response.status} (bot protection?): ${url}`);
        }
      } catch (error) {
        warnings.add(`sameAs unreachable: ${url} — ${error.message}`);
      }
    }
  });
  await Promise.all(workers);
}

for (const warning of warnings) console.warn(`warn  ${warning}`);
for (const failure of failures) console.error(`fail  ${failure}`);

const nodeCount = documents.reduce((total, doc) => total + doc.nodes.length, 0);
console.log(
  `\n${documents.length} documents, ${nodeCount} JSON-LD nodes, ${knownIds.size} unique @ids` +
    `\n${failures.size} failures, ${warnings.size} warnings${online ? " (online sameAs check)" : ""}`,
);

process.exit(failures.size > 0 ? 1 : 0);
