---
title: Maintenance
created: 2026-07-29
updated: 2026-07-29
type: evergreen
status: evergreen
tags: [docs, maintenance, s++]
---

# Maintenance

## After every meaningful edit session

- [ ] Bump `updated` on changed notes
- [ ] Public-safe content only ([[privacy-public]])
- [ ] Link new evergreen notes to a MOC
- [ ] Prefer kebab-case for **new** paths

## Weekly (when active)

- [ ] Skim `generated/` for promote vs expire
- [ ] Check `git status` for accidental secret-like files
- [ ] Update relevant MOCs if domain grew

## Monthly

- [ ] Orphan pass: notes with no inbound links (Wave 2 scripts)
- [ ] Frontmatter spot-check on recent notes
- [ ] Compress or remove oversized attachments if added

## Quarterly

- [ ] Review [[taxonomy]] for drift
- [ ] Refresh README / CLAUDE “updated” accuracy
- [ ] Awesome lists: `last-reviewed` dates
- [ ] S++ issue board: close done, open next wave tasks

## Security checklist

- [ ] No `.secret/`, `.env`, keys, or vault material staged
- [ ] Portfolio stays template-only in this public vault
- [ ] Life-admin tasks stay out of `personal/tasks.md`

## Program issues

Track work under GitHub labels `s++`, `wave-0` … `wave-3`.
