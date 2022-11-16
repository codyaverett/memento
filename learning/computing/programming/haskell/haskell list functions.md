---
language: haskell
---

## Simple built in functions

`head` takes a list and returns its head. The head of a list is basically its first element.

```
ghci> head [5,4,3,2,1]  
5 
```

`tail` takes a list and returns its tail. In other words, it chops off a list's head.

1.  ghci> tail [5,4,3,2,1]  
2.  [4,3,2,1]   

`last` takes a list and returns its last element.

1.  ghci> last [5,4,3,2,1]  
2.  1   

`init` takes a list and returns everything except its last element.

1.  ghci> init [5,4,3,2,1]  
2.  [5,4,3,2]

![[Pasted image 20220815003413.png]]

`length` takes a list and returns its length, obviously.

```

1.  ghci> length [5,4,3,2,1]  
2.  5  
```


`null` checks if a list is empty. If it is, it returns True, otherwise it returns False. Use this function instead of xs == [] (if you have a list called xs)

```

1.  ghci> null [1,2,3]  
2.  False  
3.  ghci> null []  
4.  True  
```

`reverse` reverses a list.

```
1.  ghci> reverse [5,4,3,2,1]  
2.  [1,2,3,4,5]  
```

`take` takes number and a list. It extracts that many elements from the beginning of the list. Watch.

```
1.  ghci> take 3 [5,4,3,2,1]  
2.  [5,4,3]  
3.  ghci> take 1 [3,9,3]  
4.  [3]  
5.  ghci> take 5 [1,2]  
6.  [1,2]  
7.  ghci> take 0 [6,6,6]  
8.  []  
```

See how if we try to take more elements than there are in the list, it just returns the list. If we try to take 0 elements, we get an empty list.

`drop` works in a similar way, only it drops the number of elements from the beginning of a list.

```
1.  ghci> drop 3 [8,4,2,1,5,6]  
2.  [1,5,6]  
3.  ghci> drop 0 [1,2,3,4]  
4.  [1,2,3,4]  
5.  ghci> drop 100 [1,2,3,4]  
6.  []   
```

`maximum` takes a list of stuff that can be put in some kind of order and returns the biggest element.

`minimum` returns the smallest.

```
1.  ghci> minimum [8,4,2,1,5,6]  
2.  1  
3.  ghci> maximum [1,9,2,3,4]  
4.  9   
```

`sum` takes a list of numbers and returns their sum.

`product` takes a list of numbers and returns their product.

```
1.  ghci> sum [5,2,1,6,3,2,5,7]  
2.  31  
3.  ghci> product [6,2,1,2]  
4.  24  
5.  ghci> product [1,2,5,6,7,9,2,0]  
6.  0   
```

`elem` takes a thing and a list of things and tells us if that thing is an element of the list. It's usually called as an infix function because it's easier to read that way.

```
1.  ghci> 4 `elem` [3,4,5,6]  
2.  True  
3.  ghci> 10 `elem` [3,4,5,6]  
4.  False 
```

[[haskell programming language]]