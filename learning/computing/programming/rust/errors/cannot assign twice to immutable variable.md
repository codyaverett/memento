---
name: Cannot Assign Twice to Immutable Variable
created: 2022-11-23T23:05:13-06:00
updated: 2022-11-23T23:06:02-06:00
aliases: 
tags: rust, error
---
# Cannot Assign Twice to Immutable Variable

```rust
error[E0384]: cannot assign twice to immutable variable `x`
 --> src/main.rs:4:5
  |
2 |     let x = 5;
  |         -
  |         |
  |         first assignment to `x`
  |         help: consider making this binding mutable: `mut x`
3 |     println!("The value of x is: {x}");
4 |     x = 6;
  |     ^^^^^ cannot assign twice to immutable variable

```
