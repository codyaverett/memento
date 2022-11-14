# Airflow Secret Variables

- Admin > Variables

## Referencing variables from a DAG

```python
from airflow.models import Variable

foo = Variable.get("foo")
foo_json = Variable.get("foo_baz", deserialize_json=True)
```