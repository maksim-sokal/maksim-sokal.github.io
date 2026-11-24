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
  url?: string;
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

export interface SeoApexTimelinePoint {
  phase: string;
  label: string;
  value: string;
  drop?: boolean;
  peak?: boolean;
}

export interface SeoApexCase {
  client: string;
  url: string;
  baseline: string;
  drop: string;
  result: string;
  position: string;
  context: string;
  actions: string[];
  timeline: SeoApexTimelinePoint[];
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

export interface SeoCoFounder {
  name: string;
  role: string;
  url: string;
  image: string;
  bio: string;
  focus: string[];
}

export interface SeoService {
  id: string;
  name: string;
  serviceType: string;
  url: string;
}
