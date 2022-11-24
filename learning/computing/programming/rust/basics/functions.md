---
name: functions
created: 2022-11-24T00:00:09-06:00
updated: 2022-11-24T00:00:23-06:00
aliases: 
tags: rust, basics
---
# Functions

- Use snake case to define function names

```rust
fn main() {
    println!("Hello, world!");

    another_function();
}

fn another_function() {
    println!("Another function.");
}

```

- Rust doesn't care where the function is defined in your program.
- As long as it exists, it can be called from any other function

## Parameters

- Parameter or argument (e.g. Tomato Tomāto, Potato Potāto)
- In function signatures, you must declare the type of each parameter

```rust
fn main() {
    print_labeled_measurement(5, 'h');
}

fn print_labeled_measurement(value: i32, unit_label: char) {
    println!("The measurement is: {value}{unit_label}");
}
```

## Statements and expressions

- Statements are instructions that perform some action and do not return a value
- Expressions evaluate to a resulting value