---
created: 2022-11-16T15:11:32-06:00
updated: 2022-11-16T15:11:32-06:00
---
# Airflow hooks

- contains logic required to perform actions against an API, service, or some interface of some system
- Should not contain the logic of the operator, but expose methods that the operator will need to perform actions against the api, service, or system interface the operator is targeting

