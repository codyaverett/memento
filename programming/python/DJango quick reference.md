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

## Install django and basic commands

```bash
pip3 install pipenv

pipenv install django

pipenv shell # use the pipenv context

django-admin

pipenv --venv # get the pipenv directory easily
```

Installing to a virtual environment will separate your project dependencies in their own dependency store

## VSCode
Set python interpretor in settings.json

```json
{
	"python.pythonPath": "blah blah"
}
```

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

~/Projects/play/django » tree                                                                                                                                          caavere@Codys-MacBook-Pro
.
├── Pipfile
├── Pipfile.lock
└── storefront
    ├── manage.py # start the project with local settings
    └── storefront
        ├── __init__.py
        ├── asgi.py
        ├── settings.py
        ├── urls.py
        └── wsgi.py

2 directories, 8 files
(django) (base) ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
```

### Start the server with local project settings and DEBUG
```bash
python manage.py runserver 9000 # start on port 9000
```

