# Timescale DB
- Built on top of postgres, but is very performant against time series datasets

## What is time series data
- Tracks change over time, records have a timestamp and observations
- Stock price, CPU and memory usage, sensor data, ad views, COVID-19
- Can be captured at regular intervals (metrics) or irregular intervals (events)
- Immutability, ordered, append-only (INSERTs)
- Events whose value increases when you add time field (example: logins)
- Uses: pattern recognition, forecasting (trends, seasonality), anomaly detection

