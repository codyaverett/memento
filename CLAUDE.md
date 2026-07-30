# CLAUDE.md

Guidance for AI assistants working in this repository.

## What this is

**Memento** is a public Obsidian-style digital garden (agent-native second brain). Markdown knowledge vault + nested sandbox repos. Not a single application monorepo.

**Start:** `maps/home.md` → domain MOCs → notes.  
**Rules:** `docs/garden-constitution.md`, `docs/privacy-public.md`, `docs/taxonomy.md`.

## Repository map

| Path | Role |
|---|---|
| `maps/` | Navigation spine (MOCs) |
| `learning/` | Evergreen notes by domain |
| `projects/` | Specs, audits, work products |
| `awesome/` | Curated lists |
| `generated/` | AI scratch → promote or expire (~90 days) |
| `personal/` | Public-safe only (blog, empty portfolio template) |
| `docs/` | Operating manuals |
| `templates/` | Note skeletons |
| `sandbox/` | Nested git examples (mostly gitignored) + small HTML demos |
| `.meta` | `local/path` → git remote for nested projects |

## Hard rules (public vault)

1. **Never commit secrets** — no `.env`, keys, vault passwords, ops credential transcripts. `.secret/` is forbidden.
2. **No life-admin or private financial positions** — see `docs/privacy-public.md`.
3. **No new top-level folders** without updating `docs/taxonomy.md` and `maps/home.md`.
4. **New paths: kebab-case.** Rename old spaced paths only when editing them (lazy migration).
5. **Do not vendor** large nested sandbox trees into memento history.

## Note placement

- Concepts / how-tos → `learning/<domain>/...` per `docs/taxonomy.md`
- Specs / audits → `projects/`
- Curated links → `awesome/`
- Scratch AI output → `generated/` with `type: generated`, `status: scratch`, `review_by`
- Learning session logs → public-safe only; use `templates/learning-log.md`
- JWT canonical note → `learning/computing/security/auth/JSON Web Token.md`
- Data ETL canonical (long-term) → `learning/computing/software/data ETL/`

## Frontmatter

New notes use the schema in `docs/frontmatter.md` and `templates/`. Minimum: `title`, `created`, `updated`, `type`, `status`, `tags`.

## Linking

- Attach evergreen notes to a domain MOC under `maps/`
- Prefer wikilinks; fix breaks when renaming
- See `docs/linking.md`

## Sandbox / nested repos

- Paths and remotes: `.meta`
- Clone helper: `./scripts/clone-sandboxes.sh`
- Docs: `docs/meta-repos.md`
- Languages present when cloned: Rust, Deno/TS, Python, C/Make, etc.

### When a nested project is present

```bash
# Deno
deno run main.ts
deno task dev
deno test

# Rust
cargo build && cargo run && cargo test

# Make
make && make clean
```

## Git workflow

- Commitizen-style messages; shell-safe (no backticks, `!`, `<>`, em-dashes in messages)
- After work: recommend commits; include issue closes as separate `Closes #N` lines when closing multiple
- History rewrite / force-push only with explicit user approval (e.g. secret purge)

## S++ program

GitHub issues labeled `s++` track foundation waves. Prefer completing Wave 1 foundation before Wave 2 mass renames.

## Obsidian

Optional local `.obsidian/` config is not required in git. Workspace/plugin state is gitignored.
