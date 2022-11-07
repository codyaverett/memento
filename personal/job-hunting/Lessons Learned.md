
- I spread myself too thin and attempted to pull in different technologies you all used and were familiar with already.
- The data source, etherscan was not suitable for backfilling data incase of flow failure and would result in eventual data loss


## Reimplementation

- Start with a simpler data source, e.g. JSON RCP api
- Use Kafka or some other type of pup-sub system that is designed to handle near real-time
- Use JSON RCP connector to source block data directly
- Sourcing data from the blocks directly would allow for checking data consistency and 