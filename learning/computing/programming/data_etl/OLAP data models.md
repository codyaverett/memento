---
name: OLAP Data Models
created: 2022-10-18T13:05:31-05:00
updated: 2022-11-28T17:35:53-06:00
aliases: 
tags: database, model
---
# OLAP Data Models

Online Analytics Processing System

Data in original form isn't always useful.
Structure data in cubes

## Cubes
A multi-dimensional dataset
- Hold data
- Collect data
- Calculate data as needed

### Dimensions
lists of related items that define a certain aspect of the business
e.g. 
- Products 
- Time
- Region

Dimensions are used to form cubes

### Measures
give you information about quantities that you are interested in
e.g.
- Cost 
- Quantity
- Duration

## What's the Point
Cubes are powerful tools for data analysis

Tracking sales for genres over quarters across several locations.  Versions (Budget, Actual, Variance)

![[Pasted image 20221018174903.png]]

## Reference
- [(video) The beginner's guide to OLAP modeling and modeling concepts](https://www.youtube.com/watch?v=5GOjioIcs8g)
- 