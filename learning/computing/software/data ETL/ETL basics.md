---
title: ETL basics
created: 2022-10-18
updated: 2026-07-29
aliases: [ETL Basics, ETL]
tags: [etl, architecture, concept]
type: evergreen
status: evergreen
---

# ETL basics

**Extract, Transform, Load** — move data from sources into a warehouse or analytics store with cleaning and shaping in between.

## When to use

- Batch or scheduled pipelines into a warehouse or lakehouse
- Consolidating operational systems for reporting and ML features

## When not to use

- Ultra low-latency request/response paths (consider streaming or CQRS instead)
- One-off spreadsheet work that does not need orchestration

## Load the data (Extract)

Get data from various sources (DBs, APIs, files, event logs).

## Types of transformations

- Aggregation
- Normalization
- Cleansing, type coercion, SCD handling (deeper notes under this folder)

## Tools (examples)

- Apache NiFi
- Informatica, Talend, Microsoft SSIS
- Apache Airflow (orchestrator often used around ETL)
- Modern ELT: load first, transform in warehouse (dbt + Snowflake/BigQuery/etc.)

## Data warehouse software

A general RDBMS can work; warehouses optimize analytics:

- Snowflake, Amazon Redshift, Greenplum, Teradata (historical enterprise)
- Lakehouse engines (see [[databricks]], [[trino]], [[databend]] notes)

## Related

- Index: [[Data ETL]]
- [[OLTP vs OLAP]], [[data warehouse]], [[data modeling]]
- Parent map: [[computing]]
- Quality bar: [[evergreen-quality]]
