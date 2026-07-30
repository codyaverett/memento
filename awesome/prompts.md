---
title: Prompts
created: 2023-08-18
updated: 2026-07-29
last_reviewed: 2026-07-29
tags: [awesome, curated, llm, ai]
type: curated
status: evergreen
---

# Prompts

Reusable prompt patterns for learning and engineering. Parent: [[awesome]].

**Last reviewed:** 2026-07-29

## Meta: improve a prompt

```
Rewrite the following prompt to be clearer, more constrained, and easier
for a coding agent to execute. Keep my intent. Call out ambiguities.

PROMPT:
...
```

## Explain a concept for this vault

```
Explain {topic} for a working software engineer. Include:
1) one-sentence summary
2) when to use / when not to
3) a minimal example
4) common pitfalls
5) 2-3 related concepts to link

Format as markdown suitable for an evergreen note.
```

## Code review (public-safe)

```
Review the following diff for correctness, security, and maintainability.
Do not suggest committing secrets. Prefer small, testable changes.

DIFF:
...
```

## Digital garden placement

```
Given this note draft, recommend: type (evergreen|project|generated|curated),
target path under the memento taxonomy, tags, and which MOC should link it.
Draft: ...
```

## Related

- Garden ops: [[garden-constitution]], [[taxonomy]]
- AI tools list: [[ai-tools]]
