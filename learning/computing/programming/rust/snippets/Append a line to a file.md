---
name: Append a line to a file
created: 2022-12-19T18:35:45-06:00
updated: 2022-12-19T18:36:56-06:00
aliases: 
tags: rust, io
---
# Append a Line to a File

To append a line to a file in Rust, you can use the fs::OpenOptions struct and the append method to open the file in append mode, and then use the write_all method of the std::io::Write trait to write the line to the file. Here's an example:

```rust
use std::fs::OpenOptions;
use std::io::Write;

fn main() -> std::io::Result<()> {
    let line = "This is a line of text\n";

    let mut file = OpenOptions::new()
        .append(true)
        .open("my_file.txt")?;

    file.write_all(line.as_bytes())?;

    Ok(())
}
```

This code will open the file my_file.txt in append mode, and write the line "This is a line of text\n" to the end of the file. If the file does not already exist, it will be created.

Note that the write_all method accepts a slice of bytes, so you'll need to convert the line of text to a slice of bytes using the as_bytes method before writing it to the file.

If you want to check if the line already exists in the file before appending it, you can read the file into a string and use the contains method to check if the line is already present. Here's an example:

```rust
use std::fs;
use std::io::{self, Read};

fn main() -> io::Result<()> {
    let line = "This is a line of text\n";

    let mut file = OpenOptions::new()
        .read(true)
        .open("my_file.txt")?;

    let mut contents = String::new();
    file.read_to_string(&mut contents)?;

    if !contents.contains(line) {
        let mut file = OpenOptions::new()
            .append(true)
            .open("my_file.txt")?;

        file.write_all(line.as_bytes())?;
    }

    Ok(())
}
```

This code will open the file in read-only mode, read its contents into a string, and check if the line is already present in the string. If the line is not present, it will open the file in append mode and write the line to the end of the file.
