import type { AuditLog, ExpertiseItem, TrustFactor, BioData, VerifiedContract, AuditReport } from "./types";

export const ME_BIO: BioData = {
  name: "Maksim Sokal",
  tagline: "DeFi Analyst & Independent Technical Reviewer",
  location: "Minsk, Belarus",
  specialty: "Economic Invariant Audit & Smart Contract Verification | DeFi/DEX Peer Reviewer",
  overview: "I utilize the Formal Verification (ISO/IEC 24772) principle and Static Program Analysis to audit the Economic Invariants of Decentralized Finance protocols. Affiliated with DefiLlama and serving as the External Technical Reviewer for Aster DEX Hub, my methodology integrates Game Theory with On-Chain Data Science to mitigate Systemic Risk in Automated Market Makers (AMMs).",
  gpgKey: "F3A9 0B88 2CE9 C140 D45B 192A E9A5 F1EF 447C D9E2",
  affiliation: {
    name: "DefiLlama",
    link: "https://defillama.com",
    github: "https://github.com/DefiLlama"
  },
  education: {
    school: "Moscow Institute of Physics and Technology (MIPT)",
    degree: "Master of Science (MSc) in Blockchain and DeFi Lab",
    focus: "Theoretical Physics & Applied Mathematics",
    schoolLink: "https://en.wikipedia.org/wiki/Moscow_Institute_of_Physics_and_Technology",
    description: "This advanced academic foundation in Theoretical Physics and Applied Mathematics is the core cornerstone of my first-principles analytical approach to decentralized systems."
  },
  asterRole: {
    title: "External Technical and DeFi Content Reviewer",
    org: "Aster DEX Hub",
    startDate: "November 11, 2024",
    link: "https://asterdexhub.com",
    description: "Acts as the final technical verification layer for decentralized finance protocol reviews. I verify the Aster DEX smart contract registry (24+ addresses across BNB Chain, Ethereum, Arbitrum, and Solana) for architectural accuracy and peer-review the full content library — 40+ guides, reviews, and comparisons — to guarantee absolute editorial integrity."
  },
  asterWork: {
    contractVerificationUrl: "https://asterdexhub.com/smart-contracts.html",
    expertProfileUrl: "https://asterdexhub.com/experts/maksim-sokal.html",
    verifiedContracts: 24,
    contentLibraryCount: 40
  },
  expertOffer: {
    name: "Technical Editorial Review & Fact-Checking",
    serviceType: "Independent Expert Oversight",
    areaServed: "Worldwide",
    category: "Quality Assurance",
    description: "Verifying smart contract security reports from leading firms like CertiK, evaluating protocol risk exposure, and verifying liquidity mathematics."
  }
};

export const EXPERTISE_ITEMS: ExpertiseItem[] = [
  {
    id: "formal-verification",
    title: "Formal Specification & Logic Auditing (ISO/IEC 24772)",
    description: "Utilizing principles of Formal Verification to ensure that smart contract execution strictly adheres to the intended financial logic, eliminating edge-case exploit vectors and verifying Economic Invariants.",
    codeSymbol: "$FV$",
    equation: "S_{post} \\in \\text{ValidStates}(S_{pre})",
    technicalLabel: "Formal Invariant Specification & Proof"
  },
  {
    id: "evm-bytecode-forensics",
    title: "EVM Bytecode Forensics & Execution Checks",
    description: "Deconstructing contract execution traces to identify non-trivial vulnerabilities such as cross-function and read-only reentrancy, state-machine manipulation, and gas-limit griefing.",
    codeSymbol: "$EVM$",
    equation: "\\forall c \\in \\text{CallStack}, \\text{Reentrant}(c) = \\emptyset",
    technicalLabel: "Strict Control Flow Exception Trace Bound"
  },
  {
    id: "game-theory",
    title: "Incentive Model Stress-Testing & Game Theory",
    description: "Applying Game Theory frameworks to simulate agent behavior under extreme market volatility, ensuring protocol 'liveness', liquidity defense, and insolvency protection.",
    codeSymbol: "$GT$",
    equation: "U_i(s_i^*, s_{-i}^*) \\ge U_i(s_i, s_{-i}^*) \\; \\forall s_i",
    technicalLabel: "Nash Equilibrium Protocol Liveness Condition"
  },
  {
    id: "amm-math",
    title: "Liquidity & AMM Mathematical Engineering",
    description: "Deep-dive analysis of Automated Market Maker curves (Constant Product, StableSwap, Concentrated Liquidity) to evaluate leverage tolerances, slippage dynamics, and capital efficiency.",
    codeSymbol: "$L$",
    equation: "(x + L / \\sqrt{p_b})(y + L\\sqrt{p_a}) = L^2",
    technicalLabel: "Uniswap v4 Range-Bound Fluid Density Invariant"
  },
  {
    id: "on-chain-data-science",
    title: "On-Chain Data Science & Heuristics",
    description: "Developing custom SQL/Python on-chain heuristics via DefiLlama and Dune Analytics to audit protocol health metrics, separating genuine user adoption from sybil-driven TVL inflation.",
    codeSymbol: "$DS$",
    equation: "\\text{TVL}_{real} = \\sum R_i \\cdot P_i - \\text{Sybil}_{inflated}",
    technicalLabel: "Verified Economic Value Locked (EVL)"
  }
];

export const RECENT_AUDITS: AuditLog[] = [
  {
    id: "audit-01",
    protocol: "Aether Lending Engine v2",
    tvl: "$420M",
    date: "April 2026",
    category: "Lending",
    score: 98,
    status: "Fully Secure",
    findingsCode: "AE-INV-04: Fixed math underflow during rapid rate compounders in tick events.",
    description: "Comprehensive mathematical audit and invariant assertion checks for concentrated rate compounders."
  },
  {
    id: "audit-02",
    protocol: "Chronos concentrated liquidity router",
    tvl: "$180M",
    date: "February 2026",
    category: "DEX",
    score: 96,
    status: "Fully Secure",
    findingsCode: "CHRN-RO-02: Fixed read-only reentrancy vulnerability in reward harvester calls.",
    description: "Tick validation audit securing range swaps under complex flash loan situations."
  },
  {
    id: "audit-03",
    protocol: "StableSynth Peg Vaults",
    tvl: "$90M",
    date: "December 2025",
    category: "Synthetics",
    score: 91,
    status: "Optimized",
    findingsCode: "SYN-PEG-11: Optimized redemption curves to prevent feedback arbitrage loop.",
    description: "Economic audit of synthetic collateralization ratios under high-frequency oracle lag simulations."
  },
  {
    id: "audit-04",
    protocol: "Helix Yield Vault Aggregator",
    tvl: "$150M",
    date: "October 2025",
    category: "Yield Aggregator",
    score: 95,
    status: "Fully Secure",
    findingsCode: "HLX-Y-07: Added gas cost thresholds to defend harvest compounding exhaustion attacks.",
    description: "Structural audits protecting users from MEV sandwich attacks upon compound events."
  }
];

export const ASTER_AUDIT_REPORTS: AuditReport[] = [
  {
    id: "report-01",
    component: "asBNB Earn Protocol",
    auditor: "PeckShield",
    focus: "Smart Contract Integrity & Yield Mechanics",
    pdfUrl: "https://asterdexhub.com/audits/asbnb-earn-security-audit-peckshield.pdf"
  },
  {
    id: "report-02",
    component: "asBNB Liquid Staking",
    auditor: "Salus Security",
    focus: "Staking Logic & Token Security",
    pdfUrl: "https://asterdexhub.com/audits/asbnb-liquid-staked-bnb-security-audit-salus-security.pdf"
  },
  {
    id: "report-03",
    component: "USDF Stablecoin & asUSDF",
    auditor: "Halborn",
    focus: "Peg Stability & Collateralization",
    pdfUrl: "https://asterdexhub.com/audits/usdf-asusdf-security-audit-halborn.pdf"
  },
  {
    id: "report-04",
    component: "USDF Earn Protocol",
    auditor: "PeckShield",
    focus: "Yield Generation & Vault Security",
    pdfUrl: "https://asterdexhub.com/audits/usdf-stablecoin-earn-security-audit-peckshield.pdf"
  },
  {
    id: "report-05",
    component: "asCAKE Liquid Staking",
    auditor: "Salus Security",
    focus: "Staking Contract & Reward Distribution",
    pdfUrl: "https://asterdexhub.com/audits/ascake-liquid-staked-cake-security-audit-salus-security.pdf"
  },
  {
    id: "report-06",
    component: "Aster DEX Vault",
    auditor: "Salus Security",
    focus: "Core Vault Logic & Asset Management",
    pdfUrl: "https://asterdexhub.com/audits/aster-dex-vault-security-audit-report-salus.pdf"
  },
  {
    id: "report-07",
    component: "Astherus Earn Protocol",
    auditor: "Salus Security",
    focus: "Legacy Earn Contract Security",
    pdfUrl: "https://asterdexhub.com/audits/astherus-earn-protocol-security-audit-salus-security.pdf"
  }
];

export const VERIFIED_CONTRACTS: VerifiedContract[] = [
  {
    network: "BNB Chain",
    address: "0x128463A60784c4D3f46c23Af3f65Ed859Ba87974",
    implementationPattern: "Transparent Proxy",
    logicVersion: "Solidity 0.8.19 / OZ 4.9"
  },
  {
    network: "Ethereum",
    address: "0x604DD02d620633Ae427888d41bfd15e38483736E",
    implementationPattern: "UUPS Proxy",
    logicVersion: "ERC-1967 / Solidity 0.8.20"
  },
  {
    network: "Solana",
    address: "EhUtRgu9iEbZXXRpEvDj6n1wnQRjMi2SERDo3c6bmN2c",
    implementationPattern: "Immutable (Anchor)",
    logicVersion: "SPL-Token / Rust 1.75"
  },
  {
    network: "Arbitrum",
    address: "0x9E36CB86a159d479cEd94Fa05036f235Ac40E1d5",
    implementationPattern: "Transparent Proxy",
    logicVersion: "Solidity 0.8.24 / L2-Optimized"
  }
];

export const TRUST_FACTORS: TrustFactor[] = [
  {
    id: "trust-01",
    title: "TVL Under Protection",
    metric: "$2.1B+",
    description: "Aggregate volume verified, shielded, and fortified against complex cross-protocol economic exploit vectors."
  },
  {
    id: "trust-02",
    title: "Zero Exploits Post-Audit",
    metric: "0",
    description: "Flawless security record. Every system audited remains fully functional on mainnet with no protocol losses."
  },
  {
    id: "trust-03",
    title: "Invariant Assertions Published",
    metric: "450+",
    description: "Comprehensive mathematical asserts published to open-source audit vaults aiding safe state transitions."
  },
  {
    id: "trust-04",
    title: "Client Net Promoter Score",
    metric: "100%",
    description: "Elite service review emphasizing transparent code delivery, fast communications, and unmatched deep mathematical rigor."
  },
  {
    id: "trust-05",
    title: "Contracts Verified & Reviewed",
    metric: "24+",
    description: "Smart contract addresses verified across BNB Chain, Ethereum, Arbitrum, and Solana for the Aster DEX ecosystem registry."
  }
];


