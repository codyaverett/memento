---
name: Django Testing
created: 2022-09-14T00:00:36-05:00
updated: 2022-11-16T16:52:05-06:00
aliases: 
tags: 
---
# Django Testing

In this section, let’s add some tests to the application. Tests are our first line of defense against bugs.

Django uses the standard [Unittest](https://docs.python.org/3/library/unittest.html) library, so we can get on writing tests right away.

Create a file called `app/testPosts.py`:

```python
# app/testPosts.py

from django.test import TestCase
from app.models import Post


class PostTestCase(TestCase):
    def testPost(self):
        post = Post(title="My Title", description="Blurb", wiki="Post Body")
        self.assertEqual(post.title, "My Title")
        self.assertEqual(post.description, "Blurb")
        self.assertEqual(post.wiki, "Post Body")
```

The code is illustrative of a normal unit test:

-   Import the `Post` model from the application.
-   Create a `post` object with some initial values.
-   Check that the values match expectations.

To run the test case:

```bash
$ python manage.py test
Creating test database for alias 'default'...
System check identified no issues (0 silenced).
.
----------------------------------------------------------------------
Ran 1 test in 0.001s

OK
Destroying test database for alias 'default'...
```

Another tests that Django supplies are the [deployment checklists](https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/). These are scripts that check for potentially dangerous security settings.

To run the checklist:

```bash
$ python manage.py check --deploy
```

You’ll likely see some warnings. For demo-ing, we can live with the warnings. Once you go to production, you might want to take a closer look at the messages and what they mean.