# python packaging

- [reference](https://realpython.com/pypi-publish-python-package/)

Example package layout
```shell
realpython-reader/
│
├── src/
│   └── reader/
│       ├── __init__.py
│       ├── __main__.py
│       ├── config.toml
│       ├── feed.py
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

## executing an installed module

```shell
# Assuming reader is installed
python -m reader
```