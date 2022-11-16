---
title: python cli hide user input
created: 2022-10-18T18:35:35-05:00
updated: 2022-11-16T16:02:35-06:00
---

Using the `getpass` package
```python 
from getpass import getpass

user = input("Username: ")
password = getpass("Password: ")

print(user, password)
```