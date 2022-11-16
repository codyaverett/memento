---
aliases: 
tags: 
created: 2022-10-27T23:18:16-05:00
updated: 2022-11-16T16:51:04-06:00
name: airflow secret variables
---
# Airflow Secret Variables

- Admin > Variables

## Referencing Variables From a DAG

```python
from airflow.models import Variable

foo = Variable.get("foo")
foo_json = Variable.get("foo_baz", deserialize_json=True)
```