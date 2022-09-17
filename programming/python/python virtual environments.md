# Python Virtual Environments
Virtual environments are useful to isolate your project's dependencies from your global development dependencies.

Creating a virtual environment will also generate a `Pipfile` and a `Pipfile.Lock` these will store your dependencies instead of depending on the older `requirements.txt` format that python developers have used for years.

PipLock has a few advantages over using the older requirements.txt conventions.
It includes a hash of the package, so there is no chance for the contents of the Package to change out from under your feet.  This in turn produces deterministic builds.

## Install pipenv
```shell

pip3 install pipenv # installs to global python dependencies
```

## Create a new pipenv for your current working directory
Simply installing a new package in the project directory will generate your pip environment.
```shell

pipenv install pytest # pytest is a package used for asserting python code correctness. Arguably every project should have ways to test the code
```

## Usage output
There are several options for various use cases of pipenv.  I haven't explored them all yet, but it looks fairly straight forward.
```shell

~/Projects/play/pygame » pipenv                caavere@Codys-MacBook-Pro
Usage: pipenv [OPTIONS] COMMAND [ARGS]...

Options:
  --where                         Output project home information.
  --venv                          Output virtualenv information.
  --py                            Output Python interpreter
                                  information.
  --envs                          Output Environment Variable options.
  --rm                            Remove the virtualenv.
  --bare                          Minimal output.
  --man                           Display manpage.
  --support                       Output diagnostic information for use
                                  in GitHub issues.
  --site-packages / --no-site-packages
                                  Enable site-packages for the
                                  virtualenv.  [env var:
                                  PIPENV_SITE_PACKAGES]
  --python TEXT                   Specify which version of Python
                                  virtualenv should use.
  --three                         Use Python 3 when creating
                                  virtualenv. Deprecated
  --clear                         Clears caches (pipenv, pip).  [env
                                  var: PIPENV_CLEAR]
  -q, --quiet                     Quiet mode.
  -v, --verbose                   Verbose mode.
  --pypi-mirror TEXT              Specify a PyPI mirror.
  --version                       Show the version and exit.
  -h, --help                      Show this message and exit.


Usage Examples:
   Create a new project using Python 3.7, specifically:
   $ pipenv --python 3.7

   Remove project virtualenv (inferred from current directory):
   $ pipenv --rm

   Install all dependencies for a project (including dev):
   $ pipenv install --dev

   Create a lockfile containing pre-releases:
   $ pipenv lock --pre

   Show a graph of your installed dependencies:
   $ pipenv graph

   Check your installed dependencies for security vulnerabilities:
   $ pipenv check

   Install a local setup.py into your virtual environment/Pipfile:
   $ pipenv install -e .

   Use a lower-level pip command:
   $ pipenv run pip freeze

Commands:
  check         Checks for PyUp Safety security vulnerabilities and
                against PEP 508 markers provided in Pipfile.
  clean         Uninstalls all packages not specified in Pipfile.lock.
  graph         Displays currently-installed dependency graph
                information.
  install       Installs provided packages and adds them to Pipfile, or
                (if no packages are given), installs all packages from
                Pipfile.
  lock          Generates Pipfile.lock.
  open          View a given module in your editor.
  requirements  Generate a requirements.txt from Pipfile.lock.
  run           Spawns a command installed into the virtualenv.
  scripts       Lists scripts in current environment config.
  shell         Spawns a shell within the virtualenv.
  sync          Installs all packages specified in Pipfile.lock.
  uninstall     Uninstalls a provided package and removes it from
                Pipfile.
  update        Runs lock, then sync.
  verify        Verify the hash in Pipfile.lock is up-to-date.
```

## Installing deps for existing pipfiles

If a Pipfile and Pipfile.Lock already exist, you can run `pipenv install` to automatically download and install the exact same dependencies as defined in these files.

## Entering the pipenv

To activate this project's virtualenv, run pipenv shell.
Alternatively, run a command inside the virtualenv with pipenv run.

## Reference
https://jonathanmeier.io/advantages-of-pipfile-lock-over-requirements-txt/
