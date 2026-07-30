---
title: Linking Conventions
created: 2026-07-29
updated: 2026-07-29
type: evergreen
status: evergreen
tags: [docs, linking, s++]
---

# Linking Conventions

## Spine

1. Start at [[home]] (`maps/home.md`)
2. Domain MOCs under `maps/`
3. Topic notes under `learning/**` (and peers)

Every evergreen note should be reachable from a MOC within a few clicks.

## Wikilinks

- Prefer Obsidian wikilinks: `[[Note Title]]` or `[[path/to/note|label]]`
- After renames, fix broken links in the same change when practical
- Images: `![[Pasted image ....png]]` or relative markdown image links

## Minimum links for evergreen notes

1. **Parent** — domain MOC or folder index
2. **Related** — at least one sibling when it exists
3. **Source** — URL or citation when stating non-obvious facts

## Duplicates

- Do not create a second note for the same concept
- If a stub exists, point to the canonical note and mark `status: deprecated`
- JWT example: programming tree stubs to security auth note

## Generated notes

Link from `generated/` into a MOC only after promotion to `learning/` or `projects/`. Scratch stays unlisted on home maps.
