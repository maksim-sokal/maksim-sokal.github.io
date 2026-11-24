export interface AsterContract {
  label: string;
  network: string;
  address: string;
  explorer: string;
  note?: string;
}

export interface AsterAudit {
  id: string;
  component: string;
  scope: string;
  auditor: string;
  period: string;
  findings: string;
  url: string;
}

export interface AsterFeeRow {
  product: string;
  maker: string;
  taker: string;
  note: string;
}

export interface AsterLeverageRow {
  market: string;
  maxLeverage: string;
  fees: string;
  note: string;
}

export interface AsterFact {
  label: string;
  value: string;
}

export interface AsterEarnProduct {
  id: string;
  name: string;
  asset: string;
  yieldSource: string;
  redemption: string;
  status: "active" | "wind-down";
  note: string;
  doc: string;
}

export interface AsterApiFacts {
  restBase: string;
  restHost: string;
  wsBase: string;
  wsRaw: string;
  wsCombined: string;
  spotRestBase: string;
  spotWsBase: string;
  futuresTestnetRest: string;
  futuresTestnetWs: string;
  spotTestnetRest: string;
  spotTestnetWs: string;
  rpcBase: string;
  requestWeightPerMinute: number;
  ordersPerMinute: number;
  ordersPerTenSeconds: number;
  spotWeightPerMinute: number;
  spotOrdersPerMinute: number;
  spotOrdersPerTenSeconds: number;
  maxKeysPerAccount: number;
  defaultRecvWindowMs: number;
  nonceWindowSeconds: number;
  docs: string;
  github: string;
  apiPage: string;
  changelog: string;
  skillsHub: string;
  spotDocs: string;
  rpcDocs: string;
}

export interface AsterApiEndpoint {
  method: string;
  path: string;
  purpose: string;
  auth: string;
  note: string;
}

export interface AsterApiStream {
  name: string;
  payload: string;
  speed: string;
  surface: "futures" | "spot";
}

export interface AsterApiSurface {
  id: string;
  name: string;
  rest: string;
  stream: string;
  auth: string;
  note: string;
}

export interface AsterDataProvider {
  name: string;
  type: string;
  url: string;
  description: string;
}

export interface AsterAgentSkillGroup {
  name: string;
  count: number;
  note: string;
}

export interface AsterApiChange {
  date: string;
  change: string;
}

export interface AsterApiFaqItem {
  question: string;
  answer: string;
}

export interface AsterAllocation {
  category: string;
  share: string;
  amount: string;
  note: string;
}

export interface AsterEcosystemItem {
  name: string;
  type: string;
  description: string;
  url: string;
}

export interface AsterGlossaryTerm {
  term: string;
  definition: string;
}

export interface AsterSource {
  label: string;
  url: string;
}
