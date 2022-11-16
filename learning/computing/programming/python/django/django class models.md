---
aliases: 
tags: 
title: django class models
created: 2022-09-14T03:28:04-05:00
updated: 2022-11-16T16:49:15-06:00
name: django class models
---
# django class models

It's really simple to add and remove new db models

## Create Class to Represent Model
```python
from django.db import models

class Product(models.Model):
	title = models.TextField()
	description = models.TextField()
	price = models.TextField()
	active = models.BooleanField(default=True)
	summary = models.TextField(blank=True, null=True)
	# There are lots of other types of fields
```

[Field Types](https://docs.djangoproject.com/en/4.1/ref/models/fields/#field-types)

## Update Models

```shell
python manage.py makemigrate # Create the migration files
python manage.py migrate # Apply migration files
```

## View the New Table in the DB
I'm using the default sqlite3 db that was auto generated here.

```shell
sqlite> .tables
auth_group                  django_admin_log          
auth_group_permissions      django_content_type       
auth_permission             django_migrations         
auth_user                   django_session            
auth_user_groups            store_product             
auth_user_user_permissions
sqlite> SELECT * FROM store_product
   ...> ;
1|Woo hoo|This really doesn't bode well|1999||1
```

## Add the Model to the Admin Panel
- in the `admin.py` file of your django app module do a relative import of the models and use the `admin.site.Register(Product)` function to 

```python
from django.contrib import admin
from .models import Product

admin.site.register(Product)
```

Profit!  You can manipulate the Product information directly from the DJango admin site.
![[Pasted image 20220914033351.png]]

## Using the Python Shell to Create Products

```shell
python manage.py shell

>>> from products.models import Product
>>> Product.objects.all()
>>> Product.objects.create(title='New prod 2', description='anoth', price='245', summary='woohoo')
>>> 
```

