---
name: Rustup
created: 2022-11-23T22:06:41-06:00
updated: 2022-12-19T15:58:32-06:00
aliases: 
tags: rust, tooling
---
# Rustup

Used to install and update your local installation of rust.

## Installing

On mac use: `brew install rustup`
On Linux use: `curl https://sh.rustup.rs -sSf | sh`

## Updating and Uninstalling

Upgrading rustup after its already been installed.
```shell
rustup update
```

To uninstall rust and rustup
```shell
rustup self uninstall
```

## Other Tools

Installing rustup will in turn install other vital tools for compiling and managing rust projects.

- [[cargo]]
- [[rustc]]
