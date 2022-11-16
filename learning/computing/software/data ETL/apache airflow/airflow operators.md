---
aliases: 
tags: 
created: 2022-10-29T14:02:34-05:00
updated: 2022-11-16T16:51:04-06:00
name: airflow operators
---
# Airflow Operators

- contains business logic of what will be a task in an airflow DAG
- deals with how your task will behave and the actions it will perform
- should never communicate with the service, API, or system directly.
	- this should be done through hooks

## Flow

System/API <-> Hook <-> Operator

- Keeping the operator decouped from the system will allow multiple operators to use the same system connections.

e.g.

API <-> API hook <-> CreateTransactionOperator
							<-> UpdateTransactionOperator
							<-> DeleteTransactionOperator

