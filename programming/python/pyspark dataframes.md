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

