export interface AuditLog {
  id: string;
  protocol: string;
  tvl: string;
  date: string;
  category: "Lending" | "DEX" | "Yield Aggregator" | "Synthetics";
  score: number;
  status: "Fully Secure" | "Optimized" | "Awaiting Fixes";
  findingsCode: string;
  description: string;
}

export interface ExpertiseItem {
  id: string;
  title: string;
  description: string;
  codeSymbol: string;
  equation: string;
  technicalLabel: string;
}

export interface TrustFactor {
  id: string;
  title: string;
  metric: string;
  description: string;
}

export interface BioData {
  name: string;
  tagline: string;
  location: string;
  specialty: string;
  overview: string;
  gpgKey: string;
  affiliation: { name: string; link: string; github: string };
  education: {
    school: string;
    degree: string;
    focus: string;
    schoolLink: string;
    description: string;
  };
  asterRole: {
    title: string;
    org: string;
    startDate: string;
    link: string;
    description: string;
  };
  asterWork: {
    contractVerificationUrl: string;
    expertProfileUrl: string;
    verifiedContracts: number;
    contentLibraryCount: number;
  };
  expertOffer: {
    name: string;
    serviceType: string;
    areaServed: string;
    category: string;
    description: string;
  };
}
