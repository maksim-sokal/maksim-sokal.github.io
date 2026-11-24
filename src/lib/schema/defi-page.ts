// Page-scoped JSON-LD nodes. The Person and WebSite nodes are built once in src/lib/schema.ts.
import type { GraphNode } from "../../types-schema";

export const DEFI_PAGE_NODES: GraphNode[] = [
  {
    "@type": [
      "ProfilePage",
      "AboutPage"
    ],
    "@id": "https://maksim-sokal.github.io/#profilepage",
    "url": "https://maksim-sokal.github.io/",
    "name": "Professional Profile of Maksim Sokal, DeFi Analyst",
    "mainEntity": {
      "@id": "https://maksim-sokal.github.io/#person"
    },
    "author": {
      "@id": "https://maksim-sokal.github.io/#person"
    },
    "accountablePerson": {
      "@id": "https://maksim-sokal.github.io/#person"
    },
    "description": "Maksim Sokal is an independent DeFi Analyst and external technical reviewer for Aster DEX. He specializes in fact-checking protocol architectures and verifying smart contract security data to ensure editorial integrity",
    "mentions": [
      {
        "@type": "Organization",
        "name": "CertiK",
        "description": "A leading blockchain security firm and smart contract auditing company.",
        "sameAs": "https://www.wikidata.org/wiki/Q116425349"
      },
      {
        "@type": "Service",
        "name": "Dune Analytics",
        "sameAs": "https://www.wikidata.org/wiki/Q125767671",
        "description": "A data platform that provides tools for extracting and visualizing on-chain data."
      }
    ],
    "workExample": [
      {
        "@type": "CreativeWork",
        "name": "Aster DEX Smart Contract Registry — Verification",
        "author": {
          "@id": "https://maksim-sokal.github.io/#person"
        },
        "description": "Architectural accuracy verification of 24+ smart contract addresses across BNB Chain, Ethereum, Arbitrum, Solana and SUI"
      },
      {
        "@type": "CreativeWork",
        "name": "Aster DEX Expert Profile — Maksim Sokal",
        "author": {
          "@id": "https://maksim-sokal.github.io/#aster-dex"
        },
        "description": "External Technical Reviewer profile — editorial mandate for 40+ guides, reviews, and comparisons"
      }
    ],
    "isPartOf": {
      "@id": "https://maksim-sokal.github.io/#website"
    },
    "inLanguage": "en"
  },
  {
    "@type": "Organization",
    "@id": "https://keyfordex.com/#organization",
    "name": "KeyForDEX",
    "url": "https://keyfordex.com/",
    "description": "Specialized DEX security partner providing smart contract audit services and cross-chain vulnerability assessments."
  },
  {
    "@type": "ReviewAction",
    "@id": "https://maksim-sokal.github.io/#audit-action-01",
    "agent": {
      "@id": "https://maksim-sokal.github.io/#person"
    },
    "object": {
      "@type": "SoftwareApplication",
      "@id": "https://maksim-sokal.github.io/#aether-lending-v2",
      "name": "Aether Lending Engine v2",
      "applicationCategory": "Lending",
      "operatingSystem": "Ethereum",
      "description": "DeFi lending protocol — $420M TVL"
    },
    "subjectOf": {
      "@id": "https://maksim-sokal.github.io/#profilepage"
    },
    "resultReview": {
      "@type": "Review",
      "@id": "https://maksim-sokal.github.io/#audit-review-01",
      "itemReviewed": {
        "@id": "https://maksim-sokal.github.io/#aether-lending-v2"
      },
      "author": {
        "@id": "https://maksim-sokal.github.io/#person"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": 98,
        "bestRating": 100,
        "worstRating": 0
      },
      "datePublished": "2026-04",
      "reviewBody": "Comprehensive mathematical audit and invariant assertion checks for concentrated rate compounders.",
      "negativeNotes": "AE-INV-04: Fixed math underflow during rapid rate compounders in tick events.",
      "reviewAspect": "Concentrated Lending Math & Invariant Verification"
    }
  },
  {
    "@type": "EndorseAction",
    "@id": "https://maksim-sokal.github.io/#endorse-action-01",
    "agent": {
      "@id": "https://maksim-sokal.github.io/#person"
    },
    "subjectOf": {
      "@id": "https://maksim-sokal.github.io/#profilepage"
    },
    "object": {
      "@id": "https://maksim-sokal.github.io/#aether-lending-v2"
    },
    "description": "Fully Secure — no critical vulnerabilities remaining post-audit"
  },
  {
    "@type": "ReviewAction",
    "@id": "https://maksim-sokal.github.io/#audit-action-02",
    "agent": {
      "@id": "https://maksim-sokal.github.io/#person"
    },
    "object": {
      "@type": "SoftwareApplication",
      "@id": "https://maksim-sokal.github.io/#chronos-router",
      "name": "Chronos concentrated liquidity router",
      "applicationCategory": "DEX",
      "operatingSystem": "Arbitrum",
      "description": "DEX concentrated liquidity router — $180M TVL"
    },
    "subjectOf": {
      "@id": "https://maksim-sokal.github.io/#profilepage"
    },
    "resultReview": {
      "@type": "Review",
      "@id": "https://maksim-sokal.github.io/#audit-review-02",
      "itemReviewed": {
        "@id": "https://maksim-sokal.github.io/#chronos-router"
      },
      "author": {
        "@id": "https://maksim-sokal.github.io/#person"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": 96,
        "bestRating": 100,
        "worstRating": 0
      },
      "datePublished": "2026-02",
      "reviewBody": "Tick validation audit securing range swaps under complex flash loan situations.",
      "negativeNotes": "CHRN-RO-02: Fixed read-only reentrancy vulnerability in reward harvester calls.",
      "reviewAspect": "DEX Router Tick Validation & Flash Loan Security"
    }
  },
  {
    "@type": "EndorseAction",
    "@id": "https://maksim-sokal.github.io/#endorse-action-02",
    "agent": {
      "@id": "https://maksim-sokal.github.io/#person"
    },
    "subjectOf": {
      "@id": "https://maksim-sokal.github.io/#profilepage"
    },
    "object": {
      "@id": "https://maksim-sokal.github.io/#chronos-router"
    },
    "description": "Fully Secure — no critical vulnerabilities remaining post-audit"
  },
  {
    "@type": "ReviewAction",
    "@id": "https://maksim-sokal.github.io/#audit-action-03",
    "agent": {
      "@id": "https://maksim-sokal.github.io/#person"
    },
    "object": {
      "@type": "SoftwareApplication",
      "@id": "https://maksim-sokal.github.io/#stablesynth-vaults",
      "name": "StableSynth Peg Vaults",
      "applicationCategory": "Synthetics",
      "operatingSystem": "Ethereum",
      "description": "Synthetic asset protocol — $90M TVL"
    },
    "subjectOf": {
      "@id": "https://maksim-sokal.github.io/#profilepage"
    },
    "resultReview": {
      "@type": "Review",
      "@id": "https://maksim-sokal.github.io/#audit-review-03",
      "itemReviewed": {
        "@id": "https://maksim-sokal.github.io/#stablesynth-vaults"
      },
      "author": {
        "@id": "https://maksim-sokal.github.io/#person"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": 91,
        "bestRating": 100,
        "worstRating": 0
      },
      "datePublished": "2025-12",
      "reviewBody": "Economic audit of synthetic collateralization ratios under high-frequency oracle lag simulations.",
      "negativeNotes": "SYN-PEG-11: Optimized redemption curves to prevent feedback arbitrage loop.",
      "reviewAspect": "Synthetic Collateral Ratio & Oracle Lag Economics"
    }
  },
  {
    "@type": "ReviewAction",
    "@id": "https://maksim-sokal.github.io/#audit-action-04",
    "agent": {
      "@id": "https://maksim-sokal.github.io/#person"
    },
    "object": {
      "@type": "SoftwareApplication",
      "@id": "https://maksim-sokal.github.io/#helix-vault",
      "name": "Helix Yield Vault Aggregator",
      "applicationCategory": "Yield Aggregator",
      "operatingSystem": "Ethereum",
      "description": "Yield aggregator protocol — $150M TVL"
    },
    "subjectOf": {
      "@id": "https://maksim-sokal.github.io/#profilepage"
    },
    "resultReview": {
      "@type": "Review",
      "@id": "https://maksim-sokal.github.io/#audit-review-04",
      "itemReviewed": {
        "@id": "https://maksim-sokal.github.io/#helix-vault"
      },
      "author": {
        "@id": "https://maksim-sokal.github.io/#person"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": 95,
        "bestRating": 100,
        "worstRating": 0
      },
      "datePublished": "2025-10",
      "reviewBody": "Structural audits protecting users from mev sandwich attacks upon compound events.",
      "negativeNotes": "HLX-Y-07: Added gas cost thresholds to defend harvest compounding exhaustion attacks.",
      "reviewAspect": "Yield Aggregator MEV & Gas Exhaustion Defense"
    }
  },
  {
    "@type": "EndorseAction",
    "@id": "https://maksim-sokal.github.io/#endorse-action-04",
    "agent": {
      "@id": "https://maksim-sokal.github.io/#person"
    },
    "subjectOf": {
      "@id": "https://maksim-sokal.github.io/#profilepage"
    },
    "object": {
      "@id": "https://maksim-sokal.github.io/#helix-vault"
    },
    "description": "Fully Secure — no critical vulnerabilities remaining post-audit"
  },
  {
    "@type": "ReviewAction",
    "@id": "https://maksim-sokal.github.io/#audit-contract-bnb",
    "agent": {
      "@id": "https://maksim-sokal.github.io/#person"
    },
    "object": {
      "@type": "SoftwareApplication",
      "@id": "https://maksim-sokal.github.io/#software-contract-bnb",
      "identifier": "0x128463A60784c4D3f46c23Af3f65Ed859Ba87974",
      "name": "Aster DEX — BNB Chain Transparent Proxy",
      "applicationCategory": "Smart Contract",
      "operatingSystem": "BNB Chain",
      "softwareVersion": "Solidity 0.8.19 / OZ 4.9"
    },
    "subjectOf": {
      "@id": "https://maksim-sokal.github.io/#profilepage"
    }
  },
  {
    "@type": "ReviewAction",
    "@id": "https://maksim-sokal.github.io/#audit-contract-eth",
    "agent": {
      "@id": "https://maksim-sokal.github.io/#person"
    },
    "object": {
      "@type": "SoftwareApplication",
      "@id": "https://maksim-sokal.github.io/#software-contract-eth",
      "identifier": "0x604DD02d620633Ae427888d41bfd15e38483736E",
      "name": "Aster DEX — Ethereum UUPS Proxy",
      "applicationCategory": "Smart Contract",
      "operatingSystem": "Ethereum",
      "softwareVersion": "ERC-1967 / Solidity 0.8.20"
    },
    "subjectOf": {
      "@id": "https://maksim-sokal.github.io/#profilepage"
    }
  },
  {
    "@type": "ReviewAction",
    "@id": "https://maksim-sokal.github.io/#audit-contract-sol",
    "agent": {
      "@id": "https://maksim-sokal.github.io/#person"
    },
    "object": {
      "@type": "SoftwareApplication",
      "@id": "https://maksim-sokal.github.io/#software-contract-sol",
      "identifier": "EhUtRgu9iEbZXXRpEvDj6n1wnQRjMi2SERDo3c6bmN2c",
      "name": "Aster DEX — Solana Immutable Contract",
      "applicationCategory": "Smart Contract",
      "operatingSystem": "Solana",
      "softwareVersion": "SPL-Token / Rust 1.75"
    },
    "subjectOf": {
      "@id": "https://maksim-sokal.github.io/#profilepage"
    }
  },
  {
    "@type": "ReviewAction",
    "@id": "https://maksim-sokal.github.io/#audit-contract-arb",
    "agent": {
      "@id": "https://maksim-sokal.github.io/#person"
    },
    "object": {
      "@type": "SoftwareApplication",
      "@id": "https://maksim-sokal.github.io/#software-contract-arb",
      "identifier": "0x9E36CB86a159d479cEd94Fa05036f235Ac40E1d5",
      "name": "Aster DEX — Arbitrum Transparent Proxy",
      "applicationCategory": "Smart Contract",
      "operatingSystem": "Arbitrum",
      "softwareVersion": "Solidity 0.8.24 / L2-Optimized"
    },
    "subjectOf": {
      "@id": "https://maksim-sokal.github.io/#profilepage"
    }
  },
  {
    "@type": "ReviewAction",
    "@id": "https://maksim-sokal.github.io/#audit-report-01",
    "agent": {
      "@id": "https://maksim-sokal.github.io/#person"
    },
    "object": {
      "@type": "Report",
      "@id": "https://maksim-sokal.github.io/#software-audit-report-01",
      "name": "asBNB Earn Protocol — PeckShield Audit",
      "author": {
        "@type": "Organization",
        "name": "PeckShield"
      },
      "abstract": "Smart Contract Integrity & Yield Mechanics"
    },
    "subjectOf": {
      "@id": "https://maksim-sokal.github.io/#profilepage"
    }
  },
  {
    "@type": "ReviewAction",
    "@id": "https://maksim-sokal.github.io/#audit-report-02",
    "agent": {
      "@id": "https://maksim-sokal.github.io/#person"
    },
    "object": {
      "@type": "Report",
      "@id": "https://maksim-sokal.github.io/#software-audit-report-02",
      "name": "asBNB Liquid Staking — Salus Security Audit",
      "author": {
        "@type": "Organization",
        "name": "Salus Security"
      },
      "abstract": "Staking Logic & Token Security"
    },
    "subjectOf": {
      "@id": "https://maksim-sokal.github.io/#profilepage"
    }
  },
  {
    "@type": "ReviewAction",
    "@id": "https://maksim-sokal.github.io/#audit-report-03",
    "agent": {
      "@id": "https://maksim-sokal.github.io/#person"
    },
    "object": {
      "@type": "Report",
      "@id": "https://maksim-sokal.github.io/#software-audit-report-03",
      "name": "USDF Stablecoin & asUSDF — Halborn Audit",
      "author": {
        "@type": "Organization",
        "name": "Halborn"
      },
      "abstract": "Peg Stability & Collateralization"
    },
    "subjectOf": {
      "@id": "https://maksim-sokal.github.io/#profilepage"
    }
  },
  {
    "@type": "ReviewAction",
    "@id": "https://maksim-sokal.github.io/#audit-report-04",
    "agent": {
      "@id": "https://maksim-sokal.github.io/#person"
    },
    "object": {
      "@type": "Report",
      "@id": "https://maksim-sokal.github.io/#software-audit-report-04",
      "name": "USDF Earn Protocol — PeckShield Audit",
      "author": {
        "@type": "Organization",
        "name": "PeckShield"
      },
      "abstract": "Yield Generation & Vault Security"
    },
    "subjectOf": {
      "@id": "https://maksim-sokal.github.io/#profilepage"
    }
  },
  {
    "@type": "ReviewAction",
    "@id": "https://maksim-sokal.github.io/#audit-report-05",
    "agent": {
      "@id": "https://maksim-sokal.github.io/#person"
    },
    "object": {
      "@type": "Report",
      "@id": "https://maksim-sokal.github.io/#software-audit-report-05",
      "name": "asCAKE Liquid Staking — Salus Security Audit",
      "author": {
        "@type": "Organization",
        "name": "Salus Security"
      },
      "abstract": "Staking Contract & Reward Distribution"
    },
    "subjectOf": {
      "@id": "https://maksim-sokal.github.io/#profilepage"
    }
  },
  {
    "@type": "ReviewAction",
    "@id": "https://maksim-sokal.github.io/#audit-report-06",
    "agent": {
      "@id": "https://maksim-sokal.github.io/#person"
    },
    "object": {
      "@type": "Report",
      "@id": "https://maksim-sokal.github.io/#software-audit-report-06",
      "name": "Aster DEX Vault — Salus Security Audit",
      "author": {
        "@type": "Organization",
        "name": "Salus Security"
      },
      "abstract": "Core Vault Logic & Asset Management"
    },
    "subjectOf": {
      "@id": "https://maksim-sokal.github.io/#profilepage"
    }
  },
  {
    "@type": "ReviewAction",
    "@id": "https://maksim-sokal.github.io/#audit-report-07",
    "agent": {
      "@id": "https://maksim-sokal.github.io/#person"
    },
    "object": {
      "@type": "Report",
      "@id": "https://maksim-sokal.github.io/#software-audit-report-07",
      "name": "Astherus Earn Protocol — Salus Security Audit",
      "author": {
        "@type": "Organization",
        "name": "Salus Security"
      },
      "abstract": "Legacy Earn Contract Security"
    },
    "subjectOf": {
      "@id": "https://maksim-sokal.github.io/#profilepage"
    }
  }
];
