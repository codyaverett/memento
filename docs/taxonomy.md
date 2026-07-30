---
title: Taxonomy
created: 2026-07-29
updated: 2026-07-29
type: evergreen
status: evergreen
tags: [docs, taxonomy, s++]
---

# Taxonomy

Where notes live. Agents: place new notes using this map; do not invent new top-level folders without updating this file.

## Top level

| Path | Purpose |
|---|---|
| `maps/` | Maps of content (navigation spine) |
| `learning/` | Evergreen and topic notes (bulk of value) |
| `projects/` | Specs, audits, active work products |
| `awesome/` | Curated external lists |
| `generated/` | AI / scratch notes → promote or expire |
| `personal/` | Public-safe personal surface only (blog, empty templates) |
| `sandbox/` | Nested example repos (gitignored) + small tracked demos |
| `docs/` | Garden operating manuals |
| `templates/` | New-note skeletons |
| `scripts/` | Vault hygiene helpers |

## `learning/` domains

| Domain | Path | Notes |
|---|---|---|
| Computing | `learning/computing/` | programming, software, cloud, crypto, security, AI, hardware |
| Financial | `learning/financial/` | career, trading concepts, money, business |
| Mental | `learning/mental/` | ADHD, productivity frameworks, general health education |
| Creative | `learning/music/`, `cooking/`, `hobby/`, `crafting/` | arts and hobbies |
| STEM misc | `learning/mathematics/`, `nature/`, `farming/` | |
| Meta learning | `learning/reading/`, `techniques/`, `traveling/` | |
| Business | `learning/business/` | pitches, starts |

### Computing placement

| Topic | Prefer |
|---|---|
| Language / code concepts | `learning/computing/programming/<lang-or-topic>/` |
| Ops tools (git, containers, CI, nginx, …) | `learning/computing/software/` |
| Auth / attacks | `learning/computing/security/` |
| Cloud quizzes / provider notes | `learning/computing/cloud/` |
| Crypto networks / tools | `learning/computing/cryptocurrency/` |
| ML / local LLMs | `learning/computing/programming/machine learning/` or `ai/` |
| Data ETL / warehouses | **Canonical long-term:** `learning/computing/software/data ETL/` (legacy also under `programming/data_etl/` — merge in Wave 2) |

### Auth notes

- **Canonical JWT note:** `learning/computing/security/auth/JSON Web Token.md`
- Programming tree copy is a stub pointing here

## Path naming

- **New files and folders:** `kebab-case.md`
- **Existing paths with spaces:** leave until edited, then rename and fix links
- Attachments: co-located `attachments/` folders or next to the note

## Empty folders

Empty domain folders should either:

1. Get a short `_index.md` seed, or
2. Be removed

Do not leave unexplained empty trees.
