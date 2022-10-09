# Create a minimal python package

You only really need a minimum of 2 files.

```
from setuptools import setup

setup(
    name="my_modules",
    version="0.1.0",
    py_modules=["my_module", ],
    install_requires=["dep"],
)
```

## Reference
- https://waylonwalker.com/minimal-python-package/