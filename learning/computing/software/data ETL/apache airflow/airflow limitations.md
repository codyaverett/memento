---
name: Airflow Limitations
created: 2022-10-18T21:54:30-05:00
updated: 2022-11-16T16:52:05-06:00
aliases: 
tags: 
---
# Airflow Limitations

- It's a workflow management platform
- It runs any workflow you want to run, doesn't have to be a data etl job
- It's really just a job scheduler
- No loops! Acyclic!

## Identity Crisis
- Heavily promoted as an ETL Service
- CRON on Steroid
- Can be used for any scheduled work
- Designed to be an underlying service

## Limitations
- Does not have any ETL functionality
- Requires 100% python coding
- Complex framework with a steep learning curve
- Requires it's own codebase and devops
- Strong coupling of job scheduler with app code

## Alternatives
- Apache NiFi (no-code)
- AWS Glue/Azure Data Factory/GCP Dataproc
- Kettle by Pentaho
- Databricks Jobs/Notebooks

## What Airflow is Good for
- Drawing DAGs
- Complex Computations (rerunning pieces of jobs)
- Want self contained ETL in Python
- You need Meticulous Control

## Reference
- https://www.youtube.com/watch?v=YQ056EKzCyw