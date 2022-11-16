---
aliases: 
tags: 
created: 2022-11-16T15:11:30-06:00
updated: 2022-11-16T16:49:15-06:00
name: python packaging
---
# Python Packaging

- [reference](https://realpython.com/pypi-publish-python-package/)

Example package layout
```shell
realpython-reader/
│
├── src/
│   └── reader/
│       ├── __init__.py # keep small, but represens package root and can specify package constants/docs/etc
│       ├── __main__.py # main entry for the package
│       ├── config.toml # Configuration file for package TOML key value pairs
│       ├── feed.py # 
│       └── viewer.py
│
├── tests/
│   ├── test_feed.py
│   └── test_viewer.py
│
├── LICENSE
├── MANIFEST.in
├── README.md
└── pyproject.toml
```

## Executing an Installed Module

```shell
# Assuming reader is installed
python -m reader
```

When the `-m` flag is used, python is actually looking for a special file named `__main__.py`