---
title: "What an economic invariant audit actually proves"
description: "How invariant-based smart contract audits differ from line-by-line bug hunts, which properties are worth proving, and what a proof still cannot tell you."
dek: "A unit test checks one path. An invariant audit asks whether any reachable state can break solvency, pricing or share accounting — and makes the answer reproducible."
practice: defi
published: 2026-11-04
updated: 2026-11-04
topics:
  - name: "Formal verification"
    sameAs: "https://www.wikidata.org/wiki/Q173326"
  - name: "Smart contract"
    sameAs: "https://www.wikidata.org/wiki/Q7544035"
  - name: "Decentralized finance"
    sameAs: "https://www.wikidata.org/wiki/Q4159573"
sources:
  - name: "Smart contract security"
    url: "https://ethereum.org/developers/docs/smart-contracts/security/"
    publisher: "ethereum.org"
  - name: "SMTChecker and formal verification"
    url: "https://docs.soliditylang.org/en/latest/smtchecker.html"
    publisher: "Solidity documentation"
  - name: "Building Secure Contracts"
    url: "https://github.com/crytic/building-secure-contracts"
    publisher: "Trail of Bits"
  - name: "Data Feeds"
    url: "https://docs.chain.link/data-feeds"
    publisher: "Chainlink"
related:
  - "read-only-reentrancy-concentrated-liquidity"
  - "sybil-adjusted-tvl"
---

Most smart contract reviews are bug hunts. A reviewer reads the code, looks for known vulnerability classes, writes a proof of concept for the few issues they can trigger, and ships a report. That work is necessary. It is not the same as proving that the protocol's accounting holds.

An economic invariant audit starts from the opposite direction. Assume every function will be called in every order, state what must always be true about the protocol, and then ask whether any reachable state can make that statement false.

## Two questions, two methods

| Question | Bug hunt | Invariant audit |
| --- | --- | --- |
| What is tested | A function against expected inputs | The system against reachable states |
| Coverage argument | "We reviewed every line" | "The invariant held across N calls and M sequences" |
| Output | A list of issues | Invariant set, counterexamples, assumptions |
| Characteristic failure | Misses composed paths | Proves the wrong model |

A line-by-line review reasons about code. An invariant audit reasons about state.

## What counts as an invariant

An invariant is a predicate over protocol state that must hold before and after every externally callable transition. Four classes cover most DeFi systems.

**Solvency.** In a lending market, risk-adjusted collateral must cover outstanding debt:

`Σ (collateral_i × price_i × threshold_i) ≥ Σ debt_i`

**Conservation.** In an AMM, the invariant function must not decrease across a swap, except for the fee explicitly retained:

`k_after ≥ k_before`, where `k = x × y`

**Monotonicity.** In a vault, the value of one share must not decrease because another user deposited or withdrew:

`sharePrice_(t+1) ≥ sharePrice_t`

**Liveness.** A position below its collateral requirement must become liquidatable within a bounded number of blocks. If it cannot, bad debt accumulates faster than it can be cleared.

The exact statement matters more than the label. "The protocol is solvent" is not testable. "For every call sequence, risk-adjusted collateral does not fall below total debt" is.

## The workflow

1. **Model the state.** Enumerate storage variables, the transitions that mutate them, and the external inputs: oracles, callbacks, governance.
2. **Write the invariants in the protocol's own terms.** If the team cannot state one, that is the first finding.
3. **Instrument.** In Foundry, an invariant test drives a handler contract that exposes bounded random actions and asserts the property after each sequence. Echidna and the Solidity SMTChecker explore different parts of the same space.
4. **Run an adversarial campaign.** Longer sequences, extreme values, multiple actors, time jumps. Fuzzing finds counterexamples; symbolic execution finds paths fuzzing rarely reaches.
5. **Triage.** A failing invariant is either a real violation or a harness artifact. Both need an explanation.
6. **Report the invariant, the counterexample and the assumption set.** A finding without a reproducible sequence is an opinion.

A minimal Foundry invariant looks like this:

```solidity
contract SolvencyInvariant is Test {
    LendingMarket market;

    function setUp() public {
        market = new LendingMarket();
        targetContract(address(market));
    }

    function invariant_collateralCoversDebt() public view {
        uint256 adjusted = market.totalCollateralValue()
            * market.liquidationThresholdBps() / 10_000;
        assertGe(adjusted, market.totalDebt(), "insolvent");
    }
}
```

The value is not in the assertion. It is in the handler design: which functions are reachable, with what bounds, by how many actors.

## A worked example: oracle lag

Consider a market that prices collateral from a spot oracle and allows borrowing at 80% loan-to-value. The solvency invariant holds in every test where the oracle updates atomically with the trade.

Now add a second actor and a time jump. The price gaps down 15% between the oracle update and the liquidation transaction. Positions that were solvent at the old price are insolvent at the new one, and liquidators cannot close them fast enough.

The invariant did not fail because the arithmetic was wrong. It failed because the model assumed an input the protocol does not control. That is the most common outcome of an invariant audit: the code is correct and the system is still fragile.

## What a proof does not cover

- **Model risk.** The specification is an assumption. If it omits a state variable, the proof is silent about that variable.
- **Oracle correctness.** A feed can be stale, manipulable or simply wrong.
- **Governance and admin keys.** An upgrade can invalidate every claim about the previous implementation.
- **Economic assumptions.** Liquidity, rational actors and available capital are inputs, not theorems.
- **Deployment mismatch.** Verified source must match deployed bytecode. Otherwise the proof describes a different program.

A report that omits these limits is overselling. A proof is relative to a model, and the model is the reviewer's responsibility.

## How to read the output

Ask four questions of any invariant audit:

1. Is each invariant stated precisely, with units and thresholds?
2. Is every counterexample reproducible from a clean fork?
3. Does the fix restore the invariant, or only the failing test?
4. Are the assumptions explicit enough for another team to challenge them?

If any answer is no, the engagement was a bug hunt with better formatting. That is still useful. It is just not a proof.
