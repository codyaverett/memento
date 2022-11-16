---
created: 2022-11-16T15:11:31-06:00
updated: 2022-11-16T15:11:31-06:00
---
# Python cli hide user input

Using the `getpass` package
```python 
from getpass import getpass

user = input("Username: ")
password = getpass("Password: ")

print(user, password)
```