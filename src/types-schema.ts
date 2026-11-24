export type GraphNode = Record<string, unknown>;

export interface JsonLdGraph {
  "@context": "https://schema.org";
  "@graph": GraphNode[];
}

export interface KnowledgeTopic {
  name: string;
  sameAs?: string;
  description?: string;
}

export interface SkillTerm {
  name: string;
  sameAs?: string;
  description: string;
}

export interface ServiceOffer {
  name: string;
  serviceType: string;
  url: string;
  category: string;
  description: string;
  providerId: string;
}
