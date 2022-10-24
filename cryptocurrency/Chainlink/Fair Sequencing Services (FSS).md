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

