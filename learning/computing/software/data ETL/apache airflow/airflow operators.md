---
created: 2022-11-16T15:11:32-06:00
updated: 2022-11-16T15:11:32-06:00
---
# Airflow operators

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

