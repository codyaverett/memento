
- I spread myself too thin
	- attempted to use technologies you all already used and are more familiar with which did not set up any potential wow factors.
	- Api layer was an unnecessary step for the purpose of this demo
- Etherscan style apis were not suitable for backfilling data incase of flow failure and would result in eventual data loss.
- Slither smart contract static analysis could have been fruitful, but would require more hours than I had to truly understand the framework's outputs.
- When managing your own infrastructure, make frequent backups

Steps I'd take differently
- Start with a simpler standardized datasource through json rcp connections
	- Sourcing data from the blocks directly would allow for checking data integrity 
	- simpler time backfilling data from any missing blocks
