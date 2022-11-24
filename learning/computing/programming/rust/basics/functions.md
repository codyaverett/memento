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

- Assigning a new value with let is a statement
- Calling a function is an expression
- Calling a macro is an expression
- A new scope block created with curly brackets is an expression
```rust
fn main() {
    let y = {
        let x = 3;
        x + 1
    };

    println!("The value of y is: {y}");
}
```

This expression:

```rust
{
    let x = 3;
    x + 1
}
```

- Expressions do not include semicolons
- **Adding a semicolon at the end will make the line a statement and it will not return a value**

## Functions with return values

- Functions can return a value to the code that calls them
- Returns types are declared after an `->`
- You can return early with the `return` keyword
- Most functions return the last expression implicitly

```rust
fn five() -> i32 {
    5
}

fn main() {
    let x = five();

    println!("The value of x is: {x}");
}
```

- 5 is an expression and is returned to the value of x
- Similar to if `let x = 5;`

### Another example

```rust
fn main() {
    let x = plus_one(5);

    println!("The value of x is: {x}");
}

fn plus_one(x: i32) -> i32 {
    x + 1
    // changing this to x + 1; would make it a statement and result in an error
}
```

