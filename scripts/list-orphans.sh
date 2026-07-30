#!/usr/bin/env bash
# List tracked leaf notes never referenced via [[wikilink]] from other notes.
# Heuristic only — review before deleting. Hubs (maps/, docs/, templates/) excluded.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

python3 << 'PY'
import re
import subprocess
from pathlib import Path

files = subprocess.check_output(["git", "ls-files", "*.md"], text=True).splitlines()
SKIP_PREFIX = ("maps/", "docs/", "templates/")
SKIP_FILES = {"CLAUDE.md", "AGENTS.md", "README.md", "LICENSE"}

contents = {}
for f in files:
    try:
        contents[f] = Path(f).read_text(encoding="utf-8", errors="replace")
    except OSError:
        continue

# All wikilink targets across vault
link_re = re.compile(r"\[\[([^\]|#]+)(?:[|#][^\]]*)?\]\]")
linked_targets = set()
for text in contents.values():
    for m in link_re.finditer(text):
        linked_targets.add(m.group(1).strip())

orphans = []
for f, text in contents.items():
    if f in SKIP_FILES or f.startswith(SKIP_PREFIX):
        continue
    if f.endswith("/_index.md") or f.endswith("/README.md"):
        continue
    stem = Path(f).stem
    title = stem
    m = re.match(r"^---\n(.*?)\n---", text, re.S)
    if m:
        tm = re.search(r"^(?:title|name):\s*(.+)$", m.group(1), re.M)
        if tm:
            title = tm.group(1).strip().strip("\"'")
    # referenced if any wikilink target matches title or stem
    if title in linked_targets or stem in linked_targets:
        continue
    # also path-style references in maps (backticks or plain path)
    basename = Path(f).name
    referenced = False
    for other, otext in contents.items():
        if other == f:
            continue
        if basename in otext or f in otext:
            referenced = True
            break
    if not referenced:
        orphans.append(f)

print(f"orphan candidates (no inbound wikilink/path): {len(orphans)}")
for o in sorted(orphans):
    print(o)
PY
