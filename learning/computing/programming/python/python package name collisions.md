---
name: Python Package Name Collisions
created: 2022-11-16T15:11:30-06:00
updated: 2022-11-28T17:43:00-06:00
aliases: 
tags: python, packaging
---
# Python Package Name Collisions

There can be instances where two packages have the same import name.  The last package imported wins.

I had this occur with the `pytest-dotenv`, `django-dotenv`, and `python-dotenv` packages.  They all have the same `dotenv` package name.  Pip doesn't have any way to rename this during install.

This collision prevented me from using an `.env` file in my Django application and within pytest at the same time.

```shell
./start_app.sh 
Traceback (most recent call last):
  File "/Users/caavere/Projects/jobs/acre-trader-challenge/src/manage.py", line 5, in <module>
    from dotenv import read_dotenv
ImportError: cannot import name 'read_dotenv' from 'dotenv' (/Users/caavere/.local/share/virtualenvs/acre-trader-challenge-t4xepHAx/lib/python3.10/site-packages/dotenv/__init__.py)
```

However, It turns out that the `pytest-dotenv` could be used instead.  The key difference was that I was using the `read_dotenv` function instead of the `load_dotenv` function.

```python
# from python_dotenv
>>> import dotenv
>>> dir(dotenv)
['Any', 'Optional', '__all__', '__builtins__', '__cached__', '__doc__', '__file__', '__loader__', '__name__', '__package__', '__path__', '__spec__', 'dotenv_values', 'find_dotenv', 'get_cli_string', 'get_key', 'load_dotenv', 'load_ipython_extension', 'main', 'parser', 'set_key', 'unset_key', 'variables']

# from djano_dotenv
>>> import dotenv
>>> dir(dotenv)
['__builtins__', '__cached__', '__doc__', '__file__', '__loader__', '__name__', '__package__', '__spec__', '__version__', 'line_re', 'os', 'parse_dotenv', 're', 'read_dotenv', 'sys', 'variable_re', 'warnings']

 # from pytest_dotenv
>>> import dotenv
>>> dir(dotenv)
['Any', 'Optional', '__all__', '__builtins__', '__cached__', '__doc__', '__file__', '__loader__', '__name__', '__package__', '__path__', '__spec__', 'dotenv_values', 'find_dotenv', 'get_cli_string', 'get_key', 'load_dotenv', 'load_ipython_extension', 'main', 'parser', 'set_key', 'unset_key', 'variables']
```

Things like this can be a little confusing especially if the libraries aren't documented very well.

## Workarounds if I Needed to Fix the Collision
1. Fork the project and publish to pypi under your own name
2. Use `pip download` to download a local copy of the package where you can then change the name to be something else.

## Reference
- https://stackoverflow.com/questions/27308293/how-to-install-python-package-with-a-different-name-using-pip
