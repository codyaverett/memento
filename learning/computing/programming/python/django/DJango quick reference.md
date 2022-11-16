---
aliases: 
tags: 
created: 2022-09-07T17:52:22-05:00
updated: 2022-11-16T16:51:05-06:00
name: DJango quick reference
---
# DJango Quick Reference
```toc
```

## What You Should Know
- Python basics
	- classes
	- Inheritance
- Relational Databases
	- Tables
	- Columns
	- Keys
	- Relationships

## Install Django and Basic Commands

```bash
pip3 install pipenv

pipenv install django

pipenv shell # use the pipenv context

django-admin

pipenv --venv # get the pipenv directory easily
```

Installing to a virtual environment will separate your project dependencies in their own dependency store

## VSCode
[guide](https://code.visualstudio.com/docs/python/tutorial-django)
Set python interpretor in settings.json

```json
{
	"python.pythonPath": "blah blah"
}
```

### The Pipfile
similar to package.json in javascript projects 

- lists package dependencies and the 

* version wildcards

### Django-admin
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

### Start the Server with Local Project Settings and DEBUG
```bash
python manage.py runserver 9000 # start on port 9000
```

## Apps

Django projects include apps by default

### settings.py
```python
INSTALLED_APPS = [
	'django.contrib.admin',
	'django.contrib.auth',
	'django.contrib.contenttypes',
	'django.contrib.sessions', # not usually 
	'django.contrib.messages',
	'django.contrib.staticfiles', # serving images and other static files
	'playground' # Created in the next section below
]
```

### Create Your Own App
```shell
python manage.py startapp playground

~/Projects/play/django/storefront/playground » tree                                                                           caavere@Codys-MacBook-Pro
.
├── __init__.py
├── admin.py
├── apps.py  # You can consider this an "app" configuration file
├── migrations
│   └── __init__.py
├── models.py
├── tests.py
└── views.py

1 directory, 7 files
(base) -------------------------------------------------------------------------------------------------------------------------------------------------
```

After it is created, you can include it in another DJango project.
Every DJango app has the same folder structure

## Create Super User
Ensure all migration operations have been completed
```shell
~/Projects/play/django/storefront (main*) » python manage.py migrate              caavere@Codys-MacBook-Pro
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, sessions
Running migrations:
  No migrations to apply.
(.venv) (base) ---------------------------------------------------------------------------------------------

~/Projects/play/django/storefront (main*) » python manage.py createsuperuser      caavere@Codys-MacBook-Pro
Username (leave blank to use 'caavere'): 
Email address: codyaverett@gmail.com
Password: 
Password (again): 
Superuser created successfully.
(.venv) (base) ---------------------------------------------------------------------------------------------
```

## Database Tables
```shell
sqlite> .tables
auth_group                  auth_user_user_permissions
auth_group_permissions      django_admin_log          
auth_permission             django_content_type       
auth_user                   django_migrations         
auth_user_groups            django_session   
```

## App Views

- HTTP requests are a request response protocol
- Views are actually more like request handlers

### views.py
```python
from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
# request -> response
# request handler
# action

def say_hello(request) -> HttpResponse:
	# Pull data from db
	# Transform
	# Send email
	#...
	return HttpResponse('Hello World')
```

## Map View to Url

### urls.py
module to map urls to views

```python
from django.urls import path
from . import views

# URL Conf module
urlpatterns = [
	path('hello/', views.say_hello)
]
```

Need to import into the main app url conf

### Main Project storefront>urls.py
```python
# need to include include from django urls
from django.urls import path, include
from playground import 

urlpatterns = [

	path('playground/', include('playground.urls'))
]
```

## Templates
Templates are simple html files.

Put HTML files in your app `template` directory.  You will reference the file by name

Use a view to render your HTML template

### views.py
```python
from django.shortcuts import render
from django.http import HttpResponse

def say_hello(request) -> HttpResponse:
	return HttpResponse('Hello World')

def say_hello_to(request, name) -> HttpResponse:
	return render(request, 'hello.html', {'name': name})
```

### urls.py
```python
from django.urls import path
from . import views

urlpatterns = [
	path('hello/', views.say_hello),
	path('hello/<name>/', views.say_hello_to),
]
```

### template/hello.html
Variables passed from the view render function will be interpolated in the html file below
```html
<html>
	<body>
		<div>omg, hi {{name}}</div>
	</body>
</html>
```

## DJango Debug Toolbar

Install in project root with pipenv

```shell
pipenv install django-debug-toolbar
```

Add `debug_toolbar` to your Django project settings file

The debug toolbar will only appear when DJango is responding with a valid HTML document

e.g.
Valid HTML, Body tags

Also, DJango debug toolbar will only appear to the addresses assigned in the `INTERNAL_IPS` array of project settings

### Very Useful Tools the Debug Toolbar Has!
- History
- Versions
- Time
- Settings
- Headers
- Request
- SQL
- Static files
- Templates
- Cache
- Signals
- Logging
- Intercept redirects
- Profiling

## Models

[Django ORM references](https://www.fullstackpython.com/django-orm.html)

Used to store and retrieve data

- data modeling
- building out data model
- organizing models in apps
- coding model classes

### Data Modeling

![[Pasted image 20220914012020.png]]

**Ids are added by DJango by default

### Types of Relationships
- 1 to 1
- 1 to many
- many to many

### Organizing Models in Apps

#### 1: Create a Single DJango App
 Way 1, create a single DJango app called a Store and drop all entities here
 - PRO: Can distribute this app through a pip
 - CON: As the app grows it can become a monolith/ hard to maintain, understand and reuse

#### 2: Create Smaller Apps
- Breaking down the app too small can create a dependency mess!
- Each app should be self contained
- Dependencies could result in breaking changes
- Group together similar functionality!

#### 3. Separate Out Abstract Concepts
- Tags and TaggedItems are not dependent on app specific 
- Minimal couplign
- High Cohesion (Focus)

## Model Classes

```python
  
class Product(models.Model):
	title = models.TextField()
	description = models.TextField()
	price = models.TextField()
	active = models.BooleanField(default=True)
	summary = models.TextField(blank=True, null=True)
```
