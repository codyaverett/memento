---
name: Result type
created: 2023-08-01T01:24:33-05:00
updated: 2023-08-01T01:25:13-05:00
aliases: 
tags: 
---
# Result Type

Result Type
In Rust, functions that can fail return a Result type. The Result type is an enum with two variants: Ok and Err. The Ok variant indicates success and contains a value, and the Err variant indicates an error and contains an error value.

Here's a function that attempts to divide two numbers and returns a Result:

```rust
fn divide(a: i32, b: i32) -> Result<i32, &'static str> {
    if b == 0 {
        Err("Cannot divide by zero")
    } else {
        Ok(a / b)
    }
}
```

In this case, if the function is successful, it will return Ok(a / b), where a / b is the result of the division. If the function fails (because we tried to divide by zero), it returns Err("Cannot divide by zero").

You typically use the ? operator to propagate errors up. If a function returns Result, you can use ? to exit the function early and pass the error up to the calling function. Here's how you could use the divide function:

```rust
fn divide_and_add_one(a: i32, b: i32) -> Result<i32, &'static str> {
    let division_result = divide(a, b)?;
    Ok(division_result + 1)
}
```

In this case, if divide(a, b) returns Err, the divide_and_add_one function will also return Err immediately, and the error message will be the same as the one from divide(a, b).
