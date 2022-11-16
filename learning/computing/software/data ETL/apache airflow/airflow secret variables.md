---
created: 2022-11-16T15:11:32-06:00
updated: 2022-11-16T15:11:32-06:00
---
# Airflow Secret Variables

- Admin > Variables

## Referencing variables from a DAG

```python
from airflow.models import Variable

foo = Variable.get("foo")
foo_json = Variable.get("foo_baz", deserialize_json=True)
```