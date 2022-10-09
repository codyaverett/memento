# Python package name collisions

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

## Workarounds
1. Fork the project and publish to pypi under your own name
2. Use `pip download` to download a local copy of the package where you can then change the name to be something else.

## Reference
- https://stackoverflow.com/questions/27308293/how-to-install-python-package-with-a-different-name-using-pip
