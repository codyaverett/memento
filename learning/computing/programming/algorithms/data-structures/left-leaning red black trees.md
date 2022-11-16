---
aliases: 
tags: 
created: 2022-11-16T15:42:15-06:00
updated: 2022-11-16T16:49:16-06:00
name: Left-Leaning red black trees
---



# Left-Leaning Red Black Trees

This is a Balanced tree for optimal searching, inserting, and deleting nodes at `O(log(n)` time.

Has a little less overhead than an AVL tree, and is easier to implement, but isn't always faster at retrieval compared to a perfectly balanced AVL tree.

Larger number of lookups are better off looking at AVL trees.

Red Black trees are used in various implementations currently:
- C++ map and set STL containers
- Java map and set
- The completely fair scheduler of the Linux 2.6+ kernel

## Reference
- [Robert Sedgewick](https://sedgewick.io/)
- [Rober Sedgewick's paper on the topic](https://sedgewick.io/wp-content/themes/sedgewick/papers/2008LLRB.pdf)
- [Scapegoat Trees](https://en.wikipedia.org/wiki/Scapegoat_tree)
- [GoLang implementation](https://pkg.go.dev/github.com/coredns/coredns/plugin/file/tree)
- 