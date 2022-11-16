---
aliases: 
tags: 
created: 2022-09-19T20:30:03-05:00
updated: 2022-11-16T16:51:05-06:00
name: backtracking
---
# Backtracking

Backtracking is a recursive algorithm useful to retry previous branches in logic if current branches end up in a undesirable result aka a dead end.

They are useful for maze solving and the n-queens problem

## Definition
  
A **backtracking algorithm** is a **recursive algorithm** that attempts to solve a given problem by testing all possible paths towards a solution until a solution is found. Each time a path is tested, if a solution is not found, the algorithm **backtracks** to test another possible path and so on till a solution is found or all paths have been tested.

The typical scenario where a backtracking algorithm is when you try to find your way out in a maze. Every time you reach a dead-end, you backtrack to try another path until you find the exit or all path have been explored.

Backtracking algorithms can be used for other types of problems such as solving a [Magic Square Puzzle](https://www.101computing.net/backtracking-algorithm-magic-square-solver/) or a [Sudoku grid](https://www.101computing.net/backtracking-algorithm-sudoku-solver/).

Backtracking algorithms rely on the use of a **recursive function**. A recursive function is a function that calls itself until a condition is met.
