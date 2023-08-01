---
name: Option Type
created: 2023-08-01T01:25:17-05:00
updated: 2023-08-01T01:25:51-05:00
aliases: 
tags: 
---
# Option Type

The Option type is another enum in Rust that is used when a value could be something or nothing. It has two variants: Some and None.

Here's an example of a function that tries to find a number in a vector and returns an Option:

```rust
fn find_number(numbers: Vec<i32>, target: i32) -> Option<usize> {
    for (index, &number) in numbers.iter().enumerate() {
        if number == target {
            return Some(index);
        }
    }
    None
}
```

This function returns Some(index) if it finds the target number in the vector, or None if it doesn't.

Similar to Result, you can use the ? operator with Option to propagate None values up.
