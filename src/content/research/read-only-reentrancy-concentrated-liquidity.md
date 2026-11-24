---
title: "Read-only reentrancy in concentrated liquidity routers"
description: "Why view functions that read pool state mid-callback are unsafe, how the attack composes, and which defences actually remove the exposure."
dek: "A view function has no lock. When a router hands control to a caller mid-swap, every contract that prices positions from its state is reading numbers that are about to change."
practice: defi
published: 2026-11-12
updated: 2026-11-12
topics:
  - name: "Automated market maker"
  - name: "Concentrated liquidity"
  - name: "Decentralized finance"
    sameAs: "https://www.wikidata.org/wiki/Q4159573"
  - name: "Smart contract"
    sameAs: "https://www.wikidata.org/wiki/Q7544035"
sources:
  - name: "Uniswap v3 overview"
    url: "https://developers.uniswap.org/docs/protocols/v3/overview"
    publisher: "Uniswap"
  - name: "Uniswap v4 overview"
    url: "https://developers.uniswap.org/docs/protocols/v4/overview"
    publisher: "Uniswap"
  - name: "Reentrancy"
    url: "https://consensysdiligence.github.io/smart-contract-best-practices/attacks/reentrancy/"
    publisher: "Consensys Diligence"
  - name: "Smart contract security"
    url: "https://ethereum.org/developers/docs/smart-contracts/security/"
    publisher: "ethereum.org"
related:
  - "economic-invariant-audits"
  - "aster-dex-contract-verification"
---

Reentrancy is usually described as a state-writing bug. The read-only variant is different: the attacker never re-enters the victim to change its state. They re-enter a pool, and the victim reads the pool while it is mid-update.

## The pattern

A pool exposes a view that derives price or reserves from live balances. During a swap callback those balances are temporarily inconsistent: output may have been sent, input may not have arrived, and the pool's internal accounting is between two states.

A lending market that prices an LP token or a position from that view sees a temporary number. If the number is favourable, the market accepts bad collateral. If it is unfavourable, it liquidates a healthy position. Either way, the victim's code can be correct in isolation.

## Why concentrated liquidity routers are exposed

- **Swap callbacks.** Uniswap v3 calls `uniswapV3SwapCallback` on the caller before the swap settles. Control leaves the pool while its state is intermediate.
- **Flash accounting.** Uniswap v4 accumulates token deltas inside a lock and settles at the end. Hooks execute inside that window.
- **Composability.** Routers batch multiple pools and hops; a read in the middle of a batch sees a state that will not exist at the end of the transaction.

## The read paths that matter

| Source | What is read | Who is exposed |
| --- | --- | --- |
| `slot0` | `sqrtPriceX96`, `tick` | Lending markets, vaults, oracles |
| Tick bitmap and liquidity | In-range liquidity | Position valuation, liquidation bots |
| Token balances | Reserves | LP pricing, NAV calculations |
| LP price helpers | Virtual price | Collateral adapters |
| Oracle adapters | Any of the above | Everything downstream |

The risk is not the pool. It is the consumer that assumes a view is consistent at all times.

## Attack sequence

1. Borrow liquidity with a flash loan.
2. Swap into the target pool, moving price and triggering the callback.
3. Inside the callback, call a consumer that prices collateral from the pool's current state.
4. Borrow or withdraw against the distorted valuation.
5. Settle the swap; the price returns to normal.
6. Repay the flash loan and keep the difference.

No state is corrupted. The attacker only chooses when to read.

## Defences

**Consumer-side lock check.** If a pool exposes a lock flag, refuse to price while it is set:

```solidity
interface IPoolLock {
    function isLocked() external view returns (bool);
}

function pricePosition(address pool) external view returns (uint256) {
    require(!IPoolLock(pool).isLocked(), "READ_MID_CALLBACK");
    // read state and price the position
}
```

Not every pool exposes such a flag. If it does not, the consumer should not price from spot state at all.

**TWAP instead of spot.** A time-weighted average with a minimum window removes single-transaction manipulation, at the cost of latency in fast markets.

**Commit the price before external calls.** Read once, store it, and use the stored value for the rest of the transaction.

**Guard state-changing entrypoints.** A reentrancy guard on the consumer's deposit and withdraw paths blocks the composition even when the price source is weak.

**Validate hooks and callbacks.** A v4 hook that calls an external contract inherits the same problem. Check `msg.sender`, keep hooks free of external calls where possible, and treat every callback as adversarial.

## What to test in review

- Re-enter every consumer from the swap callback.
- Read prices across two pools during a multi-hop route.
- Trigger a hook that calls a vault or lending market.
- Grief the callback with gas limits.
- Inspect oracle adapters, not just the pool.

## The trade-off

Guards cost gas and can block legitimate composability. TWAPs lag. The right choice depends on what the price is used for: a dashboard can tolerate spot, a loan-to-value calculation cannot.

Write the assumption down. The next integration will not infer it, and the failure will look like a bug in whichever contract read second.
