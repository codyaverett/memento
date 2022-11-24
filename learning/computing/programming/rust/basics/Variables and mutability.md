---
name: Variables and mutability
created: 2022-11-23T22:43:41-06:00
updated: 2022-11-23T23:03:45-06:00
aliases: 
tags: rust, basics

---
# Variables and Mutability

- [Reference](https://doc.rust-lang.org/book/ch03-01-variables-and-mutability.html)
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

- [Const expressions](https://doc.rust-lang.org/reference/const_eval.html)
	- Compile time rules that can determine how certain function parameters, return types, statics, enums, and generics may only be used in a "constant context".
- Constants are valid for the entire time a program runs within the scope they are declared in.
	- Useful for values in your application domain that needs to be shared across the program.
		- e.g. Maximum number of players
		- e.g The gravity constant

## Shadowing

```rust
fn main() {
    let x = 5;

    let x = x + 1;

    {
        let x = x * 2;
        println!("The value of x in the inner scope is: {x}");
    }

    println!("The value of x is: {x}");
}
```

```shell
The value of x in the inner scope is: 12
The value of x is: 6
```

- Shadowing allows us to assign the variable to a different type while in the shadow scope
- This is due to us using the `let` keyword again