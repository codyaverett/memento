
- I spread myself too thin
	- attempted to use technologies you all already used and are more familiar with.
- Etherscan style apis were not suitable for backfilling data incase of flow failure and would result in eventual data loss.
- Api layer was an unnecessary step for the purpose of this demo
- Slither smart contract static analysis could have been fruitful, but would require more hours than I had to truly understand the framework's outputs.
- When managing your own infrastructure, make frequent backups
- 


## Reimplementation
Steps I'd take differently
- Start with a simpler standardized datasource 
	- Kafka and JSON RCP connector to various blockchains
	- Sourcing data from the blocks directly would allow for checking data consistency and a simpler time backfilling data from missing blocks
- 