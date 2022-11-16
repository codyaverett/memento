---
created_at: 2022-10-07T03:03:20-05:00
modified_at: 2022-11-16T15:34:43-06:00
created: 2022-11-16T15:35:13-06:00
updated: 2022-11-16T15:35:13-06:00
---

Models are simple classes

## One to one relationship
```python
class Address(models.Model):
	street = model.Models.CharField(max_length=255)
	city = model.Models.CharField(max_length=255)
	customer = models.OneToOneField(Customer, on_delete=model.CASCADE, primary_key=True)
```

## One to many Relationship
A customer can have many different addresses now
```python
class Address(models.Model):
	street = model.Models.CharField(max_length=255)
	city = model.Models.CharField(max_length=255)
	customer = models.ForeignKey(Customer, on_delete=model.CASCADE)
```

## Reference
- Similar [[django class models]]
- Related [[DJango quick reference]]
- Related [[django data migrations]]