---
name: type annotations needed
created: 2022-11-23T23:22:19-06:00
updated: 2022-11-23T23:22:36-06:00
aliases: 
tags: rust, error
---
# Type Annotations Needed

```rust
error[E0282]: type annotations needed
 --> src/main.rs:2:9
  |
2 |     let guess = "42".parse().expect("Not a number!");
  |         ^^^^^ consider giving `guess` a type

For more information about this error, try `rustc --explain E0282`.
error: could not compile `no_type_annotations` due to previous error
```