---
name: no_std
created: 2023-01-02T23:32:23-06:00
updated: 2023-01-02T23:33:07-06:00
aliases: 
tags: rust, bare metal
---
# no_std

The rust std library is the part that depends on libc or other OS facilities for things like allocation, network, dynamic memory allocation, filesystem access, and so on. you can declare a crate to be "#[!no_std]" and it only gets core, which is just the main types and traits. if you're doing bare metal stuff like writing an OS or writing code for microcontrollers you're generally safe to use libraries that are no_std because they're written with that restriction enforced
