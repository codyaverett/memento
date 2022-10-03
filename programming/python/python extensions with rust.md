# Python extensions with Rust

Building python extensions with Rust.  Notes from [this video presentation](https://www.youtube.com/watch?v=4h8Ll9_-SZY).

- Python is a great "glue" language
- Python has runtime overhead concerns

## C API: Downsides
- Manual memory management
- Manual reference counting (Py_INCREF, Py_DECREF)
- No memory safety

## Rust
- Memory safety
- Fearless concurrency
- High performance
- Broad community and open source ecosystem

All these safety features come during compile-time

Rust has a package manager called Cargo that can be used

### Rust: Ownership
- Variable bindings have ownership over the resource they're bound to
```rust
fn some func() {
	let v = vec![1,2,3];
} // v goes out of scope here
```
- Assignment of resources moves the ownership to the new variable
```rust
fn take_ownership(v : Vec<i32>) {
	// Do stuff with v
} // Resources associated with v can be cleaned up

fn main() {
	let v = vec![1,2,3];  // Vector is owned by "v"
	take_ownership)v);    // Vector moves into take_ownership
	println!("{}", v[0]); // Error: use of move value `v`
}
```

