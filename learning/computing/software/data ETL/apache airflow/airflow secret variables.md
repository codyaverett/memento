---
created_at: 2022-10-27T23:18:16-05:00
modified_at: 2022-11-16T15:24:23-06:00
created: 2022-11-16T15:24:55-06:00
updated: 2022-11-16T15:24:55-06:00
---

# Airflow Secret Variables

- Admin > Variables

## Referencing variables from a DAG

```python
from airflow.models import Variable

foo = Variable.get("foo")
foo_json = Variable.get("foo_baz", deserialize_json=True)
```