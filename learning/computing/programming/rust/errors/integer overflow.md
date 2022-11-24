---
name: Integer Overflow
created: 2022-11-23T23:32:49-06:00
updated: 2022-11-23T23:33:52-06:00
aliases: 
tags: rust, error
---
# Integer Overflow

- [Reference](https://doc.rust-lang.org/book/ch03-02-data-types.html#integer-overflow)

Let’s say you have a variable of type u8 that can hold values between 0 and 255. If you try to change the variable to a value outside of that range, such as 256, integer overflow will occur, which can result in one of two behaviors. When you’re compiling in debug mode, Rust includes checks for integer overflow that cause your program to panic at runtime if this behavior occurs. Rust uses the term panicking when a program exits with an error; we’ll discuss panics in more depth in the “Unrecoverable Errors with panic!” section in Chapter 9.

When you’re compiling in release mode with the --release flag, Rust does not include checks for integer overflow that cause panics. Instead, if overflow occurs, Rust performs two’s complement wrapping. In short, values greater than the maximum value the type can hold “wrap around” to the minimum of the values the type can hold. In the case of a u8, the value 256 becomes 0, the value 257 becomes 1, and so on. The program won’t panic, but the variable will have a value that probably isn’t what you were expecting it to have. Relying on integer overflow’s wrapping behavior is considered an error.

To explicitly handle the possibility of overflow, you can use these families of methods provided by the standard library for primitive numeric types:

- Wrap in all modes with the wrapping_* methods, such as wrapping_add
- Return the None value if there is overflow with the checked_* methods
- Return the value and a boolean indicating whether there was overflow with the overflowing_* methods
- Saturate at the value’s minimum or maximum values with saturating_* methods
