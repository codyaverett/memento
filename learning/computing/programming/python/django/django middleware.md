---
aliases: 
tags: 
title: django middleware
created: 2022-10-09T23:34:12-05:00
updated: 2022-11-16T16:49:15-06:00
name: django middleware
---
# django middleware

- If a middleware returns, the following middlewares do not run - excpert from different lesson
- The middleware config object can be empty, but it's recommended to at least use the `CommonMiddleware` package

```python
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```

## Simple Example
```python
class SimpleMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.

        response = self.get_response(request)

        # Code to be executed for each request/response after
        # the view is called.

        return response
```