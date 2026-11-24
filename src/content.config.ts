import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const research = defineCollection({
  loader: glob({ base: "./src/content/research", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    dek: z.string(),
    practice: z.enum(["defi", "seo"]),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    topics: z
      .array(
        z.object({
          name: z.string(),
          sameAs: z.string().url().optional(),
        }),
      )
      .min(1),
    sources: z
      .array(
        z.object({
          name: z.string(),
          url: z.string().url(),
          publisher: z.string(),
        }),
      )
      .min(1),
    related: z.array(z.string()).default([]),
  }),
});

export const collections = { research };
