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


# use twine to upload dist directory to pypi
» twine upload dist/*

Uploading distributions to https://upload.pypi.org/legacy/
Enter your username: code_e_averett
Enter your password:
Uploading required_env-0.1.0.tar.gz
100% ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 3.6/3.6 kB • 00:00 • ?

View at:
https://pypi.org/project/required-env/0.1.0/
```

## View on pypi

The package is publicly available here https://pypi.org/project/required-env/

![[Pasted image 20221008224217.png]]

## Minimal isn't everything
I'd like to add a short readme and some tests for future packages, but it's nice to know how easy it can be to create and upload python packages.

## Reference
- https://waylonwalker.com/minimal-python-package/