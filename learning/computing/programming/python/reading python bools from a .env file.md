---
name: Reading Python Bools From a .env File
created: 2022-11-16T15:11:30-06:00
updated: 2022-11-16T16:52:05-06:00
aliases: 
tags: python
---

# Reading Python Bools From a .env File
You have to write the code to do it yourself.
```python
from distutils.util import strtobool
DEBUG = bool(strtobool(os.getenv('DEBUG', 'True')))
```