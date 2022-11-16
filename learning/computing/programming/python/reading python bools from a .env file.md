---
aliases: 
tags: python
created: 2022-11-16T15:11:30-06:00
updated: 2022-11-16T16:51:04-06:00
name: Reading Python Bools From a .env File
---

# Reading Python Bools From a .env File
You have to write the code to do it yourself.
```python
from distutils.util import strtobool
DEBUG = bool(strtobool(os.getenv('DEBUG', 'True')))
```