#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
SOURCE="$ROOT/ORCHESTRA.md"

TARGETS=(
  "$ROOT/.cursor/rules/orchestra.md"
  "$ROOT/CLAUDE.md"
  "$ROOT/codex.md"
  "$ROOT/.github/prompts/orchestra.md"
  "$ROOT/.github/copilot-instructions.md"
  "$ROOT/AGENTS.md"
)

die() { echo "error: $*" >&2; exit 1; }

ensure_dirs() {
  mkdir -p \
    "$ROOT/.cursor/rules" \
    "$ROOT/.github/prompts" \
    "$ROOT/.orchestra/scripts" \
    "$ROOT/.orchestra/swarm" \
    "$ROOT/.orchestra/council" \
    "$ROOT/.orchestra/artifacts" \
    "$ROOT/.orchestra/locks"
}

relpath() {
  python3 - "$1" "$2" <<'PY'
import os,sys
src,dst_dir=sys.argv[1],sys.argv[2]
print(os.path.relpath(src,dst_dir))
PY
}

link_or_copy() {
  local src="$1"
  local dst="$2"
  local dstdir
  dstdir="$(dirname "$dst")"
  mkdir -p "$dstdir"
  rm -f "$dst"

  local rel
  rel="$(relpath "$src" "$dstdir")"

  if ln -s "$rel" "$dst" 2>/dev/null; then
    echo "linked: $dst -> $rel"
    return 0
  fi

  if ln "$src" "$dst" 2>/dev/null; then
    echo "hardlinked: $dst"
    return 0
  fi

  cp "$src" "$dst"
  echo "copied: $dst"
}

verify_target() {
  local src="$1"
  local dst="$2"

  if [ ! -e "$dst" ] && [ ! -L "$dst" ]; then
    echo "missing: $dst"
    return 1
  fi

  if [ -L "$dst" ]; then
    local target
    target="$(readlink "$dst" || true)"
    if [ -n "$target" ] && [ -e "$dst" ]; then
      echo "ok (symlink): $dst -> $target"
      return 0
    fi
    echo "broken symlink: $dst"
    return 1
  fi

  if cmp -s "$src" "$dst"; then
    echo "ok (content): $dst"
    return 0
  fi

  echo "content mismatch: $dst"
  return 1
}

cmd="${1:-}"

case "$cmd" in
  install)
    ensure_dirs
    [ -f "$SOURCE" ] || die "missing $SOURCE"

    for t in "${TARGETS[@]}"; do
      link_or_copy "$SOURCE" "$t"
    done

    chmod +x "$ROOT/.orchestra/scripts"/*.sh 2>/dev/null || true
    echo "install complete"
    ;;

  verify)
    ensure_dirs
    [ -f "$SOURCE" ] || die "missing $SOURCE"

    failed=0
    for t in "${TARGETS[@]}"; do
      verify_target "$SOURCE" "$t" || failed=$((failed+1))
    done

    for req in bootstrap.sh lock.sh quality-gate.sh orchestra.sh; do
      p="$ROOT/.orchestra/scripts/$req"
      if [ -f "$p" ] && [ -x "$p" ]; then
        echo "ok (executable): $p"
      else
        echo "missing or non-executable: $p"
        failed=$((failed+1))
      fi
    done

    if [ "$failed" -gt 0 ]; then
      die "verify failed ($failed issues)"
    fi
    echo "verify ok"
    ;;

  *)
    die "usage: $0 {install|verify}"
    ;;
esac
