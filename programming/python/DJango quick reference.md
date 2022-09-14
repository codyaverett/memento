# DJANGO a python web framework 

## What you should know 
- Python basics
	- classes
	- Inheritance
- Relational Databases
	- Tables
	- Columns
	- Keys
	- Relationships

## Install

```bash
pip3 install pipenv

pipenv install django

pipenv shell # use the pipenv context

django-admin
```

Installing to a virtual environment will separate your project dependencies in their own dependency store

### The pipfile
similar to package.json in javascript projects 

- lists package dependencies and the 

* version wildcards

### django-admin
Utility that comes with Django
```shell
django-admin

Type 'django-admin help <subcommand>' for help on a specific subcommand.

Available subcommands:

[django]
    check
    compilemessages
    createcachetable
    dbshell
    diffsettings
    dumpdata
    flush
    inspectdb
    loaddata
    makemessages
    makemigrations
    migrate
    optimizemigration
    runserver
    sendtestemail
    shell
    showmigrations
    sqlflush
    sqlmigrate
    sqlsequencereset
    squashmigrations
    startapp
    startproject
    test
    testserver
Note that only Django core commands are listed as settings are not properly configured (error: Requested setting INSTALLED_APPS, but settings are not configured. You must either define the envi
(django) (base) -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
```

```shell
django-admin startproject storefront .  # create a django storefront project in current directory

```

