---
title: pointers
created: 2022-10-08T15:51:51-05:00
updated: 2022-11-16T16:01:22-06:00
---

Pointers are simply an address in memory that have a value that is also an address in memory.

Pointers must be dereferenced to be used.

## C example

Basic
```c
# create a pointer variable named pX to the address of x
int * pX = &x;

# create a variable named y that points the the value pointed to by pX 
# Handy for passing things around by reference
int y = *pX;
```

Simple Example 1
```c
# include <stdio.h>

struct Person {
	char name[64];
	int age;
}

void updateStruct(struct Person *p, int age)
{
	p->age = age;
}

int main(int argc, char **argv)
{
	struct Person lowlevellearning;
	updateStruct(&lowlevellearning, 100);
}
```

Static vs Dynamic memory allocation
```c
#include <stdio.h>
#include <stdlib.h>

# pointers are required to allocated memory outside of program scope!
int main(int argc, char **argv)
{
	char *heapMemory = malloc(100);
	if(NULL == heapMemory)
	{
		perror("malloc failed bruh")
	}
}
```

## Why use pointers?
- We have to at lower levels
- Passing values by reference is more efficient then passing a copy of the value
	- e.g. a very large array
	- e.g. a collection of active player objects
