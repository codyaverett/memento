---
tags: python
---

# Reading python bools from a .env file
You have to write the code to do it yourself.
```python
from distutils.util import strtobool
DEBUG = bool(strtobool(os.getenv('DEBUG', 'True')))
```