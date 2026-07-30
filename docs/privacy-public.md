---
title: Public Privacy Policy
created: 2026-07-29
updated: 2026-07-29
type: evergreen
status: evergreen
tags: [docs, privacy, security, s++]
---

# Public Privacy Policy

This repository is **public**. Treat every file as world-readable.

## Never commit

- Secrets, vault passwords, API keys, tokens, private keys, `.env` files
- Real account balances, tax IDs, full account numbers
- Home addresses, private phone numbers, family medical detail
- Ops transcripts with host credentials or vault encrypt material
- Live portfolio holdings or cost basis (empty templates are OK)

## Prefer not commit (use a private journal instead)

- Life-admin todos (household chores, personal logistics)
- Property-identifying construction detail
- First-person crisis journaling (general educational notes are OK)
- Filled financial positions

## Encouraged public content

- Evergreen technical and creative notes
- Career and finance **concepts** (not personal net-worth statements)
- ADHD / productivity **frameworks** framed as general knowledge
- Specs, audits, awesome lists, sandbox demos
- Blog drafts and public learning logs

## Daily / session notes

- **Do:** learning logs (what you studied, links, experiments)
- **Do not:** private life diary in this vault
- Prefer an external private journal for household and personal admin

## Secrets hygiene

- `.secret/` is gitignored and must never be tracked
- If a secret is ever committed: rotate credentials, remove from tree, **purge history**, force-push only with intent
- See GitHub issue #1 for Wave 0 secret purge

## Agent rules

Agents must refuse to add content that violates “Never commit.” When unsure, put material under `generated/` with `status: scratch` only if it is still public-safe; otherwise ask the user to keep it out of the repo.
