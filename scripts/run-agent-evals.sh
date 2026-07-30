#!/usr/bin/env bash
# Verify structural anchors for docs/agent-evals.md (path-based suite).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

fail=0
check() {
  local label="$1"
  shift
  local ok=0
  for p in "$@"; do
    if [[ -e "$p" ]]; then
      ok=1
      break
    fi
  done
  if [[ $ok -eq 1 ]]; then
    echo "PASS  $label"
  else
    echo "FAIL  $label (expected one of: $*)"
    fail=1
  fi
}

echo "Agent eval path anchors"
echo "======================="
check "1 home map" "maps/home.md"
check "2 JWT canonical" "learning/computing/security/auth/JSON Web Token.md"
check "3 Data ETL home" "learning/computing/software/data ETL/_index.md" "learning/computing/software/data ETL"
check "4 privacy policy" "docs/privacy-public.md"
check "5 meta + clone" ".meta" "scripts/clone-sandboxes.sh" "docs/meta-repos.md"
check "6 frontmatter docs" "docs/frontmatter.md"
check "7 taxonomy" "docs/taxonomy.md"
check "8 galaxyclaw audit" "projects/galaxyclaw-audit-2026-07-29.md"
check "9 interview prep" "learning/financial/career/interview questions/testing-quality-interview-prep.md"
check "10 FM script" "scripts/check-frontmatter.sh"

# Content claims (lightweight)
if grep -q "Never commit" docs/privacy-public.md 2>/dev/null; then
  echo "PASS  privacy has Never commit section"
else
  echo "FAIL  privacy missing Never commit section"
  fail=1
fi

if grep -Eq 'title:|type:|status:' docs/frontmatter.md 2>/dev/null; then
  echo "PASS  frontmatter docs mention schema fields"
else
  echo "FAIL  frontmatter docs incomplete"
  fail=1
fi

echo "======================="
if [[ $fail -eq 0 ]]; then
  echo "All agent eval anchors OK"
  exit 0
fi
echo "Some agent eval anchors FAILED"
exit 1
