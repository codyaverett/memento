---
name: control flow
created: 2022-11-24T00:19:43-06:00
updated: 2022-11-24T00:22:15-06:00
aliases: 
tags: rust, basics
---
# Control Flow

## If Expressions

```rust
fn main() {
    let number = 3;

    if number < 5 {
        println!("condition was true");
    } else {
        println!("condition was false");
    }
}
```

- Blocks of code associated with the conditions in if expressions are sometimes called arms, just like the arms in match expressions
- The condition must be a bool

```rust
fn main() {
    let number = 3;

	// if number {  // this would result in an error
    if number != 0 {
        println!("number was something other than zero");
    }
}
```

## Multiple conditions with else if

```rust
fn main() {
    let number = 6;

    if number % 4 == 0 {
        println!("number is divisible by 4");
    } else if number % 3 == 0 {
        println!("number is divisible by 3");
    } else if number % 2 == 0 {
        println!("number is divisible by 2");
    } else {
        println!("number is not divisible by 4, 3, or 2");
    }
}
```

## Using If in a let statement

- If is an expression and can be used to the right of a let statement
```rust
fn main() {
    let condition = true;
    let number = if condition { 5 } else { 6 };

    println!("The value of number is: {number}");
}

```