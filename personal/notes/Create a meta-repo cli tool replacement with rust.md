---
name: Create a Meta-repo Cli Tool Replacement with Rust
created: 2022-11-23T21:36:53-06:00
updated: 2022-11-23T22:01:11-06:00
aliases: 
tags: project
---
# Create a Meta-repo Cli Tool Replacement with Rust

## Features

- [ ] Basic cli command demo and initial github repo publish
- [ ] Document out basic MVP feature set
- [ ] Tool should be standalone and installable through `cargo install`
- [ ] Command to initialize
	- generate a config file to store workspace projects
	- Generate and manage entries in .gitignore file
		- We need to ignore project directories
- [ ] Command to add a new project to the workspace
	- Projects are name aliases to directories that are cloned github repositories
	- New project directories should be added to the gitignore so we don't end up with any unwanted git submodules
	- Git clone the project to specified directory
- [ ] Command to sync / clone any projects that are not cloned
- [ ] Command to run commands against all projects or a subset of projects

## Motivation

- I like the tool that [mateodelnorte](https://github.com/mateodelnorte) created, but I had issues installing it behind corporate firewalls in the past due to an explicit github based dependency.
- I think it's a interesting enough problem to both learn rust better and add my own spin to the project
  
## Additional Thoughts
- The use of `.gitignore` files behind the scenes to prevent submodule creation is actually genius and I am happy to stumble upon the concept
- I'd like to expand and explore the concept of cli plugins within a rust project if this experiment makes it that far

## Reference
- https://github.com/mateodelnorte/meta
- https://medium.com/@marcguilera/effective-meta-repo-ci-cd-pipelines-c18676443d