export interface PracticeMeta {
  label: string;
  hubPath: string;
  hubTitle: string;
  description: string;
  profilePath: string;
  profileLabel: string;
}

export const PRACTICES: Record<"defi" | "seo", PracticeMeta> = {
  defi: {
    label: "DeFi Risk",
    hubPath: "/research/defi/",
    hubTitle: "DeFi Risk Research",
    description:
      "Invariant audits, EVM forensics, AMM mathematics and on-chain measurement — written from audit practice rather than theory.",
    profilePath: "/",
    profileLabel: "DeFi profile",
  },
  seo: {
    label: "Search Strategy",
    hubPath: "/research/seo/",
    hubTitle: "Search Strategy Research",
    description:
      "Entity architecture, E-E-A-T systems, technical search engineering and AI citation mechanics.",
    profilePath: "/seo-expert/",
    profileLabel: "SEO profile",
  },
};

export function readingTime(body: string | undefined): number {
  const words = body?.trim().split(/\s+/).filter(Boolean).length ?? 0;
  return Math.max(1, Math.ceil(words / 220));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
