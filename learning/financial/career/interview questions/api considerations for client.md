---
name: Api Considerations for Client
created: 2022-11-20T17:46:39-06:00
updated: 2022-11-20T20:58:12-06:00
aliases: 
tags: prompt
---
# Api Considerations for Client

An enterprise company is interested in building a web service complete with front-end website. You are hired to do the job. What are some considerations you must take into account when doing this job?

- What is the business use case?
	- Who approves work?
	- What is the API's expected SLAs?
	- Who are the primary stakeholders?
	
- Where will we source and store data?
	- Retention periods?
	- Storage limitations?
	  
- What is the company timeline for this project?
- Is this a new application or is it replacing an existing sets of functionalities?
- Is there any design and strategy documentation already existing for the product?
- Does the company have any style-guides or restrictions on language and frameworks?
- What kind of role based access requirements are there for the application and web service?

- Application Architecture
	- Documentation and future developer onboarding.
	- Application Scalability
		- Stateless apps?
		- Stateful sets?
		- Application Containers
	- Maintainability
		- API versioning
		- Dependency injection
		- Minimize hard coupling between backend components
		- Maximize functional cohesion of api handlers
		- CICD Pipeline and minimal downtime on upgrades and downgrades
	- Testing strategy
		- Behavioral Unit tests at a minimum
		- Load testing
	 - Application Telemetry
		 - Usage Statistics
		 - Uptime
	- Logging
		- Retention periods
		- Log Levels