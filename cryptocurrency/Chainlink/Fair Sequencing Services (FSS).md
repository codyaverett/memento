# Fair Sequencing Services
- Ari Juels, Chief Data Scientist at ChainlinkLabs
- https://www.youtube.com/watch?v=wGBilgN-KHo

## Blockchain transaction ordering: Current model
- Miners get to chose the order of transactions 
- They order transactions unilaterally
- This is a form of centralization

The order of transactions matters a lot.

## MEV "Miner-Extractable Value" [Daian et al. '19]
- There are many forms of MEV
	- Some "good," some "bad"
- E.g., certain forms of arbitrage
	- Communicates price information across markets
- E.g., sandwich attacks, front-running
	- Clearly bad

## What can we do?
- We probably can't eliminate all bad MEV.
- But we can build tools that can help enact fairer policies for users.

## Transaction ordering in FSS
- Replace the miners with a collection of nodes
- A decentralized committee determines tx ordering!
- Happens off chain
- Decentralized Oracle Networks (DONs) ready-made committees!
- Reporting observed tx ordering is natural oracle functionality.

## FSS: Phase One
- Secure causal ordering (atomic broadcast)
- Intuition: No node sees tx payload before tx is ordered.