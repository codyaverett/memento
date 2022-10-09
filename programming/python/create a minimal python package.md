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
# install twine, pipenv creates pipfile and pipfile.lock
pipenv install --dev twine

# Create source distribution
python setup.py sdist

## This creates a bunch of stuff
.
├── Pipfile
├── Pipfile.lock
├── dist
│   └── required_env-0.1.0.tar.gz
├── required_env.egg-info
│   ├── PKG-INFO
│   ├── SOURCES.txt
│   ├── dependency_links.txt
│   └── top_level.txt
├── required_env.py
└── setup.py


# use twine to upload dist
```

## Reference
- https://waylonwalker.com/minimal-python-package/