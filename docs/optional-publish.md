---
title: Optional Publish
created: 2026-07-29
updated: 2026-07-29
type: evergreen
status: evergreen
tags: [docs, publish, s++]
---

# Optional Publish

Memento is **agent-native first**. A public static site is optional polish, not required for S++.

## If you publish later

Recommended stack: [Quartz](https://quartz.jzhao.xyz/) or Astro content collections.

### Include

- `maps/`
- `learning/` (prefer `status: evergreen` or `budding`)
- `awesome/`
- `docs/` (ops manuals are fine public)
- `projects/` (finished specs/audits)
- `README.md`

### Exclude

- `generated/` scratch
- `personal/daily/`
- `personal/portfolio.md` if ever filled (keep template-only or exclude)
- Nested `sandbox/` code (link out to GitHub remotes instead)
- Anything violating [[privacy-public]]

### Frontmatter filter sketch

Only emit notes where `type` is in `evergreen | moc | curated | project | log` and `status` is not `scratch` or `deprecated` (or include deprecated with a banner).

### Base path

Publish from the vault root; MOCs at `maps/home.md` remain the human entry.

## Current decision

**No site in Wave 3.** GitHub + Obsidian + agents are the surfaces. Revisit when content density justifies a branded site.
