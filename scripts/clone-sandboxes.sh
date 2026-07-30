#!/usr/bin/env bash
# Clone nested projects listed in .meta (path → remote).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
META="$ROOT/.meta"

if [[ ! -f "$META" ]]; then
  echo "missing $META" >&2
  exit 1
fi

if ! command -v python3 >/dev/null 2>&1; then
  echo "python3 required to parse .meta" >&2
  exit 1
fi

python3 - "$ROOT" "$META" <<'PY'
import json, os, subprocess, sys

root, meta_path = sys.argv[1], sys.argv[2]
with open(meta_path) as f:
    data = json.load(f)
projects = data.get("projects") or {}
if not projects:
    print("no projects in .meta")
    sys.exit(0)

for path, remote in sorted(projects.items()):
    dest = os.path.join(root, path)
    if os.path.isdir(os.path.join(dest, ".git")):
        print(f"ok exists: {path}")
        continue
    if os.path.exists(dest) and not os.path.isdir(dest):
        print(f"skip (not a dir): {path}", file=sys.stderr)
        continue
    os.makedirs(os.path.dirname(dest) or ".", exist_ok=True)
    print(f"cloning {remote} -> {path}")
    subprocess.check_call(["git", "clone", remote, dest])
PY
