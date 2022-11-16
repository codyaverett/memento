---
tags: python
created: 2022-11-16T15:11:30-06:00
updated: 2022-11-16T15:11:30-06:00
---

# Reading python bools from a .env file
You have to write the code to do it yourself.
```python
from distutils.util import strtobool
DEBUG = bool(strtobool(os.getenv('DEBUG', 'True')))
```