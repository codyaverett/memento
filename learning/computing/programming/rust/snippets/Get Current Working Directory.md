---
name: Get Current Working Directory
created: 2022-11-23T20:37:43-06:00
updated: 2022-11-23T20:38:34-06:00
aliases: 
tags: rust
---
# Get Current Working Directory

```rust
fn get_cwd() -> String {
    std::env::current_dir()
        .unwrap()
        .into_os_string()
        .into_string()
        .unwrap()
}
```
