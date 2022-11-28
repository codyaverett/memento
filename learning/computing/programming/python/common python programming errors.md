---
name: Common Python Programming Errors
created: 2022-09-12T20:27:07-05:00
updated: 2022-11-28T17:30:23-06:00
aliases: 
tags: python
---
# Common Python Programming Errors

1. One area where python's idioms are significantly different from other languages is in looping and iteration.  For example, one of the most common anti-patterns I see is the use of a for loop to filter a list by first appending items to a new list and then processing the result in a second loop (possibly after passing the list as an argument to a function).  I almost always suggest converting filtering loops like these into generator expressions, which are more efficient and easier to understand.  It's also common to see lists being combined so their contents can be processed together in some way, rather than using itertools.chain();.
2. Other suggestions like using a `dict()` as a lookup table instead of a long if:then:else block
3. making sure functions always return the same type of object (for example, an empty list instead of None)
4. reducing the number of arguments a function requires by combining related values into an object with either a tuple or a new class
5. defining classes to use in public APIs instead of relying on dictionaries