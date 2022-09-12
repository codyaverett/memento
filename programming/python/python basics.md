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
