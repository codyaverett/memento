---
created: 2022-11-16T15:11:30-06:00
updated: 2022-11-16T15:11:30-06:00
---
# The Module Search Path[¶](https://docs.python.org/3/tutorial/modules.html#the-module-search-path "Permalink to this headline")

When a module named `spam` is imported, the interpreter first searches for a built-in module with that name. These module names are listed in [`sys.builtin_module_names`](https://docs.python.org/3/library/sys.html#sys.builtin_module_names "sys.builtin_module_names"). If not found, it then searches for a file named `spam.py` in a list of directories given by the variable [`sys.path`](https://docs.python.org/3/library/sys.html#sys.path "sys.path"). [`sys.path`](https://docs.python.org/3/library/sys.html#sys.path "sys.path") is initialized from these locations:

-   The directory containing the input script (or the current directory when no file is specified).
-   [`PYTHONPATH`](https://docs.python.org/3/using/cmdline.html#envvar-PYTHONPATH) (a list of directory names, with the same syntax as the shell variable `PATH`). 
-   The installation-dependent default (by convention including a `site-packages` directory, handled by the [`site`](https://docs.python.org/3/library/site.html#module-site "site: Module responsible for site-specific configuration.") module).   

Note
	On file systems which support symlinks, the directory containing the input script is calculated after the symlink is followed. In other words the directory containing the symlink is **not** added to the module search path.

After initialization, Python programs can modify [`sys.path`](https://docs.python.org/3/library/sys.html#sys.path "sys.path"). The directory containing the script being run is placed at the beginning of the search path, ahead of the standard library path. This means that scripts in that directory will be loaded instead of modules of the same name in the library directory. This is an error unless the replacement is intended. See section [Standard Modules](https://docs.python.org/3/tutorial/modules.html#tut-standardmodules) for more information.