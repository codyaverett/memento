---
aliases: 
tags: 
created: 2022-11-16T15:11:29-06:00
updated: 2022-11-16T16:49:16-06:00
name: Fair Sequencing Services
---
# Fair Sequencing Services
- Ari Juels, Chief Data Scientist at ChainlinkLabs
- https://www.youtube.com/watch?v=wGBilgN-KHo

## Blockchain Transaction Ordering: Current Model
- Miners get to chose the order of transactions 
- They order transactions unilaterally
- This is a form of centralization

The order of transactions matters a lot.

## MEV "Miner-Extractable Value" [Daian Et Al. '19]
- There are many forms of MEV
	- Some "good," some "bad"
- E.g., certain forms of arbitrage
	- Communicates price information across markets
- E.g., sandwich attacks, front-running
	- Clearly bad

## What Can We Do?
- We probably can't eliminate all bad MEV.
- But we can build tools that can help enact fairer policies for users.

## Transaction Ordering in FSS
- Replace the miners with a collection of nodes
- A decentralized committee determines tx ordering!
- Happens off chain
- Decentralized Oracle Networks (DONs) ready-made committees!
- Reporting observed tx ordering is natural oracle functionality.

## FSS: Phase One
- Secure causal ordering (atomic broadcast)
- Intuition: No node sees tx payload before tx is ordered.

- Txns are submitted to the committee in an encrypted way
- Committee orders the transactions before the transactions are decrypted

### Secure Causal Ordering (atomic broadcast)
- Hard to front-run what you can't see!
- Works well, but some limitations:
	- Exploits based on metadata
	- Blind front-running
- Note: Secure causal ordering doesn't actually specify ordering.

## FSS: Phase Two +Aequitas
- Aequitas ordering (consensus) protocols
	- [Kelkar et al. '20] + forthcoming work
- Aequitas intuition: Order txs by (super-)majority receive time.
	- More complicated, but that's the idea...

- Aequitas prevents metadata-based and blind front-running
	- Potentially stronger than secure causal ordering, but...
	- Sensitive to network adversary and more complicated.
- Aequitas and secure causal ordering nicely complementary.

## Where Can FSS Be Used?
- FSS works well as preprocessing stage for L1.
	- Specific smart contracts can be FSS-enabled.
- Ordering is increasingly off chain in L2 (e.g., in rollups).
- FSS works equally well for L2 systems.

## Reference
- https://blog.chain.link/chainlink-fair-sequencing-services-enabling-a-provably-fair-defi-ecosystem/
- 