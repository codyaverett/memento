---
created_at: 2022-10-18T18:35:35-05:00
modified_at: 2022-11-16T15:30:06-06:00
created: 2022-11-16T15:30:36-06:00
updated: 2022-11-16T15:30:36-06:00
---

Using the `getpass` package
```python 
from getpass import getpass

user = input("Username: ")
password = getpass("Password: ")

print(user, password)
```