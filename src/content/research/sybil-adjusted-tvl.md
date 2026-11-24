---
title: "Sybil-adjusted TVL: measuring economic value that stays"
description: "How total value locked is inflated by recursive deposits, double counting and incentive mercenaries — and four adjustments that produce a more honest number."
dek: "TVL is a sum of balances. It does not tell you who deposited, whether the same dollar is counted twice, or whether it will still be there next week."
practice: defi
published: 2026-11-16
updated: 2026-11-16
topics:
  - name: "Decentralized finance"
    sameAs: "https://www.wikidata.org/wiki/Q4159573"
  - name: "On-chain data analysis"
    sameAs: "https://www.wikidata.org/wiki/Q1988917"
  - name: "Cryptoeconomics"
    sameAs: "https://www.wikidata.org/wiki/Q105682939"
sources:
  - name: "DefiLlama documentation"
    url: "https://docs.llama.fi/"
    publisher: "DefiLlama"
  - name: "Dune documentation"
    url: "https://docs.dune.com/"
    publisher: "Dune"
  - name: "DefiLlama Adapters"
    url: "https://github.com/DefiLlama/DefiLlama-Adapters"
    publisher: "DefiLlama"
related:
  - "economic-invariant-audits"
  - "aster-dex-contract-verification"
---

TVL is the USD value of assets held by a protocol's contracts. It is a balance-sheet snapshot, useful for liquidity depth and gross adoption. It is not a measure of commitment, revenue or user quality.

Treating it as a popularity contest produces predictable distortions. The distortions are measurable, and adjusting for them is mostly a data problem.

## Where TVL inflates

| Vector | Mechanism | Adjustment |
| --- | --- | --- |
| Recursive deposits | Deposit, borrow, redeposit the same capital | Cluster wallets, net out looped exposure |
| Double counting | LP token counted alongside its underlying assets | Count once, at the protocol boundary |
| Unclaimed fees | Accrued but unclaimed rewards counted as deposits | Exclude pending rewards |
| Incentive farming | Deposits that leave when emissions stop | Weight by retention, not snapshot |
| Bridge escrow | The same asset counted on two chains | Deduplicate by canonical asset |
| Wash loops | Volume inflation, often quoted next to TVL | Ignore volume as a TVL input |

None of these require malice. A points programme is enough.

## Four adjustments

**1. Entity clustering.** Group wallets that share a funding source, then measure TVL per cluster rather than per address. One entity with $400M is a different risk profile from four hundred entities with $1M each.

**2. Retention weighting.** Take deposits that remain after 30, 90 and 180 days. Report the curve, not a single number. A protocol with 20% 90-day retention is renting its TVL.

**3. Stablecoin denomination.** Recalculate in stable units to separate real inflows from price appreciation. A TVL that doubled because the collateral asset doubled is not growth in usage.

**4. Fee yield.** Annualised fees divided by TVL. This is the cheapest sanity check available: it compares what the protocol holds with what it earns.

## A query skeleton

The exact tables depend on the warehouse. The shape is the same:

```sql
with deposits as (
    select wallet, token, usd_value, block_time
    from protocol_deposits
    where block_time >= now() - interval '180 days'
),
funders as (
    select wallet, min(from_address) as first_funder
    from token_transfers
    group by wallet
),
clusters as (
    select wallet, first_funder as cluster_id
    from funders
)
select cluster_id, sum(usd_value) as cluster_tvl
from deposits
join clusters using (wallet)
group by cluster_id
order by cluster_tvl desc;
```

This is a skeleton, not a runnable query. Real warehouses differ on decimal handling, token pricing and chain-specific transfer tables.

## Reading the result

Four numbers tell most of the story:

- **Top-10 cluster share.** High concentration means a handful of wallets can exit at once.
- **90-day retention.** The share of deposits that survive a quarter.
- **Fee yield.** Annualised fees divided by TVL.
- **Stable share.** How much of the TVL is not directional crypto exposure.

A protocol with $1B TVL and $300k in annual fees is a different business from one with $200M TVL and $20M in fees. The first number is a headline; the second pair is a business.

## Limits

- **Clustering misses centralised exchange withdrawals.** A wallet funded from a CEX looks independent.
- **The retention window is a choice.** Thirty days flatters; 180 days may exclude legitimate seasonal behaviour.
- **Stablecoin weighting penalises volatile-asset protocols** that are genuinely useful.
- **TVL still matters** for slippage and liquidation depth. Adjusted TVL is a complement, not a replacement.

## What to publish

If a protocol reports an adjusted number, it should publish the method, the window and the cluster heuristic. An unexplained "real TVL" figure is just a second unverifiable claim.

The useful output is not a single corrected number. It is a table: raw TVL, adjusted TVL, retention, concentration and fee yield, each with its definition. Readers can then disagree with the method instead of the marketing.
