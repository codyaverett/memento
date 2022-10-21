# Python Pyenv

Used to manage the version of python  you have installed and manage virtual environments.

## Install
```shell
curl https://pyenv.run | bash
```

Add the following lines to your `~/.bashrc`:

```sh
export PATH="~/.pyenv/bin:$PATH"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
```

Also, setup build environment for your system
https://github.com/pyenv/pyenv/wiki#suggested-build-environment

`pyenv` will build python for you and you can do interesting things during this step like patching objects during build. [e.g.](https://stackoverflow.com/questions/67411745/pyenv-build-failed-fedora-34-using-python-build-20180424)

## Usage
```shell
pyenv 2.3.5
Usage: pyenv <command> [<args>]

Some useful pyenv commands are:
   activate    Activate virtual environment
   commands    List all available pyenv commands
   deactivate   Deactivate virtual environment
   doctor      Verify pyenv installation and development tools to build pythons.
   exec        Run an executable with the selected Python version
   global      Set or show the global Python version(s)
   help        Display help for a command
   hooks       List hook scripts for a given pyenv command
   init        Configure the shell environment for pyenv
   install     Install a Python version using python-build
   local       Set or show the local application-specific Python version(s)
   prefix      Display prefixes for Python versions
   rehash      Rehash pyenv shims (run this after installing executables)
   root        Display the root directory where versions and shims are kept
   shell       Set or show the shell-specific Python version
   shims       List existing pyenv shims
   uninstall   Uninstall Python versions
   --version   Display the version of pyenv
   version     Show the current Python version(s) and its origin
   version-file   Detect the file that sets the current pyenv version
   version-name   Show the current Python version
   version-origin   Explain how the current Python version is set
   versions    List all Python versions available to pyenv
   virtualenv   Create a Python virtualenv using the pyenv-virtualenv plugin
   virtualenv-delete   Uninstall a specific Python virtualenv
   virtualenv-init   Configure the shell environment for pyenv-virtualenv
   virtualenv-prefix   Display real_prefix for a Python virtualenv version
   virtualenvs   List all Python virtualenvs found in `$PYENV_ROOT/versions/*'.
   whence      List all Python versions that contain the given executable
   which       Display the full path to an executable
```

### Example Usage
```shell
pyenv install 3.10.8
Downloading Python-3.10.8.tar.xz...
-> https://www.python.org/ftp/python/3.10.8/Python-3.10.8.tar.xz
Installing Python-3.10.8...
Installed Python-3.10.8 to /home/caavere/.pyenv/versions/3.10.8
```