---
title: airflow module management
created: 2022-10-27T20:04:01-05:00
updated: 2022-11-16T15:45:32-06:00
---

Example structure you might have in your `dags` folder
```shell
<DIRECTORY ON PYTHONPATH>
| .airflowignore  -- only needed in ``dags`` folder, see below
| -- my_company
              | __init__.py
              | common_package
              |              |  __init__.py
              |              | common_module.py
              |              | subpackage
              |                         | __init__.py
              |                         | subpackaged_util_module.py
              |
              | my_custom_dags
                              | __init__.py
                              | my_dag1.py
                              | my_dag2.py
                              | base_dag.py
```

## Importing
```python
from my_company.common_package.common_module import SomeClass
from my_company.common_package.subpackage.subpackaged_util_module import AnotherClass
from my_company.my_custom_dags.base_dag import BaseDag
```

You can see the `.airflowignore` file at the root of your folder. This is a file that you can put in your `dags` folder to tell Airflow which files from the folder should be ignored when the Airflow scheduler looks for DAGs. It should contain either regular expressions (the default) or glob expressions for the paths that should be ignored. You do not need to have that file in any other folder in `PYTHONPATH` (and also you can only keep shared code in the other folders, not the actual DAGs).

In the example above the dags are only in `my_custom_dags` folder, the `common_package` should not be scanned by scheduler when searching for DAGS, so we should ignore `common_package` folder. You also want to ignore the `base_dag.py` if you keep a base DAG there that `my_dag1.py` and `my_dag2.py` derives from. Your `.airflowignore` should look then like this:

```
my_company/common_package/.*
my_company/my_custom_dags/base_dag\.py
```

If `DAG_IGNORE_FILE_SYNTAX` is set to `glob`, the equivalent `.airflowignore` file would be:

```
my_company/common_package/
my_company/my_custom_dags/base_dag.py
```

## Built-in `PYTHONPATH` entries in Airflow[](https://airflow.apache.org/docs/apache-airflow/stable/modules_management.html#built-in-pythonpath-entries-in-airflow "Permalink to this heading")

Airflow, when running dynamically adds three directories to the `sys.path`:

-   The `dags` folder: It is configured with option `dags_folder` in section `[core]`.
    
-   The `config` folder: It is configured by setting `AIRFLOW_HOME` variable (`{AIRFLOW_HOME}/config`) by default.
    
-   The `plugins` Folder: It is configured with option `plugins_folder` in section `[core]`.
    

> The DAGS folder in Airflow 2 should not be shared with the webserver. While you can do it, unlike in Airflow 1.10, Airflow has no expectations that the DAGS folder is present in the webserver. In fact it’s a bit of security risk to share the `dags` folder with the webserver, because it means that people who write DAGS can write code that the webserver will be able to execute (ideally the webserver should never run code which can be modified by users who write DAGs). Therefore if you need to share some code with the webserver, it is highly recommended that you share it via `config` or `plugins` folder or via installed Airflow packages (see below). Those folders are usually managed and accessible by different users (Admins/DevOps) than DAG folders (those are usually data-scientists), so they are considered as safe because they are part of configuration of the Airflow installation and controlled by the people managing the installation.

## Best practices for module loading[](https://airflow.apache.org/docs/apache-airflow/stable/modules_management.html#best-practices-for-module-loading "Permalink to this heading")

There are a few gotchas you should be careful about when you import your code.

### Use unique top package name[](https://airflow.apache.org/docs/apache-airflow/stable/modules_management.html#use-unique-top-package-name "Permalink to this heading")

It is recommended that you always put your dags/common files in a subpackage which is unique to your deployment (`my_company` in the example below). It is far too easy to use generic names for the folders that will clash with other packages already present in the system. For example if you create `airflow/operators` subfolder it will not be accessible because Airflow already has a package named `airflow.operators` and it will look there when importing `from airflow.operators`.

### Don’t use relative imports[](https://airflow.apache.org/docs/apache-airflow/stable/modules_management.html#don-t-use-relative-imports "Permalink to this heading")

Never use relative imports (starting with `.`) that were added in Python 3.

This is tempting to do something like that it in `my_dag1.py`:

from .base_dag import BaseDag  # NEVER DO THAT!!!!

You should import such shared dag using full path (starting from the directory which is added to `PYTHONPATH`):

from my_company.my_custom_dags.base_dag import BaseDag  # This is cool

The relative imports are counter-intuitive, and depending on how you start your python code, they can behave differently. In Airflow the same DAG file might be parsed in different contexts (by schedulers, by workers or during tests) and in those cases, relative imports might behave differently. Always use full python package paths when you import anything in Airflow DAGs, this will save you a lot of troubles. You can read more about relative import caveats in [this Stack Overflow thread](https://stackoverflow.com/q/16981921/516701).

### Add `__init__.py` in package folders[](https://airflow.apache.org/docs/apache-airflow/stable/modules_management.html#add-init-py-in-package-folders "Permalink to this heading")

When you create folders you should add `__init__.py` file as empty files in your folders. While in Python 3 there is a concept of implicit namespaces where you do not have to add those files to folder, Airflow expects that the files are added to all packages you added.

## Inspecting your `PYTHONPATH` loading configuration[](https://airflow.apache.org/docs/apache-airflow/stable/modules_management.html#inspecting-your-pythonpath-loading-configuration "Permalink to this heading")

You can also see the exact paths using the `airflow info` command, and use them similar to directories specified with the environment variable [`PYTHONPATH`](https://docs.python.org/3/using/cmdline.html#envvar-PYTHONPATH "(in Python v3.10)"). An example of the contents of the sys.path variable specified by this command may be as follows:

Python PATH: [/home/rootcss/venvs/airflow/bin:/usr/lib/python38.zip:/usr/lib/python3.8:/usr/lib/python3.8/lib-dynload:/home/rootcss/venvs/airflow/lib/python3.8/site-packages:/home/rootcss/airflow/dags:/home/rootcss/airflow/config:/home/rootcss/airflow/plugins]

