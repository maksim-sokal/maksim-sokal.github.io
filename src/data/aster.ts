import type {
  AsterAgentSkillGroup,
  AsterAllocation,
  AsterApiChange,
  AsterApiEndpoint,
  AsterApiFacts,
  AsterApiFaqItem,
  AsterApiStream,
  AsterApiSurface,
  AsterAudit,
  AsterContract,
  AsterDataProvider,
  AsterEarnProduct,
  AsterEcosystemItem,
  AsterFact,
  AsterFeeRow,
  AsterGlossaryTerm,
  AsterLeverageRow,
  AsterSource,
} from "../types-aster";

/**
 * Single source of truth for every Aster DEX fact used on the site.
 *
 * Rules:
 * - Every mutable value carries a source and is re-verified against
 *   docs.asterdex.com before publishing an update.
 * - Never add an address, fee or limit that is not on the official docs page.
 * - Update ASTER_LAST_VERIFIED whenever any value below changes.
 */

export const ASTER_LAST_VERIFIED = "2026-11-24";
export const ASTER_SITE = "https://www.asterdex.com/";
export const ASTER_DOCS = "https://docs.asterdex.com/";

export const ASTER_SOCIALS = {
  x: "https://x.com/Aster_DEX",
  telegram: "https://t.me/AsterDEX",
  discord: "https://discord.gg/invite/asterdefi",
  medium: "https://medium.com/asterdex",
} as const;

export const ASTER_QUICK_FACTS: AsterFact[] = [
  { label: "Venue", value: "Aster Chain — privacy-focused L1, PoSA consensus" },
  { label: "Block time", value: "50 ms" },
  { label: "Throughput", value: "Up to 100,000 TPS" },
  { label: "Gas on Aster Chain", value: "0" },
  { label: "Trading modes", value: "Perpetuals · Shield Mode · 1001x · Spot" },
  { label: "Deposit bridge", value: "BNB Chain · Ethereum · Arbitrum · Solana · SUI" },
  { label: "Audits", value: "7 published reports" },
  { label: "Facts verified", value: ASTER_LAST_VERIFIED },
];

const BRIDGE_EXPLORERS: Record<string, (address: string) => string> = {
  "BNB Chain": (address) => `https://bscscan.com/address/${address}`,
  Ethereum: (address) => `https://etherscan.io/address/${address}`,
  Arbitrum: (address) => `https://arbiscan.io/address/${address}`,
  Solana: (address) => `https://solscan.io/account/${address}`,
  SUI: (address) => `https://suiscan.xyz/mainnet/object/${address}`,
};

const bridge = (network: string, address: string): AsterContract => ({
  label: "Aster Deposit Bridge",
  network,
  address,
  explorer: BRIDGE_EXPLORERS[network](address),
});

export const ASTER_BRIDGE_CONTRACTS: AsterContract[] = [
  bridge("BNB Chain", "0x128463A60784c4D3f46c23Af3f65Ed859Ba87974"),
  bridge("Ethereum", "0x604DD02d620633Ae427888d41bfd15e38483736E"),
  bridge("Arbitrum", "0x9E36CB86a159d479cEd94Fa05036f235Ac40E1d5"),
  bridge("Solana", "EhUtRgu9iEbZXXRpEvDj6n1wnQRjMi2SERDo3c6bmN2c"),
  bridge("SUI", "0x16c5df59874dd4f12d8ea22859e8430064edd1b9ff330050a5ecdb5222003c3e"),
];

const earnContract = (label: string, address: string, note: string): AsterContract => ({
  label,
  network: "EVM",
  address,
  explorer: "",
  note,
});

/**
 * The official registry lists these as EVM addresses but does not label a
 * network for them. The page must say so rather than guess.
 */
export const ASTER_EARN_CONTRACTS: AsterContract[] = [
  earnContract("asBNB token", "0x77734e70b6E88b4d82fE632a168EDf6e700912b6", "Network not labelled in the official registry"),
  earnContract("asBNB minting", "0x2F31ab8950c50080E77999fa456372f276952fD8", "Network not labelled in the official registry"),
  earnContract("asBTC token", "0x184b72289c0992BDf96751354680985a7C4825d6", "BNB Chain only per the asBTC guide"),
  earnContract("asBTC minting", "0x8a3C77E6c6A488d26CD44F403b95e44675f46e6A", "Network not labelled in the official registry"),
  earnContract("asUSDF token", "0x917AF46B3C3c6e1Bb7286B9F59637Fb7C65851Fb", "Network not labelled in the official registry"),
  earnContract("asUSDF minting", "0xdB57a53C428a9faFcbFefFB6dd80d0f427543695", "Network not labelled in the official registry"),
  earnContract("asCAKE token", "0x9817F4c9f968a553fF6caEf1a2ef6cF1386F16F7", "Minting stopped 23 April 2025; redemptions only"),
  earnContract("asCAKE minting", "0x1A81A28482Edd40ff1689CB3D857c3dAdF11D502", "Minting stopped 23 April 2025; redemptions only"),
];

export const ASTER_USDF_CONTRACTS: AsterContract[] = [
  earnContract("USDF token", "0x5A110fC00474038f6c02E89C707D638602EA44B5", "Network not labelled in the official registry"),
  earnContract("USDF minting", "0xC271fc70dD9E678ac1AB632f797894fe4BE2C345", "Network not labelled in the official registry"),
];

const AUDIT_URL = "https://docs.asterdex.com/overview/audit-reports";

export const ASTER_AUDITS: AsterAudit[] = [
  {
    id: "aster-vault",
    component: "AsterVault",
    scope: "Vault contracts (AstherusVault v2)",
    auditor: "Salus Security",
    period: "September 2024",
    findings: "0 High · 1 Medium · 4 Low",
    url: AUDIT_URL,
  },
  {
    id: "aster-earn",
    component: "AsterEarn",
    scope: "Earn contracts (Astherus Earn v2)",
    auditor: "Salus Security",
    period: "September 2024",
    findings: "0 High · 1 Medium · 1 Low",
    url: AUDIT_URL,
  },
  {
    id: "asbnb-salus",
    component: "asBNB",
    scope: "Liquid staking contracts (AsBNB v2)",
    auditor: "Salus Security",
    period: "December 2024",
    findings: "0 High · 2 Medium · 1 Low",
    url: AUDIT_URL,
  },
  {
    id: "asbnb-peckshield",
    component: "asBNB",
    scope: "BNB Earn contracts",
    auditor: "PeckShield",
    period: "2 December 2024 · #2024-274",
    findings: "3 Low",
    url: AUDIT_URL,
  },
  {
    id: "usdf-peckshield",
    component: "USDF",
    scope: "USDF Earn contracts",
    auditor: "PeckShield",
    period: "3 December 2024 · #2024-275",
    findings: "2 Low",
    url: AUDIT_URL,
  },
  {
    id: "usdf-halborn",
    component: "USDF & asUSDF",
    scope: "Stablecoin and staked stablecoin contracts",
    auditor: "Halborn",
    period: "25–30 April 2025 · updated 16 June 2025",
    findings: "0 Critical · 0 High · 1 Medium · 1 Low · 4 Informational",
    url: AUDIT_URL,
  },
  {
    id: "ascake-salus",
    component: "asCAKE",
    scope: "Liquid staking contracts (Ascake v2)",
    auditor: "Salus Security",
    period: "December 2024",
    findings: "0 High · 1 Medium · 0 Low",
    url: AUDIT_URL,
  },
];

export const ASTER_PERP_FEES: AsterFeeRow[] = [
  { product: "Crypto — General", maker: "0%", taker: "0.04%", note: "Standard VIP schedule; taker rate varies by tier" },
  { product: "Crypto — Group B", maker: "0%", taker: "0.1%", note: "Selected pairs; see the VIP program for the eligible list" },
  { product: "RWA", maker: "0%", taker: "0.0125% (1.25 bps)", note: "Fixed taker fee across VIP levels" },
  { product: "USD1 — BTC, ETH, SOL", maker: "0%", taker: "0.04%", note: "USD1-quoted contracts" },
  { product: "USD1 — RWA", maker: "0%", taker: "0.0125% (1.25 bps)", note: "USD1-quoted RWA contracts" },
];

export const ASTER_SPOT_FEES: AsterFeeRow[] = [
  { product: "Spot", maker: "0.005%", taker: "0.04%", note: "5% discount when fees are paid in ASTER" },
];

export const ASTER_1001X_LADDER: AsterLeverageRow[] = [
  {
    market: "BTC/USD",
    maxLeverage: "1001x",
    fees: "<500x: 0.08% open and close. 500x–1001x: 0% open, dynamic PnL-based close fee (minimum 0.03%)",
    note: "0.01% slippage; margin cannot be added at 500x and above; max net profit ROI ≈500% at 500x/750x and ≈300% at 1001x",
  },
  {
    market: "ETH/USD",
    maxLeverage: "250x",
    fees: "0.08% open and close",
    note: "Margin can be added",
  },
  {
    market: "Other crypto",
    maxLeverage: "75x",
    fees: "0.08% open and close",
    note: "Margin can be added",
  },
  {
    market: "Forex",
    maxLeverage: "200x",
    fees: "0.02% open and close",
    note: "Forex perpetuals are offered on BNB Chain",
  },
];

export const ASTER_EXECUTION_FEES = [
  { chain: "BNB Chain", fee: "$0.50" },
  { chain: "Arbitrum", fee: "$0.20" },
];

export const ASTER_ELIGIBILITY = [
  "United States",
  "Canada",
  "United Kingdom",
  "China",
  "North Korea",
  "Russia",
  "Ukraine",
  "Cuba",
  "Iran",
  "Venezuela",
  "Syria",
];

export const ASTER_FEE_NOTES = [
  "Funding is peer-to-peer and is not charged by Aster. The interval varies by market and can change without a separate announcement.",
  "Shield Mode currently runs a limited-time zero-fee promotion. The standing fee model is a 0.03% flat fee plus a 15–20% profit share; the promotion can end at any time.",
  "Withdrawal fees depend on the destination chain. The official docs state a minimum withdrawal fee may be as low as 1 USDT.",
  "VIP tiers are based on rolling 14-day volume and are recalculated daily at the end of the UTC day.",
];

export const ASTER_EARN_PRODUCTS: AsterEarnProduct[] = [
  {
    id: "asbnb",
    name: "asBNB",
    asset: "BNB or slisBNB",
    yieldSource:
      "BNB liquid staking routed through Lista DAO and Binance Launchpool, Hodler and Megadrop rewards reflected in net asset value.",
    redemption: "Withdrawals return slisBNB. Instant when no Launchpool is active; otherwise queued until the pool ends.",
    status: "active",
    note: "Aster states up to 30% APY. Yield is variable and not guaranteed. Minting and withdrawal are fee-free.",
    doc: `${ASTER_DOCS}earn/overview/mint-asbnb`,
  },
  {
    id: "asbtc",
    name: "asBTC",
    asset: "BTC",
    yieldSource: "Managed trading strategies on deposited BTC, with assets held by Ceffu.",
    redemption: "Withdrawal requests are processed within 14 days; claim after processing.",
    status: "active",
    note: "BNB Chain only. Aster states up to 5% APY. Yield is variable and not guaranteed.",
    doc: `${ASTER_DOCS}earn/overview/mint-asbtc`,
  },
  {
    id: "asusdf",
    name: "asUSDF",
    asset: "USDF",
    yieldSource:
      "Delta-neutral strategies backing USDF, including funding and basis income, distributed weekly to the asUSDF contract.",
    redemption: "Stake and unstake through the USDF interface; see the official tutorial.",
    status: "active",
    note: "Yield depends on the performance of the delta-neutral strategy and the USDF peg.",
    doc: `${ASTER_DOCS}earn/overview/mint-asusdf`,
  },
  {
    id: "alp",
    name: "ALP",
    asset: "Supported deposit assets on BNB Chain or Arbitrum",
    yieldSource:
      "Market-making P&L, trading fees, funding fees and liquidation proceeds accrue to the pool's net asset value.",
    redemption: "Mint and burn through the ALP interface; NAV moves with pool performance.",
    status: "active",
    note: "ALP is the counterparty to perp trades. NAV can fall as well as rise.",
    doc: `${ASTER_DOCS}earn/overview/aster-alp`,
  },
  {
    id: "ascake",
    name: "asCAKE",
    asset: "CAKE",
    yieldSource: "Legacy CAKE liquid staking product.",
    redemption: "Redemptions to CAKE are available; minting is closed.",
    status: "wind-down",
    note: "Minting stopped on 23 April 2025 after CAKE Tokenomics 3.0 retired veCAKE and the gauge voting system.",
    doc: `${ASTER_DOCS}earn/overview/mint-ascake`,
  },
];

export const ASTER_API_FACTS: AsterApiFacts = {
  restBase: "https://fapi.asterdex.com",
  restHost: "fapi.asterdex.com",
  wsBase: "wss://fstream.asterdex.com",
  wsRaw: "wss://fstream.asterdex.com/ws/<streamName>",
  wsCombined: "wss://fstream.asterdex.com/stream?streams=<stream1>/<stream2>",
  spotRestBase: "https://sapi.asterdex.com",
  spotWsBase: "wss://sstream.asterdex.com",
  futuresTestnetRest: "https://fapi.asterdex-testnet.com",
  futuresTestnetWs: "wss://fstream.asterdex-testnet.com",
  spotTestnetRest: "https://sapi.asterdex-testnet.com",
  spotTestnetWs: "wss://sstream.asterdex-testnet.com",
  rpcBase: "https://tapi.asterdex.com/info",
  requestWeightPerMinute: 2400,
  ordersPerMinute: 1200,
  ordersPerTenSeconds: 300,
  spotWeightPerMinute: 6000,
  spotOrdersPerMinute: 6000,
  spotOrdersPerTenSeconds: 1000,
  maxKeysPerAccount: 30,
  defaultRecvWindowMs: 5000,
  nonceWindowSeconds: 60,
  docs: "https://github.com/asterdex/api-docs/blob/master/V3(Recommended)/EN/aster-finance-futures-api-v3.md",
  github: "https://github.com/asterdex/api-docs",
  apiPage: "https://docs.asterdex.com/for-developers/aster-api",
  changelog: "https://github.com/asterdex/api-docs/blob/master/CHANGELOG.md",
  skillsHub: "https://github.com/asterdex/aster-skills-hub",
  spotDocs: "https://github.com/asterdex/api-docs/blob/master/V3(Recommended)/EN/aster-finance-spot-api-v3.md",
  rpcDocs: "https://github.com/asterdex/api-docs/blob/master/RPC/aster-chain-rpc.md",
};

export const ASTER_API_ENDPOINTS: AsterApiEndpoint[] = [
  { method: "GET", path: "/fapi/v1/ping", purpose: "Test connectivity", auth: "None", note: "Returns {}" },
  { method: "GET", path: "/fapi/v1/time", purpose: "Server time", auth: "None", note: "Milliseconds" },
  { method: "GET", path: "/fapi/v1/exchangeInfo", purpose: "Symbols, filters and rate limits", auth: "None", note: "v3 equivalent: /fapi/v3/exchangeInfo" },
  { method: "GET", path: "/fapi/v1/depth", purpose: "Order book snapshot", auth: "None", note: "Weight rises with limit" },
  { method: "GET", path: "/fapi/v1/trades", purpose: "Recent market trades", auth: "None", note: "Max 1,000" },
  { method: "GET", path: "/fapi/v1/historicalTrades", purpose: "Older market trades", auth: "API key", note: "MARKET_DATA security type" },
  { method: "GET", path: "/fapi/v1/aggTrades", purpose: "Aggregate trades", auth: "None", note: "Time range under 1 hour" },
  { method: "GET", path: "/fapi/v1/klines", purpose: "Candlesticks", auth: "None", note: "Max 1,500" },
  { method: "GET", path: "/fapi/v1/indexPriceKlines", purpose: "Index price candles", auth: "None", note: "Use pair, not symbol" },
  { method: "GET", path: "/fapi/v1/markPriceKlines", purpose: "Mark price candles", auth: "None", note: "Derived from index and premium" },
  { method: "GET", path: "/fapi/v1/premiumIndex", purpose: "Mark price and funding rate", auth: "None", note: "Current or last funding" },
  { method: "GET", path: "/fapi/v1/fundingRate", purpose: "Funding rate history", auth: "None", note: "Max 1,000" },
  { method: "GET", path: "/fapi/v1/ticker/24hr", purpose: "24-hour statistics", auth: "None", note: "Heavy without a symbol" },
  { method: "GET", path: "/fapi/v1/ticker/price", purpose: "Last price", auth: "None", note: "Single or all symbols" },
  { method: "GET", path: "/fapi/v1/ticker/bookTicker", purpose: "Best bid and ask", auth: "None", note: "Single or all symbols" },
  { method: "POST", path: "/fapi/v1/order", purpose: "Place an order", auth: "TRADE", note: "Supports newClientOrderId" },
  { method: "GET", path: "/fapi/v1/order", purpose: "Query an order", auth: "USER_DATA", note: "By orderId or client ID" },
  { method: "DELETE", path: "/fapi/v1/order", purpose: "Cancel an order", auth: "TRADE", note: "Guarded variant in v3" },
  { method: "GET", path: "/fapi/v1/openOrders", purpose: "Current open orders", auth: "USER_DATA", note: "Filter by symbol" },
  { method: "DELETE", path: "/fapi/v1/allOpenOrders", purpose: "Cancel all open orders", auth: "TRADE", note: "Per symbol" },
  { method: "POST", path: "/fapi/v1/batchOrders", purpose: "Place multiple orders", auth: "TRADE", note: "Batch limits apply" },
  { method: "GET", path: "/fapi/v2/balance", purpose: "Futures account balance", auth: "USER_DATA", note: "v3 account/balance also available" },
  { method: "GET", path: "/fapi/v2/positionRisk", purpose: "Position information", auth: "USER_DATA", note: "v3 positionRisk also available" },
  { method: "GET", path: "/fapi/v1/userTrades", purpose: "Account trade list", auth: "USER_DATA", note: "Fills, not orders" },
  { method: "GET", path: "/fapi/v1/income", purpose: "Income history", auth: "USER_DATA", note: "Funding, PnL, fees" },
  { method: "POST", path: "/fapi/v1/leverage", purpose: "Change initial leverage", auth: "TRADE", note: "Per symbol" },
  { method: "POST", path: "/fapi/v1/marginType", purpose: "Change margin mode", auth: "TRADE", note: "Cross or isolated" },
  { method: "POST", path: "/fapi/v1/listenKey", purpose: "Start user data stream", auth: "USER_STREAM", note: "Keepalive required" },
  { method: "PUT", path: "/fapi/v1/listenKey", purpose: "Keepalive user stream", auth: "USER_STREAM", note: "Extend before expiry" },
  { method: "DELETE", path: "/fapi/v1/listenKey", purpose: "Close user stream", auth: "USER_STREAM", note: "Invalidate the key" },
  { method: "GET", path: "/fapi/v3/referral/inviteeInfo", purpose: "Invitee information", auth: "USER_DATA", note: "Referral endpoint in the V3 reference" },
  { method: "GET", path: "/api/v3/ping", purpose: "Spot connectivity", auth: "None", note: "Returns {}" },
  { method: "GET", path: "/api/v3/time", purpose: "Spot server time", auth: "None", note: "Milliseconds" },
  { method: "GET", path: "/api/v3/exchangeInfo", purpose: "Spot symbols and filters", auth: "None", note: "Spot rate limits live here" },
  { method: "GET", path: "/api/v3/depth", purpose: "Spot order book", auth: "None", note: "Weight 2–20 by limit" },
  { method: "GET", path: "/api/v3/trades", purpose: "Recent spot trades", auth: "None", note: "Max 1,000" },
  { method: "GET", path: "/api/v3/historicalTrades", purpose: "Older spot trades", auth: "Signed", note: "Requires signature" },
  { method: "GET", path: "/api/v3/aggTrades", purpose: "Aggregate spot trades", auth: "None", note: "Time range under 1 hour" },
  { method: "GET", path: "/api/v3/klines", purpose: "Spot candlesticks", auth: "None", note: "Max 1,500" },
  { method: "GET", path: "/api/v3/ticker/24hr", purpose: "Spot 24-hour statistics", auth: "None", note: "Heavy without a symbol" },
  { method: "GET", path: "/api/v3/ticker/price", purpose: "Spot last price", auth: "None", note: "Single or all symbols" },
  { method: "GET", path: "/api/v3/ticker/bookTicker", purpose: "Spot best bid and ask", auth: "None", note: "Single or all symbols" },
  { method: "GET", path: "/api/v3/commissionRate", purpose: "Spot commission rate", auth: "USER_DATA", note: "Requires signature" },
  { method: "GET", path: "/api/v3/noop", purpose: "Spot no-op", auth: "None", note: "Connectivity check" },
  { method: "POST", path: "/api/v3/order", purpose: "Place a spot order", auth: "TRADE", note: "FOK is not supported on spot" },
  { method: "GET", path: "/api/v3/order", purpose: "Query a spot order", auth: "USER_DATA", note: "By order ID or client ID" },
  { method: "DELETE", path: "/api/v3/order", purpose: "Cancel a spot order", auth: "TRADE", note: "Per order" },
  { method: "GET", path: "/api/v3/openOrders", purpose: "Open spot orders", auth: "USER_DATA", note: "Filter by symbol" },
  { method: "DELETE", path: "/api/v3/allOpenOrders", purpose: "Cancel all spot orders", auth: "TRADE", note: "Per symbol" },
];

export const ASTER_API_STREAMS: AsterApiStream[] = [
  { name: "<symbol>@aggTrade", payload: "Aggregate trade", speed: "100 ms", surface: "futures" },
  { name: "<symbol>@markPrice", payload: "Mark price and funding", speed: "3 s", surface: "futures" },
  { name: "<symbol>@markPrice@1s", payload: "Mark price and funding", speed: "1 s", surface: "futures" },
  { name: "!markPrice@arr", payload: "All-market mark prices", speed: "3 s", surface: "futures" },
  { name: "<symbol>@kline_<interval>", payload: "Candlestick update", speed: "250 ms", surface: "futures" },
  { name: "<symbol>@miniTicker", payload: "24h mini ticker", speed: "500 ms", surface: "futures" },
  { name: "<symbol>@ticker", payload: "24h ticker", speed: "500 ms", surface: "futures" },
  { name: "!ticker@arr", payload: "All-market tickers", speed: "1 s", surface: "futures" },
  { name: "<symbol>@bookTicker", payload: "Best bid and ask", speed: "Real-time", surface: "futures" },
  { name: "!bookTicker", payload: "All-market best bid and ask", speed: "Real-time", surface: "futures" },
  { name: "<symbol>@forceOrder", payload: "Liquidation order", speed: "1 s", surface: "futures" },
  { name: "<symbol>@depth", payload: "Diff. order book", speed: "250–500 ms", surface: "futures" },
  { name: "<symbol>@depth<levels>", payload: "Partial order book", speed: "250–500 ms", surface: "futures" },
  { name: "User data stream", payload: "Orders, balances, positions", speed: "Event-driven", surface: "futures" },
  { name: "<symbol>@aggTrade", payload: "Spot aggregate trade", speed: "See spot reference", surface: "spot" },
  { name: "<symbol>@depth", payload: "Spot diff. order book", speed: "See spot reference", surface: "spot" },
  { name: "<symbol>@bookTicker", payload: "Spot best bid and ask", speed: "See spot reference", surface: "spot" },
  { name: "<symbol>@ticker", payload: "Spot 24h ticker", speed: "See spot reference", surface: "spot" },
  { name: "<symbol>@kline_<interval>", payload: "Spot candlestick update", speed: "See spot reference", surface: "spot" },
  { name: "User data stream", payload: "Spot orders and balances", speed: "Event-driven", surface: "spot" },
];

export const ASTER_API_SURFACES: AsterApiSurface[] = [
  {
    id: "futures",
    name: "Aster Futures API",
    rest: "https://fapi.asterdex.com",
    stream: "wss://fstream.asterdex.com",
    auth: "V1 API key + HMAC or V3 API Wallet + EIP-712",
    note: "Perpetual futures: market data, account, orders and user data streams.",
  },
  {
    id: "spot",
    name: "Aster Spot API",
    rest: "https://sapi.asterdex.com",
    stream: "wss://sstream.asterdex.com",
    auth: "V3 API Wallet + EIP-712; V1 keys are legacy",
    note: "Spot trading under /api/v3/*. FOK is not supported on spot orders.",
  },
  {
    id: "rpc",
    name: "Aster Chain RPC",
    rest: "https://tapi.asterdex.com/info",
    stream: "—",
    auth: "JSON-RPC 2.0 over HTTP POST",
    note: "Balance, open orders and fills via aster_* methods.",
  },
  {
    id: "testnet",
    name: "Aster Testnet",
    rest: "https://fapi.asterdex-testnet.com · https://sapi.asterdex-testnet.com",
    stream: "wss://fstream.asterdex-testnet.com · wss://sstream.asterdex-testnet.com",
    auth: "Testnet API Wallet",
    note: "Separate environment. Do not use mainnet keys or confuse testnet symbols with mainnet.",
  },
];

export const ASTER_DATA_PROVIDERS: AsterDataProvider[] = [
  {
    name: "Bitquery",
    type: "Indexed data API",
    url: "https://bitquery.io/products/aster-dex",
    description:
      "GraphQL, WebSocket and Kafka feeds of decoded perp and spot trades, funding settlements, liquidations, order fills and open interest across 120+ Aster markets on BNB Chain.",
  },
];

export const ASTER_AGENT_SKILLS: AsterAgentSkillGroup[] = [
  {
    name: "Futures skills",
    count: 12,
    note: "V1 and V3 auth, trading, market data, WebSocket, account and error handling.",
  },
  {
    name: "Spot testnet skills",
    count: 12,
    note: "V1 and V3 auth, spot trading, market data, WebSocket, account and error handling.",
  },
  {
    name: "Deposit skill",
    count: 1,
    note: "Deposit from a wallet via BAPI on Ethereum, BNB Chain and Arbitrum.",
  },
];

export const ASTER_API_CHANGES: AsterApiChange[] = [
  { date: "2026-03-25", change: "V1 new API key creation ended. Existing V1 keys continue to work." },
  { date: "2026-09-01", change: "Authenticated V3 endpoints require a main-wallet deposit; otherwise -5050." },
  { date: "2026-11-06", change: "nonceWindow added to V3 signed requests (1–60,000 ms)." },
  { date: "2026-10-27", change: "Builder fee, paginated income and batch transfer endpoints added." },
];

export const ASTER_API_FAQ: AsterApiFaqItem[] = [
  {
    question: "What is the Aster DEX API base URL?",
    answer:
      "The documented REST base is https://fapi.asterdex.com. Both /fapi/v1 and /fapi/v3 paths respond on that host. The V3 reference is the recommended version; the example host fapi3.asterdex.com is not reachable.",
  },
  {
    question: "What is the Aster DEX WebSocket URL?",
    answer:
      "The base is wss://fstream.asterdex.com. Use /ws/<streamName> for a raw stream or /stream?streams=<stream1>/<stream2> for a combined stream. Stream names and symbols are lowercase.",
  },
  {
    question: "What are the Aster API rate limits?",
    answer:
      "The live exchangeInfo lists 2,400 request weight per minute, 1,200 orders per minute and 300 orders per 10 seconds. Limits are enforced per IP for request weight and per account for orders. Repeated 429s lead to a 418 IP ban of 2 minutes to 3 days.",
  },
  {
    question: "How do I create an Aster API key?",
    answer:
      "Open API Management in your Aster account, connect the wallet, create a key with a label, and copy the key and secret. The secret is shown once. An account supports up to 30 keys; bind each to a fixed IP where possible.",
  },
  {
    question: "What is the difference between an API key and an API Wallet?",
    answer:
      "The compatibility API uses an API key and secret with HMAC SHA256 and the X-MBX-APIKEY header. The V3 reference uses an API Wallet (agent) with a user, signer, microsecond nonce and an EIP-712 signature. Confirm which model your key or agent is provisioned for before signing requests.",
  },
  {
    question: "Should I use /fapi/v1 or /fapi/v3?",
    answer:
      "Use /fapi/v3 for new integrations; the reference labels V3 as recommended and it includes the nonce mechanism and nonceWindow. /fapi/v1 paths still respond and appear in compatibility examples.",
  },
  {
    question: "What is /fapi/v1/exchangeInfo used for?",
    answer:
      "It returns every symbol's trading rules: price tick size, lot step size, minimum notional, order type support, and the exchange rate limits. Use tickSize and stepSize from the filters; do not treat pricePrecision or quantityPrecision as tick or step size.",
  },
  {
    question: "Is there a Python SDK for Aster?",
    answer:
      "No verified official package was found at the time of writing. The legacy guide's aster-connector-python package does not resolve on PyPI or GitHub, so its import example should not be used. The official API reference includes a Python signing example you can adapt.",
  },
  {
    question: "Is there a spot API or sapi endpoint?",
    answer:
      "The current API reference documents the futures API on fapi.asterdex.com. A separate public sapi spot specification is not documented there, so do not assume Binance's sapi paths map to Aster.",
  },
  {
    question: "Is there a premiumIndexKlines endpoint?",
    answer:
      "No. The reference exposes indexPriceKlines and markPriceKlines, plus premiumIndex for the current mark price and funding rate. There is no separate premiumIndexKlines route.",
  },
  {
    question: "How do I get the BTCUSDT best bid and ask over WebSocket?",
    answer:
      "Subscribe to btcusdt@bookTicker. The payload contains b and B for the best bid price and quantity, and a and A for the best ask.",
  },
  {
    question: "Why do I get HTTP 418?",
    answer:
      "A 418 means your IP has been auto-banned after continuing to send requests after 429 responses. Back off, stop retrying, and wait out the ban. Durations scale from 2 minutes to 3 days for repeat offenders.",
  },
  {
    question: "Why do I get HTTP 503, and should I retry?",
    answer:
      "A 503 means the request may have reached the matching engine but the response timed out. The execution status is unknown. Do not blindly retry; query the order or reconcile through the user data stream first.",
  },
  {
    question: "What is nonceWindow?",
    answer:
      "An optional deadline in milliseconds, from 1 to 60,000, measured from the request's nonce. If the sequencer has not processed the request by nonce + nonceWindow, it is rejected with code -4227 and never included in a block. It has no effect on read-only endpoints.",
  },
  {
    question: "Is there a referral program API?",
    answer:
      "The V3 reference includes GET /fapi/v3/referral/inviteeInfo for invitee information. A public API for creating referral codes or enrolling affiliates is not documented in the reference.",
  },
  {
    question: "Is there an Aster Spot API?",
    answer:
      "Yes. Spot V3 uses https://sapi.asterdex.com with endpoints under /api/v3/* and a WebSocket at wss://sstream.asterdex.com. The live spot exchangeInfo listed 79 symbols and rate limits of 6,000 request weight, 6,000 orders per minute and 1,000 orders per 10 seconds. FOK is not supported for spot order placement.",
  },
  {
    question: "Is there an Aster testnet API?",
    answer:
      "Yes. Futures testnet uses https://fapi.asterdex-testnet.com and wss://fstream.asterdex-testnet.com. Spot testnet uses https://sapi.asterdex-testnet.com and wss://sstream.asterdex-testnet.com. Create a testnet API Wallet and do not use mainnet keys.",
  },
  {
    question: "Is there an Aster Chain RPC endpoint?",
    answer:
      "Yes. The RPC base is https://tapi.asterdex.com/info and it uses JSON-RPC 2.0 over HTTP POST. The documented methods include aster_getBalance, aster_openOrders, aster_userFills, aster_spotOpenOrders and aster_spotUserFills.",
  },
  {
    question: "What happened to V1 API keys?",
    answer:
      "New V1 API key creation stopped on 25 March 2026. Existing V1 keys continue to work. New integrations should use V3 with an API Wallet and EIP-712 signing.",
  },
  {
    question: "Why do I get error -5050?",
    answer:
      "Since 1 September 2026, authenticated V3 endpoints require the main wallet linked to the Aster account to have completed a deposit. Until then, affected requests return -5050, \"This function can only be used after deposit\". Public market data and agent or builder endpoints are unaffected.",
  },
  {
    question: "Why do I get -1115 on a spot order?",
    answer:
      "Spot order placement does not support timeInForce=FOK. Sending FOK to POST /api/v3/order returns -1115 INVALID_TIF regardless of order type. Use GTC, IOC or GTX instead.",
  },
  {
    question: "Does Aster publish official AI agent skills?",
    answer:
      "Yes. The official asterdex/aster-skills-hub repository publishes 12 futures skills, 12 spot testnet skills and one deposit skill in the AgentSkills format, usable with OpenClaw and other agents. The spot skills target testnet, not mainnet.",
  },
  {
    question: "Is Bitquery the same as the Aster DEX API?",
    answer:
      "No. Bitquery is a third-party indexed-data provider that streams decoded Aster perp and spot trades, funding, liquidations, order fills and open interest over GraphQL, WebSocket and Kafka. It is not the official trading API and cannot place orders or manage an account.",
  },
  {
    question: "Is asterlab.ai the same Aster?",
    answer:
      "No. asterlab.ai is Aster AI Labs, an LLM inference provider. It is a different company and product from Aster DEX. The query \"aster api\" is ambiguous; this page covers the Aster DEX trading API only.",
  },
  {
    question: "What is the difference between fapi and sapi?",
    answer:
      "fapi.asterdex.com serves futures: /fapi/* endpoints with perpetual contracts, funding, positions and liquidation. sapi.asterdex.com serves spot: /api/v3/* endpoints with spot balances and orders. They are separate APIs with separate rate limits and WebSocket hosts.",
  },
];

export const ASTER_USDF_FACTS = [
  "USDF is minted and redeemed 1:1 with USDT on Aster.",
  "Backing USDT is held with Ceffu and deployed into delta-neutral positions on Binance.",
  "Profits are calculated weekly and distributed to the asUSDF contract.",
  "Aster uses the Atlas USDF/USD feed at 0x294bb1bcf28985d62381879893237e02a2865385 for internal valuation and risk monitoring.",
];

export const ASTER_BRIDGE_FACTS = [
  "Cross-chain deposits are credited after 3 of 4 validator nodes verify the transaction.",
  "Withdrawals are batched and confirmed after 2 of 3 validator nodes verify the request.",
  "Deposits typically arrive in 1–5 minutes; Ethereum may take longer.",
  "Withdrawals typically complete in about 30 seconds; Ethereum may take longer.",
  "The minimum withdrawal fee may be as low as 1 USDT, depending on the destination chain.",
];

export const ASTER_TOKEN_ADDRESS = "0x000Ae314E2A2172a039B26378814C252734f556A";
export const ASTER_MAX_SUPPLY = "8,000,000,000 ASTER";
export const ASTER_TOKEN_STANDARD = "BEP-20 on BNB Chain";

export const ASTER_TOKENOMICS: AsterAllocation[] = [
  { category: "Airdrop", share: "53.5%", amount: "4,280,000,000", note: "Traders, community builders and ecosystem stakeholders. 8.8% unlocked at TGE." },
  { category: "Ecosystem & Community", share: "30%", amount: "2,400,000,000", note: "APX migration pool, grants, marketing, liquidity and staking emissions." },
  { category: "Treasury", share: "7%", amount: "560,000,000", note: "Locked until allocated through governance-approved mechanisms." },
  { category: "Team", share: "5%", amount: "400,000,000", note: "Extended cliff; 40 months of linear vesting after unlock." },
  { category: "Liquidity & Listings", share: "4.5%", amount: "360,000,000", note: "Fully unlocked at TGE for exchange liquidity." },
];

export const ASTER_STAKING_FACTS = [
  "Stake ASTER with a validator and choose a lock period of up to 208 weeks (about four years).",
  "Rewards settle in weekly epochs and have two layers: a base reward determined by validator performance and a loyalty reward weighted by lock duration and trading activity.",
  "The base reward pool is 150,000 ASTER per week. The loyalty pool is 300,000 ASTER per week plus the ASTER bought back from platform fees.",
  "veASTER is the weight metric derived from locked ASTER and remaining lock duration. Longer locks carry more weight.",
  "99% of daily platform fees are used to buy back ASTER via TWAP and distributed to veASTER stakers. For every ASTER bought back, an equal amount is burned from reserve, bi-weekly, until supply reaches 3,000,000,000.",
  "Early exit is allowed with a penalty based on remaining lock time: 60% at four years remaining, tapering to 2% near maturity.",
  "Penalised tokens are split between the next epoch reward pool and the ecosystem fund.",
];

export const ASTER_EARLY_EXIT_EXAMPLE = [
  { remaining: "4 years", rate: "60%", penalty: "6,000 ASTER" },
  { remaining: "3 years", rate: "60%", penalty: "6,000 ASTER" },
  { remaining: "2 years", rate: "50%", penalty: "5,000 ASTER" },
  { remaining: "1 year", rate: "25%", penalty: "2,500 ASTER" },
  { remaining: "0.05 years", rate: "2%", penalty: "200 ASTER" },
  { remaining: "0", rate: "0%", penalty: "0 ASTER" },
];

export const ASTER_ECOSYSTEM: AsterEcosystemItem[] = [
  {
    name: "PancakeSwap",
    type: "Liquidity pool",
    description: "Provide liquidity with asBNB or USDF pairs and earn pool incentives on top of the underlying yield.",
    url: `${ASTER_DOCS}earn/overview/ecosystem/pancakeswap`,
  },
  {
    name: "Pendle",
    type: "Yield trading",
    description: "Split asBNB, asUSDF or USDF into principal and yield tokens, or provide liquidity to Pendle pools.",
    url: `${ASTER_DOCS}earn/overview/ecosystem/pendle`,
  },
  {
    name: "Tranchess",
    type: "Structured yield",
    description: "Use asBNB in Tranchess strategies with different risk tranches.",
    url: `${ASTER_DOCS}earn/overview/ecosystem/tranchess`,
  },
  {
    name: "Restaking",
    type: "Restaking",
    description: "Restake asBNB through supported protocols such as Binomial or Kernel DAO for additional points.",
    url: `${ASTER_DOCS}earn/overview/ecosystem/restaking`,
  },
  {
    name: "YieldNest",
    type: "Yield aggregator",
    description: "Access curated yield strategies built on Aster assets.",
    url: `${ASTER_DOCS}earn/overview/ecosystem/yieldnest`,
  },
];

export const ASTER_GLOSSARY: AsterGlossaryTerm[] = [  { term: "Perpetual", definition: "A futures contract with no expiry date, kept close to spot by periodic funding payments." },
  { term: "Funding rate", definition: "The periodic payment between longs and shorts that anchors a perpetual's price to the index." },
  { term: "Mark price", definition: "The price Aster uses for PnL, liquidation and trigger orders; it is derived from the index and premium, not the last trade." },
  { term: "Index price", definition: "A weighted median of spot prices across external exchanges, used as the reference for the mark price." },
  { term: "Maintenance margin", definition: "The minimum margin required to keep a position open. Falling below it triggers liquidation." },
  { term: "Liquidation", definition: "Forced reduction of a position when margin no longer covers the maintenance requirement." },
  { term: "Bankruptcy price", definition: "The protocol price at which a bankrupt position is transferred to the insurance fund." },
  { term: "ADL", definition: "Auto-deleveraging: reducing profitable opposing positions when the insurance fund cannot cover a shortfall." },
  { term: "Insurance fund", definition: "A buffer that absorbs losses from bankrupt positions before ADL is used." },
  { term: "Cross margin", definition: "A shared margin pool where all positions support each other. This is the default on Aster." },
  { term: "Isolated margin", definition: "Margin assigned to a single position, limiting liquidation risk to that position." },
  { term: "Maker / taker", definition: "A maker adds an order to the book; a taker removes liquidity by executing against it. Fees differ." },
  { term: "Slippage", definition: "The difference between the expected price and the executed price, driven by depth and order size." },
  { term: "Notional", definition: "The face value of a position: quantity multiplied by price." },
  { term: "Open interest", definition: "The total value of open contracts in a market, used as a liquidity and crowding signal." },
  { term: "Basis", definition: "The gap between a futures or perpetual price and the spot price." },
  { term: "Delta-neutral", definition: "A position with offsetting long and short exposure, designed to earn funding or basis rather than price direction." },
  { term: "AMM", definition: "Automated market maker: a pool that prices trades with a formula instead of an order book." },
  { term: "veASTER", definition: "A lock-weighted governance and reward metric derived from staked ASTER and remaining lock duration." },
  { term: "ALP", definition: "Aster's liquidity pool token. Holders act as the counterparty to perp trades and earn pool PnL." },
  { term: "asBNB", definition: "A liquid staking receipt for slisBNB deposited through Aster Earn." },
  { term: "USDF", definition: "Aster's yield-bearing stablecoin, minted and redeemed 1:1 with USDT." },
  { term: "asUSDF", definition: "The staked, yield-bearing version of USDF." },
  { term: "Hidden order", definition: "A limit order that does not appear in the public order book and whose resulting position is excluded from public feeds." },
  { term: "Viewer pass", definition: "A credential that lets you selectively disclose your private Aster activity to a third party." },
  { term: "API Wallet", definition: "A self-custodied signing key (agent address) authorised to act on your account within defined permissions." },
  { term: "Nonce", definition: "A unique request value used to prevent replay. Aster V3 uses a microsecond timestamp within a 60-second window." },
  { term: "Rate limit", definition: "A cap on request weight or order count per interval, enforced per IP." },
];

export const ASTER_SOURCES: AsterSource[] = [
  { label: "What is Aster?", url: `${ASTER_DOCS}overview/what-is-aster` },
  { label: "Smart contracts", url: `${ASTER_DOCS}overview/smart-contracts` },
  { label: "Audit reports", url: AUDIT_URL },
  { label: "Perpetual fees", url: `${ASTER_DOCS}trading/perpetuals/fees-and-specs/fees` },
  { label: "Spot fee structure", url: `${ASTER_DOCS}trading/spot/spot-fee-structure` },
  { label: "Shield Mode fees", url: `${ASTER_DOCS}trading/shield-mode/fees-and-specs` },
  { label: "1001x fees and liquidation", url: `${ASTER_DOCS}trading/1001x/fees-and-slippage` },
  { label: "VIP program", url: `${ASTER_DOCS}program-and-rewards/vip-program` },
  { label: "Funding rate", url: `${ASTER_DOCS}trading/perpetuals/fees-and-specs/funding-rate` },
  { label: "Aster Chain overview", url: `${ASTER_DOCS}aster-chain/overview` },
  { label: "Terms and conditions", url: `${ASTER_DOCS}resources/terms-and-conditions` },
];

export const ASTER_PREDICTION_RESTRICTED_COUNTRIES = [
  "Australia (AU)",
  "Belgium (BE)",
  "Belarus (BY)",
  "Burundi (BI)",
  "Central African Republic (CF)",
  "Congo DRC (CD)",
  "Cuba (CU)",
  "Germany (DE)",
  "Ethiopia (ET)",
  "France (FR)",
  "United Kingdom (GB)",
  "Iran (IR)",
  "Iraq (IQ)",
  "Italy (IT)",
  "Japan (JP)",
  "North Korea (KP)",
  "Lebanon (LB)",
  "Libya (LY)",
  "Myanmar (MM)",
  "Nicaragua (NI)",
  "Poland (PL)",
  "Russia (RU)",
  "Singapore (SG)",
  "Somalia (SO)",
  "South Sudan (SS)",
  "Sudan (SD)",
  "Syria (SY)",
  "Thailand (TH)",
  "Taiwan (TW)",
  "U.S. Minor Outlying Islands (UM)",
  "United States (US)",
  "Venezuela (VE)",
  "Yemen (YE)",
  "Zimbabwe (ZW)",
];

export const ASTER_PREDICTION_RESTRICTED_REGIONS = [
  "Ontario, Canada (CA-ON)",
  "Crimea, Ukraine (UA-43)",
  "Donetsk, Ukraine (UA-14)",
  "Luhansk, Ukraine (UA-09)",
];
