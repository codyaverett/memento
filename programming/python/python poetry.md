# python poetry

One of the [[python package managers]]

[website](https://python-poetry.org/)

## Install
```shell
```bash
curl -sSL https://install.python-poetry.org | python3 -
```

## Initialize your Python project:

```sh
poetry init --no-interaction
```

This command will create a `pyproject.toml` file, the new Python package configuration file specified in [PEP 517](https://www.python.org/dev/peps/pep-0517/) and [518](https://www.python.org/dev/peps/pep-0518/).

```toml
# pyproject.toml
[tool.poetry]
name = "hypermodern-python"
version = "0.1.0"
description = ""
authors = ["Your Name <you@example.com>"]

[tool.poetry.dependencies]
python = "^3.8"

[tool.poetry.dev-dependencies]

[build-system]
requires = ["poetry>=0.12"]
build-backend = "poetry.masonry.api"
```

There you go: One declarative file in [TOML](https://github.com/toml-lang/toml) syntax, containing the entire package configuration. Let’s add some metadata to the package:

```toml
# pyproject.toml
[tool.poetry]
...
description = "The hypermodern Python project"
license = "MIT"
readme = "README.md"
homepage = "https://github.com/<your-username>/hypermodern-python"
repository = "https://github.com/<your-username>/hypermodern-python"
keywords = ["hypermodern"]
```

Poetry added a dependency on Python 3.8, because this is the Python version you ran it in. Support the previous release as well by changing this to Python 3.7:

```toml
[tool.poetry.dependencies]
python = "^3.7"
```

The caret (`^`) in front of the version number means “up to the next major release”. In other words, you are promising that your package won’t break when users upgrade to Python 3.8 or 3.9, but you’re giving no guarantees for its use with a future Python 4.0.
