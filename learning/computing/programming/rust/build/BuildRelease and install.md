---
name: BuildRelease and Install
created: 2023-08-01T02:24:04-05:00
updated: 2023-08-01T02:25:48-05:00
aliases: 
tags: 
---
# BuildRelease and Install

```
# assuming you have a bin defined as matchfile in the src directory
cargo build --bin matchfile --release

cargo install --path . --bin matchfile
```
