---
title: "Verifying a DEX contract registry: the checklist behind 24+ addresses"
description: "A practical registry-verification checklist for multi-chain DEX deployments: proxy slots, upgrade authority, explorer verification and Solana program accounts."
dek: "A published contract address is a trust boundary. Verifying a registry means checking the proxy, the implementation, the admin and the chain — not just that the address exists."
practice: defi
published: 2026-11-08
updated: 2026-11-08
topics:
  - name: "Decentralized exchange"
    sameAs: "https://www.wikidata.org/wiki/Q59785441"
  - name: "Smart contract"
    sameAs: "https://www.wikidata.org/wiki/Q7544035"
  - name: "Ethereum"
    sameAs: "https://www.wikidata.org/wiki/Q16783523"
sources:
  - name: "EIP-1967: Standard Proxy Storage Slots"
    url: "https://eips.ethereum.org/EIPS/eip-1967"
    publisher: "Ethereum Improvement Proposals"
  - name: "EIP-1822: Universal Upgradeable Proxy Standard"
    url: "https://eips.ethereum.org/EIPS/eip-1822"
    publisher: "Ethereum Improvement Proposals"
  - name: "Proxy contracts"
    url: "https://docs.openzeppelin.com/contracts/5.x/api/proxy"
    publisher: "OpenZeppelin"
  - name: "Upgrading smart contracts"
    url: "https://ethereum.org/developers/docs/smart-contracts/upgrading/"
    publisher: "ethereum.org"
  - name: "Anchor documentation"
    url: "https://www.anchor-lang.com/docs"
    publisher: "Anchor"
  - name: "Aster DEX"
    url: "https://www.asterdex.com/"
    publisher: "Aster DEX"
related:
  - "economic-invariant-audits"
  - "read-only-reentrancy-concentrated-liquidity"
---

Every DEX publishes a list of contract addresses. Users copy them into wallets, integrations hard-code them, and reviewers cite them as evidence of a live deployment. A single stale entry is a total-loss event.

Registry verification is therefore a security control, not documentation hygiene. It deserves the same evidence standard as an audit finding.

## Four chains, two verification models

| Chain family | What "verified" means | Primary risk |
| --- | --- | --- |
| Ethereum, BNB Chain, Arbitrum | Explorer source matches bytecode; proxy pattern identifiable | Stale implementation after an upgrade |
| Solana | Program account exists; IDL may be published | Upgrade authority still active |
| SUI | Object exists; package may be published | Object ownership and upgrade authority |

On EVM chains, the proxy is the address users interact with and the implementation is where the logic lives. On Solana there is no proxy standard: a program is either immutable or controlled by an upgrade authority, and the registry must say which.

## The checklist

1. **Bytecode exists** at the address on the stated chain. An EOA or empty address fails immediately.
2. **Explorer verification matches** the claimed source, compiler version and optimisation settings.
3. **Proxy pattern identified**: transparent, UUPS, beacon, or none.
4. **Implementation slot read directly**, not trusted from an explorer label.
5. **Upgrade authority identified**: proxy admin, multisig, timelock, or the Solana/SUI upgrade authority. Who can change the logic is the real risk.
6. **Function surface matches the label**: a contract described as a vault should expose vault functions, not a router's.
7. **Token parameters** where relevant: decimals, mint authority, pause switches.
8. **Cross-chain consistency**: the same protocol on five chains has five addresses, and no testnet entry may appear in mainnet documentation.

## Reading the implementation slot

For EIP-1967 proxies the implementation address lives at a fixed storage slot:

```
0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc
```

In a Foundry test you can read it without trusting the explorer:

```solidity
bytes32 constant IMPL_SLOT =
    0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;

function implementationOf(address proxy) public view returns (address) {
    return address(uint160(uint256(vm.load(proxy, IMPL_SLOT))));
}
```

The admin slot is `0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103`. If the admin is an externally owned account rather than a multisig or timelock, that is a finding regardless of how good the implementation is.

## What the five registry patterns imply

The published registry spans five deployments. Each pattern shifts where the risk sits.

| Pattern | Registry entry | What a reviewer should conclude |
| --- | --- | --- |
| Transparent proxy | BNB Chain, Solidity 0.8.19 / OpenZeppelin 4.9 | Admin cannot call implementation functions directly; the admin key is the central risk |
| UUPS | Ethereum, ERC-1967 / Solidity 0.8.20 | Upgrade logic sits in the implementation; a bug in `_authorizeUpgrade` is critical |
| Transparent proxy, L2 | Arbitrum, Solidity 0.8.24 | Same model plus L2-specific admin and sequencer assumptions |
| Immutable Anchor program | Solana, SPL-Token / Rust 1.75 | No upgrade path; verify program ID, IDL and token mint separately |
| SUI object | SUI bridge object | Verify the object ID and package upgrade authority separately |

The registry states the pattern and the compiler line. Verification confirms those statements on-chain rather than repeating them.

## Evidence standard

A registry entry should carry, at minimum:

- the explorer link for the address;
- the block number at which it was checked;
- the implementation address behind the proxy;
- the admin or upgrade authority;
- a date, because every one of these can change.

A screenshot is not evidence: it cannot be re-checked after an upgrade. A reproducible script or a dated explorer link can.

## Failure modes to check first

- **Documentation lag.** The proxy is upgraded and the docs still list the old implementation.
- **Implementation listed as the product.** Users send funds to the logic contract, which has no storage.
- **Cross-chain copy-paste.** The BNB Chain address appears on the Arbitrum page.
- **Testnet leakage.** A Sepolia address in a mainnet table.
- **Solana program vs token mint.** Two different addresses, routinely confused in docs.

## Why this belongs in an audit

Registry verification is cheap, and it prevents a class of loss that no amount of Solidity review can catch. It is also the first place a reviewer can demonstrate that published claims match the chain.

The live registry, re-checked against the official docs, is maintained at [Aster DEX contract addresses](/aster-dex/contracts/).

If the registry is wrong, everything downstream — audit links, TVL figures, integration guides — inherits the error.
