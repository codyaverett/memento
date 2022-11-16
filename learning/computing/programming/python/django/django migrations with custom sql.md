---
title: django migrations with custom sql
created: 2022-10-07T03:24:21-05:00
updated: 2022-11-16T15:51:10-06:00
---

```python
dependencies = [
	('store', '0003_add_slug_to_product' ),
]

operations = [
	migrations.RunSQL("""
		INSERT INTO store_collection (title)
		VALUES ('collection1'
	""", """
		DELETE FROM store_collection
		WHERE title='collection1'
	""")
]
```


## Reference
- Related [[django data migrations]]