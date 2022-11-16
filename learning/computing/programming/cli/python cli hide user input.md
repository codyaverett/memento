---
aliases: 
tags: 
title: python cli hide user input
created: 2022-10-18T18:35:35-05:00
updated: 2022-11-16T16:49:16-06:00
name: python cli hide user input
---
# python cli hide user input

Using the `getpass` package
```python 
from getpass import getpass

user = input("Username: ")
password = getpass("Password: ")

print(user, password)
```