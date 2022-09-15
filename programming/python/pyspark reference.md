# pyspark reference

- Python API to support Apache Spark
- Spark SQL
- Spark Context is the entrypoint to any Apache Spark functionality

```shell
jps # See java related processes
```

## Local spark cluster
```
um1:8080 # url to see local spark clusters
```

![[Pasted image 20220915032455.png]]

You will see which processes are running on the cluster here too

Application details will show what is happening.

`/usr/local/spark`
`sparkR`
`spark-sql
`pyspark`

## Writing pyspark functinos

```python
#!/bin/pyspark to start interative shell 
```

x = sc.textFile

## RDD 
transformations on RDD to create other RDDs

## Use cases

- Caching
- Disk Persistance
- Real-Time processing

## Using Scala vs python with spark
Spark is written in SCALA so runs faster in that language
Python is slower, but has simple syntax and is easier to learn

Python has a Rich set of libraries for data visualization and model building

## PySpark Contents
- SparkConf
	- provides configurations to run a spark application
- SparkContext
	- Configuration to point to the spark cluster
- SparkFiles
	- Read files from filesystems
- RDD
	- Building blocks for spark
	- Resilient Distributed Database in memory
	- Anytimes you do anything with spark, you 
- StorageLevel
	- persistances
- DataFrame
	- DataSets
- Broadcast & Accumulators
- 