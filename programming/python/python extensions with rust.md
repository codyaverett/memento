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
fn some_func() {
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

## Rust API Bindings: Py03

Py03 is a library that provides a procedural macro to translate rust code to the Python api.  Py03 is used for native C packages too.
```rust
fn some_func impl() {
	let v = vec![1,2,3];
} // v goes out of scope here


#[pyfunction]
fn some_func(py: Python, n: u32) -> &PyList {
	let list = PyList::new(py, &some_func(n as usize));
	list
}
```

### Python import
```python
>>> from pomodule.backend import some_func
>>> some_func(4)
```

## Making a module
```rust
use pyo3::prelude::*
use pyo3::types{PyDate};
use pyo3::wrap_pyfunction;

use date_impl::to_timestamp;

#[pyfunction]
fn seconds_before<!p>(py: Python<!p>, d: &PyDate, seconds: i64) -> PyResult<&!p PyDate> {
	let timestamp = to_timestamp(&d);
	PyDate::from_timestamp(py, timestamp - seconds)
}

#[pymodule]
fn date_ex(_py: Python, m: &PyModule) -> PyResult<()> {
	m.add_wrapped(wrap_pyfunction!(seconds_before))?;
	Ok( () )
}
```

Usage from python
```python
>>> from pomodule.date_ex import seconds_before
>>> from datetime import date
>>> seconds_before(date(2018, 2, 20), int(1e6))
datetime.date(2019, 2, 9)
```

