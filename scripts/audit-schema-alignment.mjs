#!/usr/bin/env node
/**
 * Schema-to-page alignment audit.
 *
 * Checks that claims made in JSON-LD are supported by the rendered page:
 *   - FAQ questions and answers appear in visible text
 *   - HowTo steps appear in visible text
 *   - Review bodies appear in visible text
 *   - Product names/descriptions appear in visible text
 *   - Defined terms appear in visible text
 *   - Article headlines, images, authors and dates are visible
 *   - WebAPI documentation links are present
 *   - Breadcrumb and ItemList labels are visible
 *
 * Usage: node scripts/audit-schema-alignment.mjs
 * Requires dist/ (run npm run build first).
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const DIST = "dist";

const decode = (value) =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, " ");

const visibleText = (html) =>
  decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();

const norm = (value) => decode(String(value ?? "")).replace(/\s+/g, " ").trim();

const includesText = (pageText, value) => {
  const needle = norm(value);
  if (!needle) return true;
  if (pageText.includes(needle)) return true;
  // Long strings can differ by a single punctuation mark; compare the first 120 chars.
  if (needle.length > 120) return pageText.includes(needle.slice(0, 120));
  return false;
};

const walk = (dir) =>
  readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    return statSync(path).isDirectory() ? walk(path) : path.endsWith(".html") ? [path] : [];
  });

const files = walk(DIST);
if (files.length === 0) {
  console.error("No HTML in dist/. Run npm run build first.");
  process.exit(1);
}

const issues = [];

const add = (page, type, field, detail) => issues.push({ page, type, field, detail });

for (const file of files) {
  const name = relative(DIST, file);
  const html = readFileSync(file, "utf8");
  const text = visibleText(html);
  const hrefs = new Set([...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]));
  const images = new Set([
    ...[...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1]),
    ...[...html.matchAll(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/g)].map((m) => m[1]),
  ]);

  const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  if (blocks.length === 0) continue;

  const nodes = [];
  for (const [, raw] of blocks) {
    try {
      const graph = JSON.parse(raw);
      nodes.push(...(Array.isArray(graph) ? graph : (graph["@graph"] ?? [graph])));
    } catch {
      add(name, "JSON-LD", "parse", "invalid JSON");
    }
  }

  const byId = new Map(nodes.filter((node) => node?.["@id"]).map((node) => [node["@id"], node]));
  const typesOf = (node) => (Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]]);
  const nameOf = (ref) => byId.get(ref?.["@id"])?.name ?? "";

  for (const node of nodes) {
    const types = typesOf(node);

    if (types.includes("FAQPage")) {
      for (const question of node.mainEntity ?? []) {
        if (!includesText(text, question.name)) add(name, "FAQPage", "question", question.name);
        if (!includesText(text, question.acceptedAnswer?.text)) add(name, "FAQPage", "answer", question.name);
      }
    }

    if (types.includes("HowTo")) {
      for (const step of node.step ?? []) {
        if (!includesText(text, step.name)) add(name, "HowTo", "step name", step.name);
        if (!includesText(text, step.text)) add(name, "HowTo", "step text", step.name);
      }
    }

    if (types.includes("Review") && node.reviewBody) {
      if (!includesText(text, node.reviewBody)) add(name, "Review", "reviewBody", node.name ?? node["@id"]);
    }

    if (types.includes("Product")) {
      if (!includesText(text, node.name)) add(name, "Product", "name", node.name);
      if (node.description && !includesText(text, node.description)) add(name, "Product", "description", node.name);
    }

    if (types.includes("DefinedTermSet")) {
      for (const term of node.hasDefinedTerm ?? []) {
        if (!includesText(text, term.name)) add(name, "DefinedTermSet", "term", term.name);
        if (!includesText(text, term.description)) add(name, "DefinedTermSet", "definition", term.name);
      }
    }

    if (types.some((type) => ["TechArticle", "Article", "BlogPosting", "NewsArticle"].includes(type))) {
      const headline = node.headline ?? node.name;
      const alternative = node.alternativeHeadline;
      if (!includesText(text, headline) && !(alternative && includesText(text, alternative))) {
        add(name, "Article", "headline", headline);
      }

      if (node.image) {
        const imageValue = Array.isArray(node.image) ? node.image[0] : node.image;
        const imageUrl = typeof imageValue === "string" ? imageValue : imageValue.url;
        const path = new URL(imageUrl, "https://example.com").pathname;
        if (![...images].some((src) => new URL(src, "https://example.com").pathname === path)) {
          add(name, "Article", "image", imageUrl);
        }
      }

      const authorName = nameOf(node.author);
      if (authorName && !includesText(text, authorName)) add(name, "Article", "author", authorName);

      if (node.dateModified) {
        const iso = String(node.dateModified).slice(0, 10);
        const [year, month, day] = iso.split("-");
        const formatted = new Intl.DateTimeFormat("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone: "UTC",
        }).format(new Date(`${iso}T00:00:00Z`));
        if (!text.includes(iso) && !text.includes(formatted) && !text.includes(`${day}/${month}/${year}`)) {
          add(name, "Article", "dateModified", iso);
        }
      }
    }

    if (types.includes("WebAPI")) {
      if (!includesText(text, node.name)) add(name, "WebAPI", "name", node.name);
      if (node.documentation && !hrefs.has(node.documentation)) {
        add(name, "WebAPI", "documentation", node.documentation);
      }
      if (node.termsOfService && !hrefs.has(node.termsOfService)) {
        add(name, "WebAPI", "termsOfService", node.termsOfService);
      }
    }

    if (types.includes("ProfilePage") && node.dateModified) {
      const iso = String(node.dateModified).slice(0, 10);
      const formatted = new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }).format(new Date(`${iso}T00:00:00Z`));
      if (!text.includes(iso) && !text.includes(formatted)) {
        add(name, "ProfilePage", "dateModified", iso);
      }
    }

    if (types.includes("BreadcrumbList")) {
      for (const item of node.itemListElement ?? []) {
        if (!includesText(text, item.name)) add(name, "BreadcrumbList", "name", item.name);
      }
    }

    if (types.includes("CollectionPage") && node.mainEntity?.itemListElement) {
      for (const item of node.mainEntity.itemListElement) {
        if (item.name && !includesText(text, item.name)) add(name, "CollectionPage", "item name", item.name);
      }
    }
  }
}

if (issues.length === 0) {
  console.log(`Schema alignment: ${files.length} pages checked, no mismatches.`);
  process.exit(0);
}

console.log(`Schema alignment: ${issues.length} mismatches across ${new Set(issues.map((issue) => issue.page)).size} pages.\n`);
for (const issue of issues) {
  console.log(`${issue.page} | ${issue.type}.${issue.field} | ${String(issue.detail).slice(0, 150)}`);
}
