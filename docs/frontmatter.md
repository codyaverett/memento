---
title: Frontmatter Schema
created: 2026-07-29
updated: 2026-07-29
type: evergreen
status: evergreen
tags: [docs, frontmatter, s++]
---

# Frontmatter Schema

All new markdown notes should start with YAML frontmatter. Legacy notes are backfilled lazily (Wave 2 target: ≥90% compliance).

## Required fields (new notes)

```yaml
---
title: Human-readable title
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: []
type: evergreen | moc | project | generated | log | curated
status: seedling | budding | evergreen | deprecated | scratch | active | done
---
```

## Optional fields

```yaml
sources: []          # URLs or citations
related: []          # wikilink titles or paths
aliases: []          # alternate names (Obsidian)
review_by: YYYY-MM-DD  # especially for generated/
moc: []              # parent map titles
---
```

## Field rules

| Field | Rules |
|---|---|
| `title` | Prefer over legacy `name`; either accepted until Wave 2 cleanup |
| `type` | Must match [[garden-constitution]] note types |
| `status` | Evergreen notes: seedling/budding/evergreen/deprecated. Projects: active/done. Generated: scratch or promoted |
| `updated` | Bump when content meaningfully changes |
| `tags` | Lowercase, hyphenated; avoid dumping dozens |

## Legacy compatibility

Many older notes use:

```yaml
name: ...
created: ISO-8601 datetime
updated: ISO-8601 datetime
aliases:
tags:
```

Agents may read either schema. When editing an old note, prefer upgrading to the new schema without losing `aliases`.

## Templates

See `templates/evergreen.md`, `moc.md`, `project.md`, `generated.md`, `learning-log.md`.
