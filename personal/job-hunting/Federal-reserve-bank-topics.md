
```toc
```

## Intro
Hi, My name is Cody Ave-Rett
I'm coder at heart and and love doing Cody things
I guess my mom always knew I would grow up to be a coder.  I like my name.

I live in rogers AR with my wife, 2 doggos and 2 cats
Pricilla, Peanut, Pascal, and Panko

I like geeking out over code, music theory, space things (star power, spaceship earth), and I like anime (I'm in the middle of rewatching all 1000 episodes of Naruto)

I have a lot of general programming experience with high and low level programming languages

I've worked at the Walmart and their corporate office for the past 13 years
	and I've worked in a lot of different areas
	like, Point of sale processing and streaming customer Data
		- Electronic Journal, searching through and locating transaction related data.  
		- Native C++ Data parser,
		- IBM Broker Toolkit for DATA ETL
		- Customer transaction api - query customer transaction related data
	I've worked around the store systems area providing production support and root cause analysis of high volume problems
		- I had Support reduction goals
		- Had to reduce the overall cost of support by automating and eliminating waste in our processes
		- Automated manual tasks with scripts and scheduled jobs
		- Provided On call support 
		- and had was a technical lead for a 30+ member 24/7 (on and offshore) support team
	I've worked in a team called "Software Delivery Enablement" making devtools and improving the internal developer experience
		- Contributed to the UI and DSL (Domain specific language) an opensource workflow orchestration tool called Concord (concord.walmartlabs.com)
		- Updated and improved developer documentation
		- Created apis reporting cloud compute resources and allocations
		- Created apis and UIs to report cost of cloud infrastructure and area budgets
	In my latest role at Walmart was a Senior Manager and Staff Data Engineer running a "shadow IT" operation for walmart business 
	
Walmart is a heavily data-driven company, so it's good to be comfortable working with data at any level.

## Basic Qualifications

### 3+ years designing and contributing to API-based project(s)
- I have been doing this my entire 10 year programming career
- [[python basics]]


### 3+ years professional experience with Python
- I have around 8 years experience with using python in a professional capacity for various projects.
- My latest experience was using python to create plugins for Redhat's IT automation framework Ansible
- Prior to that I worked on a APIs to aggregate application resiliency metrics across the walmart internal cloud systems (before we started using gcp and azure more regularly)
- I used Python to expose IBM 4690 system information over an API for development purposes
- I have had some side projects and have some experience with DJango and Pygame
	- Simple websites
	- Smaller refresher projects over the last month

### 2+ years of experience with relational databases, like PostgreSQL(preferred), MySQL, SQL Server, Oracle
- Most recently used Microsoft SQL Server for the past 3 years
	- Used Stored Procedures with TSQL to simplify some interactions with the database
- Google BigQuery over the past year 
- SQLite for small demo projects (Lacks some advanced features and more complex table joins)
- I've used PostgreSQL while working on WalmartLabs Concord
	- version controlled database changes with [liquibase](https://www.liquibase.com/resources/guides/database-version-control)
- Queried information from Oracle DB2 and Teradata systems

[Advanced SQL need to know](https://medium.com/dp6-us-blog/7-advanced-sql-concepts-you-need-to-know-45fa149ba0b0)
Built out tables and with normalized data and relationship tables
Aggregations

### 1-2 years of experience with a web application framework in any of: Python, Java, .NET, Ruby, Node.js, or Go
- 8 years building webapps
- I've created webapps in Python (django), Java, .Net, and NodeJS
- I used Fastify and Express with NodeJS
- Used Java SpringBoot with tomcat and jetty webservers
- ASP .NET
- DJango [[DJango quick reference]]

### 1-2 years of experience designing and integrating with web-based HTTP APIs (REST (preferred), GraphQL, SOAP)
- I am very familiar with designing and integrating REST based apis
- Tested apis with postman
- Documented apis with Swagger
- I have played with GraphQL and used it on a few internal Gatsby JS sites (Used GraphQL on the application build step)
- I do not like SOAP and XML based queries.  
	  It's cumbersome, verbose and there are simpler ways to get the same job done
	  One advantage of using XML based requests is that it's potentially easier to process partially retrieved data

### 1-2 years of experience with ETL or data processing/integration using tools such as Apache Spark, PySpark, Pandas, Parquet, Amazon EMR, Databricks, Informatica, Oracle Data Integrator, SQL Server Integration Services, or similar platforms or vendor tools
- Past 3 years I've been using Microsoft SSIS (SQL Server Integration Services)
- We used apache Spark [[pyspark reference]] to ingest various kafka topics, 
  I wrote code to posted to specific kafka topics from a system running at every walmart store on the planet 

### 1-2 years developing applications using an Object/Relational Mapper, Django ORM (preferred), Hibernate, Entity Framework.
- We made our own ORM in typescript to help us query data from our SQL Server instances
	- Called it SQL builder.
	- The abstraction made it really simple for us to connect to 
	- Helped us avoid common issues 
  I've used other ORMs before like Sequelize and TypeORM they are handy
- Familiar with Django ORM
	- QuerySets - iterable object

## Additional Qualifications

### Experience working within and influencing Agile teams.
- I've worked on many different agile teams over the years, used Kanban and SCRUM methodologies
- In my last role I facilitated SCRUM ceremonies for the team, PI planning, participated in daily stand ups, Backlog grooming, and sprint retrospectives 
- Kanban is better for more support roles
- SCRUM is better for project based work

### Experience submitting Pull Requests in GitHub, and passing Continuous Integration checks
- Yes, been using git for 10+ years
- Developed CI and CD pipelines that automatically ran against new PRs and merges to the main branch
- Custom Jenkins (Internally at Walmart I used Looper)

### Proficiency developing and deploying applications on a Linux OS
- I'm an EXPERT at this
- I like to automated my deployments 100% and hook up a git based CICD process
- Linux in containers to do things

### Proficiency with non-relational/NoSQL databases, like Elasticsearch (preferred), Cassandra, MongoDB, Neo4j, OrientDB, or similar
- I have experience with MongoDB (Walmart Carshow Application for charity)
- I'm 

### Experience with a caching solution, like ElasticCache (preferred), Redis, Memcache, Hazelcast, Geode/GemFire or similar
- I used Redis as a quick in memory database
- Researched using it as a distributed in memory db to store application deployment configurations
- Ended up using ETCD to manage those though

### Proficiency with Spark APIs (preferably PySpark) to manipulate DataFrames
- Familiar with Apache Spark 
- [[pyspark reference]]
	- Create RDDs

### Experience building and tuning analytical SQL queries for ETL, reporting, or AI/ML data prep, preferably using PostGres
- Yes I am familiar with tuning Analytical SQL queries
- Normalizing Data structures
- Properly index data in tables to ensure quick execution times
- Tune queries to prevent too many sequential scans on the table
- Want to gain more experience in the AI/ML space.  I'm very interested in ML topics.

### Experience managing AWS cloud services, such as RDS, EC2, S3 and the AWS CLI
- Completed a Course and was mentored in AWS server functions and server logging
- Internally at Walmart we did not use AWS because it would have been a conflict of interest
- I have a lot of experience managing cloud computes and platform as a service instances
- linux systems and distributed storage (IPFS)
- Mentored in AWS logging

### Experience using Docker to build containerized microservices applications and DevOps tools
Extensive docker container experience
Been using docker since 2017 to containerize services, apps
Podman to allow for network segregation in my redhat linux cluster