---
title: Meta Repos
created: 2026-07-29
updated: 2026-07-29
type: evergreen
status: evergreen
tags: [docs, meta, sandbox, s++]
---

# Meta Repos

Memento is a **vault**, not a monorepo of all example code. Example projects live as **nested git repositories** under paths listed in `.meta`.

## `.meta` format

```json
{
  "projects": {
    "sandbox/deno_examples": "git@github.com:codyaverett/deno_examples.git",
    "personal/resume": "git@github.com:codyaverett/resume.git"
  }
}
```

Rules:

- Keys are **local paths** relative to the vault root
- Values are **git remotes**
- One entry per project; no inverted key/value pairs

## Gitignore

Nested project paths are listed in `.gitignore` so their working trees are not absorbed into memento history. Tracked sandbox content is limited (e.g. small HTML demos under `sandbox/html/`).

## Clone workflow

```bash
# From vault root, clone any missing nested projects
./scripts/clone-sandboxes.sh
```

Or manually:

```bash
git clone git@github.com:codyaverett/deno_examples.git sandbox/deno_examples
```

## Agent rules

- Do not commit large vendored trees into memento
- Prefer linking to nested repos or external GitHub URLs
- Update both `.meta` and `.gitignore` when adding a new nested project
