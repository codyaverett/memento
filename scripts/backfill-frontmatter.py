#!/usr/bin/env python3
"""Add minimal frontmatter to tracked markdown notes that lack it."""
from __future__ import annotations

import re
import subprocess
from datetime import date
from pathlib import Path

SKIP = {"CLAUDE.md", "AGENTS.md", "LICENSE"}
TODAY = date.today().isoformat()


def infer_type(path: str) -> str:
    if path.startswith("maps/"):
        return "moc"
    if path.startswith("projects/"):
        return "project"
    if path.startswith("generated/"):
        return "generated"
    if path.startswith("awesome/"):
        return "curated"
    if path.startswith("personal/daily/"):
        return "log"
    if path.startswith("docs/"):
        return "evergreen"
    return "evergreen"


def infer_status(path: str) -> str:
    if path.startswith("generated/"):
        return "scratch"
    if path.startswith("projects/"):
        return "active"
    if path.startswith("personal/daily/"):
        return "seedling"
    return "seedling"


def title_from_body(path: str, text: str) -> str:
    for line in text.splitlines()[:30]:
        if line.startswith("# "):
            return line[2:].strip()
    return Path(path).stem.replace("-", " ").replace("_", " ")


def main() -> None:
    files = subprocess.check_output(["git", "ls-files", "*.md"], text=True).splitlines()
    changed = 0
    for f in files:
        if f in SKIP:
            continue
        p = Path(f)
        text = p.read_text(encoding="utf-8", errors="replace")
        if text.startswith("---\n") or text.startswith("---\r\n"):
            continue
        # Skip files that are only HTML-ish or empty
        title = title_from_body(f, text)
        typ = infer_type(f)
        status = infer_status(f)
        tags = []
        if typ == "generated":
            tags = ["generated"]
        elif typ == "log":
            tags = ["daily", "log"]
        elif typ == "project":
            tags = ["project"]
        tag_line = f"tags: [{', '.join(tags)}]" if tags else "tags: []"
        review = ""
        if typ == "generated":
            review = "review_by: 2026-10-29\n"
        fm = (
            f"---\n"
            f"title: {title}\n"
            f"created: {TODAY}\n"
            f"updated: {TODAY}\n"
            f"{tag_line}\n"
            f"type: {typ}\n"
            f"status: {status}\n"
            f"{review}"
            f"---\n\n"
        )
        p.write_text(fm + text.lstrip("\n"), encoding="utf-8")
        changed += 1
        print(f"backfilled {f}")
    print(f"done: {changed} files")


if __name__ == "__main__":
    main()
