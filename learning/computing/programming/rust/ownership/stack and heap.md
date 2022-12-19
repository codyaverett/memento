---
name: stack and heap
created: 2022-12-19T09:50:57-06:00
updated: 2022-12-19T09:51:11-06:00
aliases: rust stack and heap
tags: rust, stack, heap
---
# stack and heap

- Whether a value is on the stack or heap affects how the language behaves and why you have to make certain decisions.
- Stack and heap are areas of memory your program has access to during runtime.
- They are structured in different ways

## Stack
- Stacks store data in a last in, first out manner.  
- Compared this to a stack of plates.  You take the plate that is on top, but it was the last plate set on the stack.
- Data stored in the stack must have a known, fixed size
- Data with an unknown size must be stored in the heap

## Heap
- less organized than the stack
- You request a certain amount of space
- The memory allocator will find a contiguous spot in memory that is big enough to allocate
- It marks that space as being in use and returns a pointer to the address of that location in memory