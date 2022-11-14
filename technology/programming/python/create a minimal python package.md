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

## Installing and using
```shell
» pip3 install required_env
Collecting required_env
  Downloading required_env-0.1.0.tar.gz (1.1 kB)
  Preparing metadata (setup.py) ... done
Building wheels for collected packages: required_env
  Building wheel for required_env (setup.py) ... done
  Created wheel for required_env: filename=required_env-0.1.0-py3-none-any.whl size=1455 sha256=8330a31dc37d00a498be9e2a1893303a366aef909270d1114fda1e41365e55a8
  Stored in directory: /Users/caavere/Library/Caches/pip/wheels/e8/8a/4b/c076e87be9184e91984b06ad305f9fe0b4400533c916dc310b
Successfully built required_env
Installing collected packages: required_env
Successfully installed required_env-0.1.0
```

Looking at the output in the python REPL
```python
» python
Python 3.10.6 (main, Aug 30 2022, 04:58:14) [Clang 13.1.6 (clang-1316.0.21.2.5)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import required_env
>>> dir(required_env)
['__builtins__', '__cached__', '__doc__', '__file__', '__loader__', '__name__', '__package__', '__spec__', 'environ', 'exit', 'get_required_envars']
```

## Minimal isn't everything
I'd like to add a short readme and some tests for future packages, but it's nice to know how easy it can be to create and upload python packages.

## Reference
- https://waylonwalker.com/minimal-python-package/