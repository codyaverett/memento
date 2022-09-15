# pyspark dataframes

```python
from pyspark import SparkContext
sc = SparkContext.getOrCreate()
data = sc.parallelize([('Jordan', 100), ('Jason', 150), ('Jack', 200)])
#data_file = sc.\textFile('')
data_example = sc.parallelize([('Jordan',100), ('Jason', 150), ('Jack', 200)]).collect()

print(data_example) # [ ('Jordan', 100), 'Jason', 150), ('Jack', 200)]

data_second = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
distData = sc.parallelize(data_second)
distData.reduce (lambda a, b: a + b) # 55 
```

```python
import pyspark as spark
from pyspark.sql import SparkSession

spark = SparkSession \
	.builder \
	.appName("Python Spark SQL basic example") \
	.config("spark.some.config.option", "some-value") \
	.getOrCreate()

df = spark.read.csv('creaditcard.csv')

df.printSchema()
df.head()
df.count()
df.dropna().count() # Drop the null values
df.fillna(-1).show(5) # replace nulls with -1 show top five rows
```



 