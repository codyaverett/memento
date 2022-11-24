---
name: Variables and mutability
created: 2022-11-23T22:43:41-06:00
updated: 2022-11-23T23:03:45-06:00
aliases: 
tags: rust, basics
---
# Variables and Mutability

- Variables in rust are immutable by default.
- You have to explicitly define a variable to be mutable with the `mut` keyword.
- Using mutable values can lead to difficult to find bugs in code.

```rust
fn main() {
	let mut x = 5;
	println!("The value of x is: {x}");
	x = 6;
	println!("The value of x is: {x}");
}
```

```shell
The value of x is: 5
The value of x is: 6
```

## Constants

- These values are explicitly not allowed to change

```rust
const THREE_HOURS_IN_SECONDS: u32 = 60 * 60 * 3;
```

