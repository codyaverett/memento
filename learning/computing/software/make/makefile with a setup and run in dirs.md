---
name: makefile with a setup and run in dirs
created: 2023-03-09T00:09:55-06:00
updated: 2023-03-09T00:11:00-06:00
aliases: 
tags: 
---
# makefile with a setup and run in dirs

```make
# Define the available setup commands
.PHONY: setup
setup:
	@echo "Checking for required dependencies..."
	@command -v node >/dev/null 2>&1 || { echo >&2 "Node.js is required but not installed. Aborting."; exit 1; }
	@command -v deno >/dev/null 2>&1 || { echo >&2 "Deno is required but not installed. Aborting."; exit 1; }
	@command -v cargo >/dev/null 2>&1 || { echo >&2 "Rust is required but not installed. Aborting."; exit 1; }
	@echo "All required dependencies are installed."

# Define a function to run a make command in each directory that matches the filter
define run-in-dirs
  for dir in $(shell find . -type d -maxdepth 1 -name '$(FILTER)'); do \
    make -C $$dir $1; \
  done
endef

# Define the available Node.js commands
.PHONY: build-node
build-node:
	$(call run-in-dirs, npm run build)

.PHONY: test-node
test-node:
	$(call run-in-dirs, npm run test)

.PHONY: clean-node
clean-node:
	$(call run-in-dirs, npm run clean)

# Define the available Deno commands
.PHONY: build-deno
build-deno:
	$(call run-in-dirs, deno compile)

.PHONY: test-deno
test-deno:
	$(call run-in-dirs, deno test)

.PHONY: clean-deno
clean-deno:
	$(call run-in-dirs, deno cache --reload)

# Define the available Rust commands
.PHONY: build-rust
build-rust:
	$(call run-in-dirs, cargo build)

.PHONY: test-rust
test-rust:
	$(call run-in-dirs, cargo test)

.PHONY: clean-rust
clean-rust:
	$(call run-in-dirs, cargo clean)

# Define the default command as "build-node"
.DEFAULT_GOAL := build-node

```