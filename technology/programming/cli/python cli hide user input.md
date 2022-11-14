# Python cli hide user input

Using the `getpass` package
```python 
from getpass import getpass

user = input("Username: ")
password = getpass("Password: ")

print(user, password)
```