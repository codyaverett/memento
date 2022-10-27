# Timescale DB
- Built on top of postgres, but is very performant against time series datasets

## What is time series data
- Tracks change over time, records have a timestamp and observations
- Stock price, CPU and memory usage, sensor data, ad views, COVID-19
- Can be captured at regular intervals (metrics) or irregular intervals (events)
- Immutability, ordered, append-only (INSERTs)
- Events whose value increases when you add time field (example: logins)
- Uses: pattern recognition, forecasting (trends, seasonality), anomaly detection

## Why timescaleDB
- 260% higher insert performance, up to 54x faster queries, simpler implementation when using TimescaleDB vs MongoDB for time-series data
	- https://blog.timescale.com/blog/how-to-store-time-series-data-mongodb-vs-timescaledb-postgresql-a73939734016/
- Better Data Model, Query Language, and Reliability
	- https://blog.timescale.com/blog/timescaledb-vs-influxdb-for-time-series-data-timescale-influx-sql-nosql-36489299877/
- Embraces SQL, not a SQL-like language
- One database for both relational and time-series data
- Built on top of PostgreSQL, open source for 25 years

## Features
- Fast ingestion of time-series data
- Time-oriented Analytics functions
	- histogram()
	- interpolate()
	- last()
	- time_bucket()
	- locf()
- Continuous Aggregates
	- rolling up data into time based data sticks (daily, weekly candles, etc.)
- Data retention policies
- Compression and Jobs
- Availability of PostgreSQL tools and ecosystem

## Why Postgres
- Battle-tested, scalable, fast, store anything
- Power of SQL, Aggregation, JOIN on existing business data, triggers, stored procedures, relations
- Tooling - SQLAlchemy, Django ORM
- PostgreSQL extensions (postgis lat/long geometric shapes)
- Can store JSON documents (e.g. API response)
- Fully open-source, not owned by publicly traded company
- Used by many of the most successful companies

