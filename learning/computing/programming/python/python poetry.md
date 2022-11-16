---
aliases: 
tags: 
created: 2022-11-16T15:11:30-06:00
updated: 2022-11-16T16:51:04-06:00
name: Python Poetry
---
# Python Poetry

One of the [[python package managers]]

[website](https://python-poetry.org/)

## Install
```shell
```bash
curl -sSL https://install.python-poetry.org | python3 -
```

## Initialize Your Python Project:

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

## Usage

```shell
Poetry (version 1.2.2)

Usage:
  command [options] [arguments]

Options:
  -h, --help            Display help for the given command. When no command is given display help for the list command.
  -q, --quiet           Do not output any message.
  -V, --version         Display this application version.
      --ansi            Force ANSI output.
      --no-ansi         Disable ANSI output.
  -n, --no-interaction  Do not ask any interactive question.
      --no-plugins      Disables plugins.
      --no-cache        Disables Poetry source caches.
  -v|vv|vvv, --verbose  Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug.

Available commands:
  about              Shows information about Poetry.
  add                Adds a new dependency to pyproject.toml.
  build              Builds a package, as a tarball and a wheel by default.
  check              Checks the validity of the pyproject.toml file.
  config             Manages configuration settings.
  export             Exports the lock file to alternative formats.
  help               Displays help for a command.
  init               Creates a basic pyproject.toml file in the current directory.
  install            Installs the project dependencies.
  list               Lists commands.
  lock               Locks the project dependencies.
  new                Creates a new Python project at <path>.
  publish            Publishes a package to a remote repository.
  remove             Removes a package from the project dependencies.
  run                Runs a command in the appropriate environment.
  search             Searches for packages on remote repositories.
  shell              Spawns a shell within the virtual environment.
  show               Shows information about packages.
  update             Update the dependencies as according to the pyproject.toml file.
  version            Shows the version of the project or bumps it when a valid bump rule is provided.

 cache
  cache clear        Clears Poetry's cache.
  cache list         List Poetry's caches.

 debug
  debug info         Shows debug information.
  debug resolve      Debugs dependency resolution.

 env
  env info           Displays information about the current environment.
  env list           Lists all virtualenvs associated with the current project.
  env remove         Remove virtual environments associated with the project.
  env use            Activates or creates a new virtualenv for the current project.

 self
  self add           Add additional packages to Poetry's runtime environment.
  self install       Install locked packages (incl. addons) required by this Poetry installation.
  self lock          Lock the Poetry installation's system requirements.
  self remove        Remove additional packages from Poetry's runtime environment.
  self show          Show packages from Poetry's runtime environment.
  self show plugins  Shows information about the currently installed plugins.
  self update        Updates Poetry to the latest version.

 source
  source add         Add source configuration for project.
  source remove      Remove source configured for the project.
  source show        Show information about sources configured for the project.
```