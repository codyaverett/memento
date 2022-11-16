---
aliases: 
tags: 
created: 2022-10-29T14:00:59-05:00
updated: 2022-11-16T16:51:04-06:00
name: airflow hooks
---
# Airflow Hooks

- contains logic required to perform actions against an API, service, or some interface of some system
- Should not contain the logic of the operator, but expose methods that the operator will need to perform actions against the api, service, or system interface the operator is targeting

