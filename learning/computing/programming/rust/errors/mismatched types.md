---
name: Mismatched Types
created: 2022-11-23T20:34:28-06:00
updated: 2022-11-23T23:21:21-06:00
aliases: 
tags: rust, error
---
# Mismatched Types

```rust
error[E0308]: mismatched types
  --> src/main.rs:62:16
   |
61 |     let mut contents = String::new();
   |                        ------------- expected due to this value
62 |     contents = file.read_to_string(&mut contents).unwrap();
   |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^- help: try using a conversion method: `.to_string()`
   |                |
   |                expected struct `String`, found `usize`
```

```rust
error[E0308]: mismatched types
 --> src/main.rs:3:14
  |
2 |     let mut spaces = "   ";
  |                      ----- expected due to this value
3 |     spaces = spaces.len();
  |              ^^^^^^^^^^^^ expected `&str`, found `usize`

```