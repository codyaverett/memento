---
name: Learning and Documenting Rust
created: 2022-11-23T22:24:57-06:00
updated: 2022-11-24T00:54:50-06:00
aliases: 
tags: rust, learning
---
# Learning and Documenting Rust

## Topics to Document

This is a brief first list of topics I'd like to perhaps cover.
Most of the topics are from this [online version of "The rust programming language"](https://doc.rust-lang.org/book/)

- [x] Tooling and setup
	- [x] [[cargo]]
	- [x] [[rustc]]
	- [x] [[rustup]]
- [x] Basics
	- [x] Comments
	- [x] Control flow
	- [x] Functions
	- [x] Variable data types
	- [x] Variables and mutability rules
- [ ] Ownership
	- [ ] What is ownership
	- [ ] References and borrowing
	- [ ] The slice type
- [ ] Using structs to structure related data
	- [ ] Defining and initializing structs
	- [ ] An example program using structs
	- [ ] Method Syntax
- [ ] Enums and Pattern Matching
	- [ ] Defining an Enum
	- [ ] The match Control Flow Construct
	- [ ] Concise Control flow with if let
- [ ] Managing growing projects with packages, crates, and modules
	- [ ] Packages and crates
	- [ ] Defining Modules to control scope and privacy
	- [ ] Paths for referring to an item in the module tree
	- [ ] Bringing Paths Into Scope with the use Keyword
	- [ ] Separating Modules into Different files
	- [ ] [[importing rust modules]]
	- [ ] creating a module
	- [ ] publishing a module
- [ ] Common Collections
	- [ ] Storing Lists of Values with Vectors
	- [ ] Storing UTF-8 Encoded Text with Strings
	- [ ] Storing Keys with Associated Values in Hash Maps
- [ ] Error Handling
	- [ ] Unrecoverable Errors with panic!
	- [ ] Recoverable Errors with Result
	- [ ] To panic! or Not to panic!
- [ ] Generic Types, Traits, and Lifetimes
	- [ ] Generic Data Types
	- [ ] Traits: Defining Shared Behavior
	- [ ] Validating References with Lifetimes
- [ ] Writing Automated Tests
	- [ ] How to Write tests
	- [ ] Controlling how tests are run
	- [ ] Test organization
- [ ] An I/O Project: Building a command line program
	- [ ] Accepting command line arguments
	- [ ] Reading a file
	- [ ] Refactoring to improve modularity and Error handling
	- [ ] Developing the library's Functionality with Test driven development
	- [ ] Working with Environment Variables
	- [ ] Writing Error Messages to Standard Error Instead of Standard Output
- [ ] Functional Language Features: Iterators and Closures
	- [ ] Closures: Anonymous Functions that Capture Their Environment
	- [ ] Processing a series of items with iterators
	- [ ] Improving our I/O Project
	- [ ] Comparing Performance: Loops vs. Iterators
- [ ] More about Cargo and Crates.io
	- [ ] Customizing builds with release profiles
	- [ ] Publishing a crate to crates.io
	- [ ] Cargo workspaces
	- [ ] Installing binaries from crates.io with cargo install
	- [ ] Extending Cargo with Custom commands
- [ ] Smart pointers
	- [ ] ...
- [ ] Fearless Concurrency
	- [ ] ...
- [ ] Object Oriented Programming Features of Rust
	- [ ] ...
- [ ] Patterns and matching
	- [ ] ...
- [ ] Advanced Features
	- [ ] ...
- [ ] Final Project: Building a multithreaded Web Server
	- [ ] ...
- [ ] Appendix
	- [ ] Keywords
	- [ ] Operators and Symbols
	- [ ] Derivable Traits
	- [ ] Useful Development Tools
	- [ ] Editions
	- [ ] Translations of the book
	- [ ] How Rust is made and "Nightly Rust"