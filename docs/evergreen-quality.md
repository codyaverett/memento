---
title: Evergreen Quality Bar
created: 2026-07-29
updated: 2026-07-29
type: evergreen
status: evergreen
tags: [docs, quality, s++]
---

# Evergreen Quality Bar

Definition of done for `type: evergreen` notes. Seedling notes may be incomplete; promote to `budding` / `evergreen` only when this bar is met.

## Required

| Element | What good looks like |
|---|---|
| **Frontmatter** | `title`, `created`, `updated`, `type`, `status`, `tags` per [[frontmatter]] |
| **Summary** | First paragraph or explicit one-liner: what this is and when it matters |
| **Parent** | Linked from a domain MOC under `maps/`, or from a folder `_index.md` |
| **Structure** | Clear headings; scannable bullets over walls of text |

## Strongly recommended

| Element | What good looks like |
|---|---|
| **When to use** | Situations where this note applies (and when it does not) |
| **Examples** | Command, snippet, or concrete scenario |
| **Sources** | URLs or citations for non-obvious claims |
| **Related** | Sibling notes, contrasts, prerequisites |

## Status ladder

| Status | Meaning |
|---|---|
| `seedling` | Captured; may lack structure |
| `budding` | Summary + parent link; useful but thin |
| `evergreen` | Quality bar met; safe for agents to trust |
| `deprecated` | Superseded; points to replacement |

## Exemplars in this vault

- [[JSON Web Token]] — summary, structure, related, parent MOC
- [[Data ETL]] — index with concepts/tools/related
- [[garden-constitution]] — principles and contracts
- [[privacy-public]] — allow/deny rules

## Agents

When creating or upgrading notes:

1. Prefer `templates/evergreen.md`
2. Link from the domain MOC in the same change when practical
3. Do not mark `status: evergreen` without summary + parent

Optional publish (static site) should export only `evergreen` / `budding` notes under `learning/`, `maps/`, `awesome/`, and `docs/` — never raw `generated/` scratch or private-filled templates. See [[optional-publish]].
