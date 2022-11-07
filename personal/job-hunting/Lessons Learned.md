
- I spread myself too thin
	- attempted to use technologies you all already used and are more familiar with.
- The etherscan style apis were not suitable for backfilling data incase of flow failure and would result in eventual data loss.  Would need 
- Too many moving pieces in my solution
- I wanted to find interesting data and went down the rabbit hole with slither's smart contract static analysis.
- Should have backed up my db/cloud instances 


## Reimplementation

- Start with a simpler data source, e.g. JSON RCP
- Use Kafka or some other type of pup-sub system that is designed to handle near real-time
- Use JSON RCP connector to source block data directly
- Sourcing data from the blocks directly would allow for checking data consistency and a simpler time backfilling data from missing blocks
- 