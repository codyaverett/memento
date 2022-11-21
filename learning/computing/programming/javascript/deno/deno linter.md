---
name: deno linter
created: 2022-11-21T02:59:29-06:00
updated: 2022-11-21T03:02:28-06:00
aliases: 
tags: deno, lint
---
# Deno Linter

The deno linter automatically formats code syntax in your codebase so you don't have to.  It's very similar to prettier.

## Running

```shell
# Lint all the ts and js files in the current working directory
deno lint --unstable

# Lint all the listed files
deno lint --unstable file1.ts file2.ts
```

## Configuration

A lint section can be included in `deno.json` or `deno.jsonc` with linter configurations.

```jsonc
  "lint": {
    "files": {
      "include": ["src/"],
      "exclude": ["src/testdata/"]
    },
    "rules": {
      "tags": ["recommended"],
      "include": ["ban-untagged-todo"],
      "exclude": ["no-unused-vars"]
    }
  },

```

