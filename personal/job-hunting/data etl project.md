# Data ETL project

Background and Objective Due to the decentralized nature of blockchain technologies, it can be challenging to obtain a full picture and understand what is happening on chain. The objective of this project is to build an ETL process to retrieve data from various data sources via APIs and a modern dashboard to analyze blockchain activities upon data you collected. 

We expect you to work on the full process from backend to frontend in this project including: 
- Understanding and documenting business/ data requirements 
- Collecting data from different sources for a set of addresses (we can provide you with sample addresses but feel free to find interesting groups of wallets which are publicly available); the data to be collected by the list of wallets will include transactions, token transfers, balance/token balance 
- Data preparation/Data cleansing and, optionally, feature engineering 
- Design and implement data pipelines, with dependencies, and store data 
- Data quality check for completeness and accuracy 
- Design [[OLAP data models]] 
- Build dashboards in Power BI/Retool/Superset or other providing insights on the amount of token transferred, fees, number of transactions, balance to date, run rate etc by address, dates 
- Prepare a solution that is easy to demonstrate and discuss the work you have done during the next scheduled call There are some considerations for this project: 
- Always keep in mind that your solution should be easy to scale, extend to other blockchains and processes many more input addresses 
- Feel free to use any tool or library that you think is helpful on this project 
- Please publish your solution to a github (or similar source-control platform) and include the instructions on your project in README.md 
- The target addresses we are interested in will be sent via slack (or you can suggest a list of addresses of your interest) 
- The data should be stored in a relational database
- The pipeline should be scheduled on a daily/ hourly/ minutely basis, whichever you think is the best for the analysis 

Please apply best practices from your previous experiences that you think make sense and can impress us, we value different perspectives 

## Requirements
- We expect your code follows good coding styles 
- Please include the instructions on your project in README.md
- We will discuss the work you have done during the next scheduled call, please prepare something that is easy to show what you have done and you think will help to understand your solution. 

## Expected Deliverables
- Your source code 
- The process/ pipeline design of how you conduct the project 
- The dashboard(s) 
- demo of the solution 
 
## Bonus points
- Design an incremental data load which can be started/stopped anytime and rerun on demand 
- Incorporate data pipeline monitoring from start to end with alerting 
- Describe the necessary steps to maintain and evolve your data pipeline
- Implement quality checks 
- Build prediction models for the key metrics mentioned in the requirements and visualize the outcome 
 
## References: 
- Ethereum: https://ethereum.org/en/developers/docs/intro-to-ethereum/ 
- Blocks: https://ethereum.org/en/developers/docs/blocks/ 
- Transactions: https://ethereum.org/en/developers/docs/transactions/ 
- Etherscan: https://etherscan.io/ , https://etherscan.io/apis 
- Bscscan: Binance (BNB) Blockchain Explorer (bscscan.com) , https://bscscan.com/apis