#!/usr/bin/env bash
# Report tracked markdown notes missing YAML frontmatter (leading ---).
# Exit 1 if any missing (for optional CI). Pass --stats for counts only (exit 0).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

STATS_ONLY=0
if [[ "${1:-}" == "--stats" ]]; then
  STATS_ONLY=1
fi

missing=()
total=0
with_fm=0

while IFS= read -r f; do
  case "$f" in
    CLAUDE.md|AGENTS.md|LICENSE) continue ;;
  esac
  total=$((total + 1))
  first=$(head -n 1 "$f" 2>/dev/null || true)
  # trim CR
  first=${first%$'\r'}
  if [[ "$first" == "---" ]]; then
    with_fm=$((with_fm + 1))
  else
    missing+=("$f")
  fi
done < <(git ls-files '*.md')

pct=$(python3 -c "print(f'{100*$with_fm/max($total,1):.1f}')")
echo "frontmatter: $with_fm / $total ($pct%)"

if [[ ${#missing[@]} -gt 0 ]]; then
  echo "missing (${#missing[@]}):"
  printf '  %s\n' "${missing[@]}"
  if [[ $STATS_ONLY -eq 1 ]]; then
    exit 0
  fi
  exit 1
fi
exit 0
