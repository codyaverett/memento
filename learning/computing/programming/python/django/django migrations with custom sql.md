---
created: 2022-11-16T15:11:31-06:00
updated: 2022-11-16T15:11:31-06:00
---
# Django migrations with custom sql

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