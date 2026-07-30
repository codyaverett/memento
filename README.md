---
title: Memento
created: 2022-06-09
updated: 2026-07-29
aliases: 
dg-home: true
dg-publish: false
tags: [readme]
type: moc
status: evergreen
---

# Memento

Public **digital garden** and agent-native second brain — notes, maps, specs, and experiments while learning in public.

**Start here:** [maps/home.md](maps/home.md) · **Scoreboard:** [docs/s-plus-scoreboard.md](docs/s-plus-scoreboard.md)

## About

- **Cody Averett** — software engineer (~15 years)
- Interested in computing, maths, music, self-improvement, economics, and decentralized tech
- This vault is **public**. Never commit secrets, live holdings, or life-admin — see [docs/privacy-public.md](docs/privacy-public.md)

## Navigate

| Path | What |
|---|---|
| [maps/](maps/) | Maps of content (spine) |
| [learning/](learning/) | Evergreen topic notes |
| [projects/](projects/) | Specs and audits |
| [awesome/](awesome/) | Curated external lists |
| [docs/](docs/) | Constitution, taxonomy, quality bar, agent evals |
| [templates/](templates/) | New-note skeletons |
| [sandbox/](sandbox/) | Nested example repos + small demos |
| [generated/](generated/) | Scratch (promote or expire) |
| [personal/](personal/) | Public-safe personal surface (blog drafts, etc.) |

## For agents

1. Read [CLAUDE.md](CLAUDE.md) / [AGENTS.md](AGENTS.md)
2. Follow [docs/garden-constitution.md](docs/garden-constitution.md) and [docs/taxonomy.md](docs/taxonomy.md)
3. Verify structure with:

```bash
./scripts/check-frontmatter.sh --stats
./scripts/run-agent-evals.sh
```

## Nested example repos

Code experiments live in separate git repos listed in [`.meta`](.meta). See [docs/meta-repos.md](docs/meta-repos.md) and `./scripts/clone-sandboxes.sh`.

## Writing

- Blog drafts: [personal/blog/](personal/blog/)
- Quality bar for reference notes: [docs/evergreen-quality.md](docs/evergreen-quality.md)

## Contact

- codyaverett@gmail.com
- [LinkedIn](https://www.linkedin.com/in/code-e-averett/)
- [GitHub](https://github.com/codyaverett)

## License

See [LICENSE](LICENSE).
