---
name: Python Decorators
created: 2022-10-10T00:46:22-05:00
updated: 2022-11-16T16:52:05-06:00
aliases: 
tags: 
---
# Python Decorators

A fancy way to wrap a function with a function.  Similar to decorators in typescript.

```python
@DecoratorFunction()
def decoratedFunction():
	pass
```

## Primer

### Higher Order Functions
- Functions are higher order in python, thus they can be passed around to other functions

Defining some simple functions
```python
def say_hello(name):
    return f"Hello {name}"

def be_awesome(name):
    return f"Yo {name}, together we are the awesomest!"

def greet_bob(greeter_func):
    return greeter_func("Bob")

```

Using them together
```python
>>> greet_bob(say_hello)
'Hello Bob'

>>> greet_bob(be_awesome)
'Yo Bob, together we are the awesomest!'
```

### Inner Functions
- Functions can be defined inside of functions
- These are called "inner functions"

Defining a function with inner functions
```python
def parent():
    print("Printing from the parent() function")

    def first_child():
        print("Printing from the first_child() function")

    def second_child():
        print("Printing from the second_child() function")

    second_child()
    first_child()
```

And when it's called, it runs how you might expect.  The inner functions only exist when the function is in program scope.
```python
>>> parent()
Printing from the parent() function
Printing from the second_child() function
Printing from the first_child() function
```

### Functions Returning Functions
- Python allows you to return a function from within a function.

```python
def parent(num):
    def first_child():
        return "Hi, I am Emma"

    def second_child():
        return "Call me Liam"

    if num == 1:
        return first_child
    else:
        return second_child
```

And we are run the code to see the references to the functions defined
```python
>>> first = parent(1)
>>> second = parent(2)

>>> first
<function parent.<locals>.first_child at 0x7f599f1e2e18>

>>> second
<function parent.<locals>.second_child at 0x7f599dad5268>
```

## Simple Decorators

```python
def my_decorator(func):
    def wrapper():
        print("Something is happening before the function is called.")
        func()
        print("Something is happening after the function is called.")
    return wrapper

def say_whee():
    print("Whee!")

say_whee = my_decorator(say_whee)
```

Funny example
```python
from datetime import datetime

def not_during_the_night(func):
    def wrapper():
        if 7 <= datetime.now().hour < 22:
            func()
        else:
            pass  # Hush, the neighbors are asleep
    return wrapper

def say_whee():
    print("Whee!")

say_whee = not_during_the_night(say_whee)
```

We don't say `Whee!` during the night. lol

```python
>>> say_whee()
>>>
```

## Syntactic Sugar

This is the moment we've been waiting for
```python
def my_decorator(func):
    def wrapper():
        print("Something is happening before the function is called.")
        func()
        print("Something is happening after the function is called.")
    return wrapper

@my_decorator
def say_whee():
    print("Whee!")
```

the `@decorator()` syntax

