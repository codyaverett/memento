---
name: Rust Importing Modules
created: 2022-11-23T20:33:35-06:00
updated: 2022-12-28T16:04:27-06:00
aliases: 
tags: rust, modules
---
# Rust Importing Modules

```rust
use std::{
    fs::File,
    io::{Read, Write},
};
```


## Specifying Dependencies in Your Project Toml

### From Other Registries

```toml
# Some place other than crates.io
[dependencies]
some-crate = { version = "1.0", registry = "my-registry" }
```

### From Git

```toml
# Minimal
[dependencies]
regex = { git = "https://github.com/rust-lang/regex" }

# with branch
[dependencies]
regex = { git = "https://github.com/rust-lang/regex", branch = "next" }
```

- [Git authentication to private repo](https://doc.rust-lang.org/cargo/appendix/git-authentication.html)

### Sub-crates

Over time, our hello_world package from the guide has grown significantly in size! It’s gotten to the point that we probably want to split out a separate crate for others to use. To do this Cargo supports path dependencies which are typically sub-crates that live within one repository. Let’s start off by making a new crate inside of our hello_world package:

#### Inside of hello_world
$ cargo new hello_utils`

This will create a new folder hello_utils inside of which a Cargo.toml and src folder are ready to be configured. In order to tell Cargo about this, open up hello_world/Cargo.toml and add hello_utils to your dependencies:

```toml
[dependencies]
hello_utils = { path = "hello_utils" }
```

This tells Cargo that we depend on a crate called hello_utils which is found in the hello_utils folder (relative to the Cargo.toml it’s written in).

And that’s it! The next cargo build will automatically build hello_utils and all of its own dependencies, and others can also start using the crate as well. However, crates that use dependencies specified with only a path are not permitted on crates.io. If we wanted to publish our hello_world crate, we would need to publish a version of hello_utils to crates.io and specify its version in the dependencies line as well:

```toml
[dependencies]
hello_utils = { path = "hello_utils", version = "0.1.0" }
```
