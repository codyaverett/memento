---
name: Python Cached Property
created: 2022-09-23T20:58:46-05:00
updated: 2022-11-16T16:52:05-06:00
aliases: 
tags: 
---
# Python Cached Property

A decorator that that is memoized.  It's calculated once per instance.

The **@cached_property** is a decorator which transforms a method of a class into a property whose value is computed only once and then cached as a normal attribute. Therefore, the cached result will be available as long as the instance will persist and we can use that method as an attribute of a class i.e

## Reference
- [geeks for geeks](https://www.geeksforgeeks.org/python-functools-cached_property/)
- [usage in the podman-py library](https://github.com/containers/podman-py/blob/main/podman/client.py#L139)
- [[python basics]]