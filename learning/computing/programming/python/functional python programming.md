---
created: 2022-11-16T15:11:30-06:00
updated: 2022-11-16T15:11:30-06:00
---
# Functional python programming


## Mapping over iterables
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