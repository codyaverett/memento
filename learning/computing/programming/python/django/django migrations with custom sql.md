---
aliases: 
tags: 
created: 2022-10-07T03:24:21-05:00
updated: 2022-11-16T16:51:05-06:00
name: django migrations with custom sql
---
# Django Migrations with Custom Sql

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