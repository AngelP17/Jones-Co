#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
MODE="${1:-quick}"

failures=0
warns=0

ok() { echo "ok: $*"; }
warn() { echo "warn: $*"; warns=$((warns+1)); }
fail() { echo "fail: $*"; failures=$((failures+1)); }

require_file() {
  local p="$1"
  [ -f "$p" ] && ok "$p" || fail "missing file $p"
}

check_bash_syntax() {
  local p="$1"
  if bash -n "$p"; then
    ok "bash -n $p"
  else
    fail "bash syntax $p"
  fi
}

check_json() {
  local p="$1"
  [ -f "$p" ] || return 0
  if python3 -m json.tool "$p" >/dev/null 2>&1; then
    ok "json valid $p"
  else
    fail "invalid json $p"
  fi
}

check_projection() {
  local src="$1"
  local dst="$2"
  if [ ! -e "$dst" ] && [ ! -L "$dst" ]; then
    fail "missing projection $dst"
    return
  fi
  if [ -L "$dst" ]; then
    [ -e "$dst" ] && ok "projection symlink $dst" || fail "broken projection symlink $dst"
    return
  fi
  if cmp -s "$src" "$dst"; then
    ok "projection content $dst"
  else
    fail "projection mismatch $dst"
  fi
}

require_file "$ROOT/ORCHESTRA.md"

for s in bootstrap.sh lock.sh quality-gate.sh orchestra.sh; do
  p="$ROOT/.orchestra/scripts/$s"
  require_file "$p"
  [ -x "$p" ] && ok "executable $p" || fail "not executable $p"
  check_bash_syntax "$p"
done

check_json "$ROOT/.orchestra/swarm/registry.json"
check_json "$ROOT/.orchestra/swarm/state.json"

check_projection "$ROOT/ORCHESTRA.md" "$ROOT/.cursor/rules/orchestra.md"
check_projection "$ROOT/ORCHESTRA.md" "$ROOT/CLAUDE.md"
check_projection "$ROOT/ORCHESTRA.md" "$ROOT/codex.md"
check_projection "$ROOT/ORCHESTRA.md" "$ROOT/.github/prompts/orchestra.md"
check_projection "$ROOT/ORCHESTRA.md" "$ROOT/.github/copilot-instructions.md"
check_projection "$ROOT/ORCHESTRA.md" "$ROOT/AGENTS.md"

if command -v shellcheck >/dev/null 2>&1; then
  if shellcheck "$ROOT/.orchestra/scripts"/*.sh; then
    ok "shellcheck"
  else
    fail "shellcheck issues"
  fi
else
  warn "shellcheck not installed"
fi

if [ "$MODE" = "full" ]; then
  if [ -f "$ROOT/.orchestra/swarm/state.json" ]; then
    "$ROOT/.orchestra/scripts/orchestra.sh" status >/dev/null && ok "orchestra status" || fail "orchestra status"
  else
    warn "state.json not found; skipping orchestra status"
  fi
fi

if [ "$failures" -gt 0 ]; then
  echo "quality gate: FAILED (failures=$failures warnings=$warns)"
  exit 1
fi

echo "quality gate: PASSED (warnings=$warns)"
