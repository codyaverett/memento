---
name: Control Flow
created: 2022-11-24T00:19:43-06:00
updated: 2022-11-24T00:37:48-06:00
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

### Multiple Conditions with Else if

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

### Using If in a Let Statement

- If is an expression and can be used to the right of a let statement
```rust
fn main() {
    let condition = true;
    let number = if condition { 5 } else { 6 };

    println!("The value of number is: {number}");
}

```

### Blocks of Code Evaluate the Last Expression in Them

```rust
fn main() {
    let condition = true;

    let number = if condition { 5 } else { "six" };

    println!("The value of number is: {number}");
}
```

This results in a type mismatch error

```rust
error[E0308]: `if` and `else` have incompatible types
 --> src/main.rs:4:44
  |
4 |     let number = if condition { 5 } else { "six" };
  |                                 -          ^^^^^ expected integer, found `&str`
  |                                 |
  |                                 expected because of this

For more information about this error, try `rustc --explain E0308`.
error: could not compile `branches` due to previous error
```

## Repetition with Loops

- Rust has three kinds of loops
	- loop
	- while
	- for

### Repeating Code with Loop

- Loops code forever until you tell it to stop

```rust
fn main() {
	loop {
		println!("again!");
	}
}

// Use ctrl+C to exit out
```

- Can use the `break` keyword to break out of the loop
- Or you can use the `continue` keyword to directly continue the loop from the next iteration

### Returning Values From Loops

```rust
fn main() {
    let mut counter = 0;

    let result = loop {
        counter += 1;

        if counter == 10 {
            break counter * 2; // This value is returned upon breaking out of the loop
        }
    };

    println!("The result is {result}");
}

```

### Loop Labels and Breaking Out of Nested Loops

- This is a really cool feature, the syntax is new 

```rust
fn main() {
    let mut count = 0;
    'counting_up: loop {
        println!("count = {count}");
        let mut remaining = 10;

        loop {
            println!("remaining = {remaining}");
            if remaining == 9 {
                break;
            }
            if count == 2 {
                break 'counting_up;
            }
            remaining -= 1;
        }

        count += 1;
    }
    println!("End count = {count}");
}
```

### Conditional Loops with While

- Loop while the expression evaluates to true
- This is an abstraction on a common pattern using a combination of `loop, if, else, and break;` keywords

```rust
fn main() {
    let mut number = 3;

    while number != 0 {
        println!("{number}!");

        number -= 1;
    }

    println!("LIFTOFF!!!");
}
```

### Looping Through a Collection with for

- You could of course use a while loop to iterate over a collection of items, but it is more error prone

```rust
fn main() {
    let a = [10, 20, 30, 40, 50];
    let mut index = 0;

    while index < 5 {
        println!("the value is: {}", a[index]);

        index += 1;
    }
}
```

- Use a for loop instead
- These are the most commonly used loop constructs
```rust
fn main() {
    let a = [10, 20, 30, 40, 50];

    for element in a {
        println!("the value is: {element}");
    }
}
```

Here’s what the countdown would look like using a for loop and another method we’ve not yet talked about, rev, to reverse the range:

```rust
fn main() {
    for number in (1..4).rev() {
        println!("{number}!");
    }
    println!("LIFTOFF!!!");
}
```
