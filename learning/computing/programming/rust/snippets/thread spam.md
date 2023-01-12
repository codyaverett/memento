---
name: Thread Spam
created: 2023-01-11T19:44:25-06:00
updated: 2023-01-11T19:45:22-06:00
aliases: 
tags: 
---
# Thread Spam


Start up 2000 threads that wake back up every 100 ms.  Your computer will probably die
```rust
use std::thread;
use std::time::Duration;

fn main() {
    for _ in 0..2_000 {
        thread::spawn(|| loop {
            thread::sleep(Duration::from_millis(100));
        });
    }
    thread::sleep(Duration::from_secs(1_000));
}
```