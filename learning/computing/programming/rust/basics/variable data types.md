---
name: Variable Data Types
created: 2022-11-16T15:11:30-06:00
updated: 2022-11-23T23:52:46-06:00
aliases: 
tags: rust, basics, types
---
# Variable Data Types

## Scalar Types

Represents a single value

### Integers

A number without a fractional component

| Length | Signed | Unsigned |
| ------ | ------ | -------- |
| 8-bit | i8 (-128 to 127) | u8 (0 to 255)|
| 16-bit | i16 | u16 |
| 32-bit | i32 | u32 |
| 64-bit | i64 | u64 |
| 128-bit | i128 | u128 |
| arch | isize | usize |

- arch types are dependent on the computers architecture.
	- e.g. 32 bits on a 32 bit OS
	- e.g. 64 bits on a 64 bit OS

#### Literal Integer Types

- Number literals can also use _ as a visual separator to make the number easier to read, such as 1_000, which will have the same value as if you had specified 1000.
|Number literals |	Example |
| --- | --- |
|Decimal|98_222|
|Hex|0xff|
|Octal|0o77|
|Binary|0b1111_0000|
|Byte (u8 only)|b'A'|

### Floating-Point Types

- f32, single precision
- f64, double precision
```rust
fn main() {
    let x = 2.0; // f64

    let y: f32 = 3.0; // f32
}
```

### Numeric Operations

```rust
fn main() {
    // addition
    let sum = 5 + 10;

    // subtraction
    let difference = 95.5 - 4.3;

    // multiplication
    let product = 4 * 30;

    // division
    let quotient = 56.7 / 32.2;
    let floored = 2 / 3; // Results in 0

    // remainder
    let remainder = 43 % 5;
}
```

- [List of every rust operator](https://doc.rust-lang.org/book/appendix-02-operators.html)

### Boolean Type

```rust
fn main() {
    let t = true;

    let f: bool = false; // with explicit type annotation
}
```

### The Character Type

```rust
fn main() {
    let c = 'z';
    let z: char = 'ℤ'; // with explicit type annotation
    let heart_eyed_cat = '😻';
}
```

- Char literals use single quotes
- String literals use double quotes
- Chars are 4 bytes in size
- Represents a Unicode Scalar Value
	- Accented Letters
	- Chinese, Japanese, Korean characters
	- Emoji
	- zero-width spaces
- Unicode Scalar values range from `U+0000` to `U+E000` to `U+10FFFF` inclusive
- Further reading on [Storing UTF-8 Encoded Text with Strings](https://doc.rust-lang.org/book/ch08-02-strings.html#storing-utf-8-encoded-text-with-strings)

## Compound Types

### Tuple Types

- A general way of grouping a number of values with a variety of types together into one compound type
- Tuples have fixed length and cannot grow or shrink in size

```rust
fn main() {
    let tup: (i32, f64, u8) = (500, 6.4, 1);
}
```

- Pattern matching can be used to destructure the tuple
```rust
fn main() {
    let tup = (500, 6.4, 1);

    let (x, y, z) = tup;

    println!("The value of y is: {y}");
}
```

- Dot notation accessor by index
```rust
fn main() {
    let x: (i32, f64, u8) = (500, 6.4, 1);

    let five_hundred = x.0;

    let six_point_four = x.1;

    let one = x.2;
}

```

- Tuples without any values are called `unit`
- These represent an empty value or empty return type

### The Array

- A collection of values that are the same type
```rust
fn main() {
    let a = [1, 2, 3, 4, 5];
}
```

- Useful when you want your data on the stack instead of the Heap
- Useful when you wan a fixed number of elements
- Is not able to grow or shrink in size like a "Vector" type can

```rust
let months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

let a: [i32; 5] = [1, 2, 3, 4, 5];  // Array of 5 i32 elements

// alternatively without initializing
let a = [3; 5];
// this creates an array with values prepopulated to 3
// similar to
let a = [3, 3, 3, 3, 3];
```

#### Accessing Array Elements

Similar indexing like other programming languages

#### Invalid Array Element Access

```rust
use std::io;

fn main() {
    let a = [1, 2, 3, 4, 5];

    println!("Please enter an array index.");

    let mut index = String::new();

    io::stdin()
        .read_line(&mut index)
        .expect("Failed to read line");

    let index: usize = index
        .trim()
        .parse()
        .expect("Index entered was not a number");

    let element = a[index];

    println!("The value of the element at index {index} is: {element}");
}
```

This code compiles successfully. If you run this code using cargo run and enter 0, 1, 2, 3, or 4, the program will print out the corresponding value at that index in the array. If you instead enter a number past the end of the array, such as 10, you’ll see output like this:

thread 'main' panicked at 'index out of bounds: the len is 5 but the index is 10', src/main.rs19:19
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace

- The compiler can't possibly know that the accessed array index would be out of range.
- Thus the program panics and generates a runtime error
- This can be avoided with the help of error handling