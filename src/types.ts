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
