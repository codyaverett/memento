---
name: Functional Python Programming
created: 2022-09-13T00:30:32-05:00
updated: 2022-11-16T16:52:05-06:00
aliases: 
tags: 
---
# Functional Python Programming

## Mapping Over Iterables
Applying functions to Items with `Map()``

Map is a function that accepts a function and then an iterable

```python
>>> list(map(lambda x: x + "buzz", ["how ", "do ", "you ", "do "]))
['how buzz', 'do buzz', 'you buzz', 'do buzz']

# Using list comprehension
>>> [x + "buzz" for x in ["how ", "do ", "you ", "do "]] # ['how buzz', 'do buzz', 'you buzz', 'do buzz']
```

## Useful Iterools Functions
Python has a lot of built in functions for manipulating and iterating through iterable objects

They are all purely functional in nature