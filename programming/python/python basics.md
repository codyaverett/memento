# Python Basics Review

## Use Cases
- Machine Learning and AI and DataScience
- Web Development with Django (Youtube, insta, spotify, dropbox, pintrest)
- Automating repetitive tasks

## Setup
python.org

- venv - Virtual Environment

Create a file `app.py`

```python

# Print String
print("Hello World") 

## Variables
age = 20
price = 19.95
first_name = "Cody"
is_employeed = True # False

print(age)

name = input("What is your name? ") # Prompts CLI user for input
print("Hello " + name)

value = input("What is your birth year? ")
age = 2022 - int(value) # Coherse the value to an integer
print("Your age is " + str(age))
# float(val) convert value to float
# bool()

first = input("First: ")
second = input("Second: ")
sum = float(first) + float(second)
print("Total is " + str(sum))

```

### Built-in Functions
Python has a lot of built in functions see a complete list in the python docs
[https://docs.python.org/3/library/functions.html](https://docs.python.org/3/library/functions.html)

### Truthy and Falsy Values

```python
# Falsy
# ""
# 0
# []
# None (null)
```



## Dynamic Typing

```python
students_count = 1000
print(type(students_count)) # <class 'int'>
```

## Mutable and Immutable types

```python
x = 1
print(id(x)) # 4397628416 the memory location of where the x variable is stored

```

Python garbage collector will release the variables after some time

Lists are mutable, so the same memory location is used

## String

```python
course = "Python programming"
print(len(course)) # 18
print(course[0:3]) # Pyt slice of the string
```

## Operators
```python
# / divide
# // integer divid
# ** power
# % modulus

# augmented assignment operator
x = 10
x += 3
print(x)

# x += 3 # same as x = x + 3
# x -= 3 # same as x = x - 3
# x *= 3 # same as x = x * 3
# x /= 3 # same as x = x / 3
# x //= 3 # same as x = x // 3
# x **= 3 # same as x = x ** 3
```

## Comparison
```python
x = 3 > 2 # expression returns a boolean 
print(x)

# >
# >=
# <
# <=
# ==
# !=

```

## Logical Operators
```python
price = 25
print(price > 10 and price < 30) # true

price = 5
print(price > 10 or price < 30) # true

price = 10
print(not price > 10) # False
```

## If statements
```python
temperature = 35

if temperature > 30:
	print("It's a hot day")
	print("Dring plenty of water")
elif temperature < 30:
	print("It's not as hot")
	print("still drink your water")
else:
	print("Temp is exactly 30, my favorite")

print("Done")	
```

## While loops
```python
i = 1
while i <= 5:
	print(i)
	i += 1
```

## Numbers 
```python
i = 1
while i < 1_000: # separate numbers with underscores to make numbers easier to read
	print(i)
	print("*" * i)
```

## Lists
```python
names = ["Cody", "John", "Bob", "Mary"]
print(names) 
print(names[0]) # Cody
print(names[-1]) # Mary
print(names[-2]) # Bob

names[0] = "Coddeeee"
print(names[0:3]) # ["Coddeeee", "John", "Bob"]
```

Strings in python are objects and are immutable

```python
"a".upper()

numbers = [1, 2, 3, 4, 5]
numbers.append(6)
numbers.insert(3, -1)
numbers.remove(3) # removes the third index value

print(1 in numbers)
print(len(numbers)) # returns the number of elements in the list
```

## Iterate over a list
```python
numbers = [1, 2, 3, 4, 5]

for item in numbers:
	print(item)

# alternative using a while loop
i = 0
while i < len(numbers):
	print numbers[i]
	i += 1
```

### Escape sequences
```python
# \"
# \'
# \\\
# \n
```

Triple Quotes!
```python
message = """Python
is awesome
"""
```

### Formatted Strings
Similar to template strings in typescript
the values in the {} can be any python expression
```python
first = "Cody"
last = "Averett"
full = f"{first} {last}"
print(full)
```

![[Pasted image 20220912150606.png]]

### Numbers
Binary numbers

```python
x = 10
x = 0b10
print(bin(x)) # 0b10

x = 0x12c
print(hex(x)) # 0x12c

#complex numbers
# j represents a complex number
x = 1 + 2j
print(x) # (1+2j)
```


## Range function
Used to generate a sequence of numbers

```python
numbers = range(5) # object stores a sequence of numbers
# starting and ending values with `range(5, 10)`
# generate a sequence with a step `range(5, 10, 2)`

print(numbers) # range(0,5)

for number in numbers:
	print(number)

# alterative
for number in range(5):
	print(number)
```

## Tuples
Immutable data structures
has count and index
```python
numbers = (1, 2, 3, 3)
numbers.count(3) # returns 2
```

## Magic methods 
Also called "Special Variables"
"__ function __()" They have underscores preceding the values

