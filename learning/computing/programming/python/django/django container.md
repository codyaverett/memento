---
aliases: 
tags: 
title: django container
created: 2022-09-14T00:02:02-05:00
updated: 2022-11-16T16:49:15-06:00
name: django container
---
# django container

## Static Vs Dynamic Files

We just need to make one modification before we can continue. Django has the concept of [static files](https://docs.djangoproject.com/en/3.0/howto/static-files/). These are files without any Python code, they are usually images, CSS stylesheets, or JavaScript.

The distinction between static and dynamic is important once we release to production. Dynamic files have code that must be evaluated on each request, so they are expensive to run. Static files don’t need any execution, they don’t need a lot of resources to be served and can be cached with proxies and CDNs.

To configure the static file location:

-   Edit the file `martor_demo/settings.py`
-   Locate the `STATIC_ROOT` and `MEDIA_ROOT` variables and **replace** the lines with these:

```python
# martor_demo/settings.py

. . .

STATIC_ROOT = os.path.join(BASE_DIR, "static")
MEDIA_ROOT = os.path.join(BASE_DIR, "media")
```

Django collects all static files in one directory:

```bash
$ python manage.py collectstatic
```

## Style Checker

The final test we’ll do is a style check. Python has strict forms that can be validated using [Flake8](https://flake8.pycqa.org/en/latest/), a static analysis tool.

Install and run the tool to check there are no style errors in the project:

```
$ pip install flake8
$ flake8 . --max-line-length=127
```


## Nginx Reverse Proxy

```nginx
# nginx.default

server {
    listen 8020;
    server_name example.org;

    location / {
        proxy_pass http://127.0.0.1:8010;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    location /static {
        root /opt/app/martor_demo;
    }
}
```

## start-server.sh Container Entrypoint

Create a server startup script called `start-server.sh`. This is a Bash script that starts Gunicorn and Ngnix:

```shell
#!/usr/bin/env bash 
# start-server.sh 
if [ -n "$DJANGO_SUPERUSER_USERNAME" ] && [ -n "$DJANGO_SUPERUSER_PASSWORD" ] ; then 
	(cd martor_demo; python manage.py createsuperuser --no-input) 
fi 
(cd martor_demo; gunicorn martor_demo.wsgi --user www-data --bind 0.0.0.0:8010 --workers 3) & nginx -g "daemon off;"
```

You then pass the `gunicorn` command with the first argument of `martor_demo.wsgi`. This is a reference to the `wsgi` file Django generated for us and is a Web Server Gateway Interface file which is the Python standard for web applications and servers. Without delving too much into WSGI, the file simply defines the application variable, and Gunicorn knows how to interact with the object to start the webserver.

You then pass two flags to the command, `bind` to attach the running server to port `8020`, which you will use to communicate with the running web server via HTTP. Finally, you specify `workers` which are the number of threads that will handle the requests coming into your application. Gunicorn recommends this value to be set at `(2 x $num_cores) + 1`. You can read more on configuration of Gunicorn in their [documentation](http://docs.gunicorn.org/en/stable/design.html).

Make the script executable:

```bash
$ chmod 755 start-server.sh
```

Create the Dockerfile:

```docker
FROM python:3.9-buster

. . .
```

It’s worth noting that we are using a base image that has been created specifically to handle Python 3.9 applications and a set of instructions that will run automatically before the rest of your `Dockerfile`.

Next, add the Nginx installation commands and `COPY` the configuration file inside the container:

```docker
. . .

RUN apt-get update && apt-get install nginx vim -y --no-install-recommends
COPY nginx.default /etc/nginx/sites-available/default
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log

. . .
```

It’s time to copy the source files and scripts inside the container. We can use the `COPY` command to copy files and the `RUN` command to execute programs on build time.

We’ll also copy the Python packages and install them. Finally, we ensure all the files have the correct owner:

```docker
. . .

RUN mkdir -p /opt/app
RUN mkdir -p /opt/app/pip_cache
RUN mkdir -p /opt/app/martor_demo
COPY requirements.txt start-server.sh /opt/app/
COPY .pip_cache /opt/app/pip_cache/
COPY martor_demo /opt/app/martor_demo/
WORKDIR /opt/app
RUN pip install -r requirements.txt --cache-dir /opt/app/pip_cache
RUN chown -R www-data:www-data /opt/app

. . .
```

The server will run on port `8020`. Therefore, your container must be set up to allow access to this port so that you can communicate to your running server over HTTP. To do this, use the `EXPOSE` directive to make the port available:

```docker
. . .
EXPOSE 8020
STOPSIGNAL SIGTERM
CMD ["/opt/app/start-server.sh"]
```

The final part of your `Dockerfile` is to execute the start script added earlier, which will leave your web server running on port `8020` waiting to take requests over HTTP. You can execute this script using the `CMD` directive.

With all this in place, your final `Dockerfile` should look something like this:

```docker
# Dockerfile

FROM python:3.9-buster

# install nginx
RUN apt-get update && apt-get install nginx vim -y --no-install-recommends
COPY nginx.default /etc/nginx/sites-available/default
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log

# copy source and install dependencies
RUN mkdir -p /opt/app
RUN mkdir -p /opt/app/pip_cache
RUN mkdir -p /opt/app/martor_demo
COPY requirements.txt start-server.sh /opt/app/
COPY .pip_cache /opt/app/pip_cache/
COPY martor_demo /opt/app/martor_demo/
WORKDIR /opt/app
RUN pip install -r requirements.txt --cache-dir /opt/app/pip_cache
RUN chown -R www-data:www-data /opt/app

# start server
EXPOSE 8020
STOPSIGNAL SIGTERM
CMD ["/opt/app/start-server.sh"]
```

You are now ready to build the container image, and then run it to see it all working together.

## Building and Running the Container

Building the container is very straight forward once you have Docker on your system. The following command will look for your Dockerfile and download all the necessary layers required to get your container image running. Afterward, it will run the instructions in the `Dockerfile` and leave you with a container that is ready to start.

To build your container, you will use the `docker build` command and provide a tag or a name for the container, so you can reference it later when you want to run it. The final part of the command tells Docker which directory to build from.

```bash
$ mkdir -p .pip_cache
$ docker build -t django-markdown-editor .
```

In the output, you can see Docker processing each one of your commands before outputting that the build of the container is complete. It will give you a unique ID for the container, which can also be used in commands alongside the tag.

The final step is to run the container you have just built using Docker:

```bash
$ docker run -it -p 8020:8020 \
     -e DJANGO_SUPERUSER_USERNAME=admin \
     -e DJANGO_SUPERUSER_PASSWORD=sekret1 \
     -e DJANGO_SUPERUSER_EMAIL=admin@example.com \
     django-markdown-editor

Superuser created successfully.
[2022-05-04 17:49:43 +0000] [11] [INFO] Starting gunicorn 20.1.0
[2022-05-04 17:49:43 +0000] [11] [INFO] Listening at: http://0.0.0.0:8010 (11)
[2022-05-04 17:49:43 +0000] [11] [INFO] Using worker: sync
[2022-05-04 17:49:43 +0000] [16] [INFO] Booting worker with pid: 16
[2022-05-04 17:49:43 +0000] [17] [INFO] Booting worker with pid: 17
[2022-05-04 17:49:43 +0000] [18] [INFO] Booting worker with pid: 18
```

The command tells Docker to run the container and forward the exposed port 8020 to port 8020 on your local machine. With `-e` we set environment variables that automatically create an admin user.

After you run this command, you should be able to visit http://localhost:8020 and http://localhost:8020/admin in your browser to access the application.