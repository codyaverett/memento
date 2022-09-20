# doctest

Doctest is a utility package to test code documentation inline your files directly.

```python
"""

This is the "example" module.
The example module supplies one function, factorial(). For example,

>>> factorial(5)
120

"""

def factorial(n):

"""Return the factorial of n, an exact integer >= 0.
>>> [factorial(n) for n in range(6)]
[1, 1, 2, 6, 24, 120]

>>> factorial(30)
265252859812191058636308480000000

>>> factorial(-1)
Traceback (most recent call last):

...

ValueError: n must be >= 0
Factorials of floats are OK, but the float must be an exact integer:
>>> factorial(30.1)
Traceback (most recent call last):

...

ValueError: n must be exact integer
>>> factorial(30.0)
265252859812191058636308480000000
  
It must also not be ridiculously large:
>>> factorial(1e100)
Traceback (most recent call last):

...

OverflowError: n too large

"""
	import math
	
	if not n >= 0:
		raise ValueError("n must be >= 0")

	if math.floor(n) != n:
		raise ValueError("n must be exact integer")

	if n+1 == n: # catch a value like 1e300
		raise OverflowError("n too large")

	result = 1
	factor = 2

	while factor <= n:
		result *= factor
		factor += 1

	return result

if __name__ == "__main__":
	import doctest
	doctest.testmod()
```

Output should only be expected if there are actual errors in your documentation

```shell
~/Projects/play/python_examples/doctest (main*) » python3 main.py                                                                                                caavere@Codys-MacBook-Pro
**********************************************************************
File "/Users/caavere/Projects/play/python_examples/doctest/main.py", line 9, in __main__
Failed example:
    factorial(0)
Expected:
    100
Got:
    1
**********************************************************************
1 items had failures:
   1 of   2 in __main__
***Test Failed*** 1 failures.
(base) ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
```

If you'd like to see the output for successes you can pass the `-v` flag when you run the python module.

```shell
~/Projects/play/python_examples/doctest (main*) » python3 main.py -v                                                                                             caavere@Codys-MacBook-Pro
Trying:
    factorial(5)
Expecting:
    120
ok
Trying:
    [factorial(n) for n in range(6)]
Expecting:
    [1, 1, 2, 6, 24, 120]
ok
Trying:
    factorial(30)
Expecting:
    265252859812191058636308480000000
ok
Trying:
    factorial(-1)
Expecting:
    Traceback (most recent call last):
        ...
    ValueError: n must be >= 0
ok
Trying:
    factorial(30.1)
Expecting:
    Traceback (most recent call last):
        ...
    ValueError: n must be exact integer
ok
Trying:
    factorial(30.0)
Expecting:
    265252859812191058636308480000000
ok
Trying:
    factorial(1e100)
Expecting:
    Traceback (most recent call last):
        ...
    OverflowError: n too large
ok
2 items passed all tests:
   1 tests in __main__
   6 tests in __main__.factorial
7 tests in 2 items.
7 passed and 0 failed.
Test passed.
(base) -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
```

