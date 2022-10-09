# Create a minimal python package

You only really need a minimum of 2 files.

1. A setup file `setup.py`
```
from setuptools import setup

setup(
    name="my_modules",
    version="0.1.0",
    py_modules=["my_module", ],
    install_requires=["dep"],
)
```

2. The module file itself, whatever you want to name it
```python


```

## Publish steps

```shell
# install twine
pipenv install --dev twine

# Create source distribution
python setup.py sdist

# use 
```

## Reference
- https://waylonwalker.com/minimal-python-package/