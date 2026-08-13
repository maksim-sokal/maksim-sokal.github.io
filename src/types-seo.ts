export interface SeoBioData {
  name: string;
  tagline: string;
  role: string;
  org: string;
  orgUrl: string;
  experienceSince: string;
  experienceYears: number;
  location: string;
  email: string;
  linkedin: string;
  website: string;
  overview: string;
}

export interface SeoExpertiseItem {
  id: string;
  title: string;
  description: string;
  codeSymbol: string;
  technicalLabel: string;
}

export interface SeoCaseStudy {
  id: string;
  client: string;
  url: string;
  growth: string;
  position: string;
  niche: string;
  description: string;
}

export interface SeoPublication {
  id: string;
  title: string;
  url: string;
  kind: string;
  description: string;
}

export interface SeoTrustFactor {
  id: string;
  title: string;
  metric: string;
  description: string;
}

export interface SeoMethodologyStep {
  id: string;
  num: string;
  title: string;
  codeSymbol: string;
  technicalLabel: string;
  description: string;
  gate: string;
}
