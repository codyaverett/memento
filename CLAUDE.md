# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

This is a personal knowledge management repository built around Obsidian, containing:
- **learning/**: Educational notes organized by topic (computing, mathematics, music, etc.)
- **sandbox/**: Programming examples and experiments in various languages
- **personal/**: Personal documents and daily notes
- **generated/**: AI-generated content and ideas
- **awesome/**: Curated lists and resources

## Key Technologies

The repository contains example code in multiple languages:
- **Rust**: Located in `sandbox/rust_examples/` with Cargo.toml projects
- **Deno/TypeScript**: Located in `sandbox/deno_examples/`
- **Python**: Located in `sandbox/python_examples/`
- **C/Make**: Located in `sandbox/make_examples/`

## Common Commands

### Deno Projects
```bash
# Run a Deno project
deno run main.ts

# Run with file watching
deno task dev

# Run tests
deno test
```

### Rust Projects
```bash
# Build a Rust project
cargo build

# Run a Rust project
cargo run

# Run tests
cargo test
```

### Make Projects
```bash
# Build C projects
make

# Clean build artifacts
make clean
```

## Working with Obsidian Notes

- The repository uses Obsidian for note-taking with metadata frontmatter
- Notes often include YAML frontmatter with fields like `name`, `created`, `updated`, `tags`
- The `.obsidian/` directory contains Obsidian configuration and plugins

## Git Workflow

After completing work:
1. Recommend commits in commitizen format
2. Update package version numbers appropriately (when applicable)
3. Create and push git tags

Include package version numbers in commit messages when relevant.