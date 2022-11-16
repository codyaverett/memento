---
title: airflow secret variables
created: 2022-10-27T23:18:16-05:00
updated: 2022-11-16T15:45:51-06:00
---

- Admin > Variables

## Referencing variables from a DAG

```python
from airflow.models import Variable

foo = Variable.get("foo")
foo_json = Variable.get("foo_baz", deserialize_json=True)
```