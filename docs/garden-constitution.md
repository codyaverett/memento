---
title: Garden Constitution
created: 2026-07-29
updated: 2026-07-29
type: moc
status: evergreen
tags: [docs, garden, s++]
---

# Garden Constitution

Memento is a **public, agent-native digital garden**: a linkable knowledge system that humans and agents can navigate, trust, and extend without tribal knowledge.

## Principles

1. **Public by default** — Assume every commit is readable on the internet. See [[privacy-public]].
2. **Agents are first-class readers** — Structure, frontmatter, and maps must answer “where does X go?” and “what do we know about Y?”
3. **Evergreen over dump** — Prefer notes that stay useful over diary dumps. Promote or expire scratch.
4. **Link, don’t orphan** — New notes connect to a MOC, related notes, and sources when factual.
5. **Lazy migration** — New paths use kebab-case. Old spaced paths migrate when touched.
6. **No invented top-level roots** — Agents must not add top-level folders without updating [[taxonomy]].

## Note types

| Type | Location | Lifecycle |
|---|---|---|
| `evergreen` | `learning/**` | seedling → budding → evergreen → deprecated |
| `moc` | `maps/**` | Living indexes |
| `project` | `projects/**` | Specs, audits; status active/done |
| `curated` | `awesome/**` | Lists with review dates |
| `generated` | `generated/**` | Scratch; promote within ~90 days or expire |
| `log` | `personal/` learning logs only | Public session notes, not life admin |
| `sandbox` | Nested repos via `.meta` | Code experiments outside vault history |

## Quality bar (S++)

A note is garden-grade when it has:

- Clear title and frontmatter (`type`, `status`, `updated`)
- One-sentence summary (or obvious from first heading)
- At least one parent MOC or domain home
- Sources when stating non-obvious facts
- Related links when siblings exist

Templates live in `templates/`. Schema: [[frontmatter]]. Linking: [[linking]].

## Promote / expire

- **Promote** `generated/` → `learning/` or `projects/` when useful
- **Expire** scratch older than ~90 days with no promotion
- **Deprecate** with a pointer to the replacement note; do not leave silent duplicates

## Program tracking

GitHub issues labeled `s++` track Waves 0–3. This constitution is the durable contract; issues are the work queue.
