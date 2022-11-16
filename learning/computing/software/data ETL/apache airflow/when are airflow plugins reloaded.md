---
aliases: 
tags: 
title: when are airflow plugins reloaded
created: 2022-10-27T20:07:14-05:00
updated: 2022-11-16T16:49:15-06:00
name: when are airflow plugins reloaded
---
# when are airflow plugins reloaded

## [ When are plugins (re)loaded?](https://airflow.apache.org/docs/apache-airflow/stable/plugins.html#when-are-plugins-re-loaded "Permalink to this heading")

Plugins are by default lazily loaded and once loaded, they are never reloaded (except the UI plugins are automatically loaded in Webserver). To load them at the start of each Airflow process, set `[core] lazy_load_plugins = False` in `airflow.cfg`.

This means that if you make any changes to plugins and you want the webserver or scheduler to use that new code you will need to restart those processes.

By default, task execution will use forking to avoid the slow down of having to create a whole new python interpreter and re-parse all of the Airflow code and start up routines – this is a big benefit for shorter running tasks. This does mean that if you use plugins in your tasks, and want them to update you will either need to restart the worker (if using CeleryExecutor) or scheduler (Local or Sequential executors). The other option is you can accept the speed hit at start up set the `core.execute_tasks_new_python_interpreter` config setting to True, resulting in launching a whole new python interpreter for tasks.

(Modules only imported by DAG files on the other hand do not suffer this problem, as DAG files are not loaded/parsed in any long-running Airflow process.)