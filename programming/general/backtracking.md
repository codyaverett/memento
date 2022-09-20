# Backtracking

Backtracking is a recursive algorithm useful to retry previous branches in logic if current branches end up in a undesirable result aka a dead end.

They are useful for maze solving and the n-queens problem

## Definition
  
A **backtracking algorithm** is a **recursive algorithm** that attempts to solve a given problem by testing all possible paths towards a solution until a solution is found. Each time a path is tested, if a solution is not found, the algorithm **backtracks** to test another possible path and so on till a solution is found or all paths have been tested.

The typical scenario where a backtracking algorithm is when you try to find your way out in a maze. Every time you reach a dead-end, you backtrack to try another path until you find the exit or all path have been explored.

