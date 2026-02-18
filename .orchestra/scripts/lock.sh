#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
LOCK_DIR="$ROOT/.orchestra/locks"
mkdir -p "$LOCK_DIR"

die() { echo "error: $*" >&2; exit 1; }

lock_file() {
  local name="$1"
  echo "$LOCK_DIR/${name}.lock"
}

is_pid_alive() {
  local pid="$1"
  [ -n "$pid" ] && kill -0 "$pid" 2>/dev/null
}

acquire() {
  local name="$1"
  local file
  file="$(lock_file "$name")"

  if [ -f "$file" ]; then
    local holder_pid
    holder_pid="$(awk -F= '/^pid=/{print $2}' "$file" 2>/dev/null || true)"
    if is_pid_alive "$holder_pid"; then
      die "lock busy: $name (pid=$holder_pid)"
    fi
    rm -f "$file"
  fi

  {
    echo "name=$name"
    echo "pid=$$"
    echo "host=$(hostname)"
    echo "created_at=$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
  } > "$file"

  echo "acquired: $name"
}

release() {
  local name="$1"
  local file
  file="$(lock_file "$name")"

  [ -f "$file" ] || die "lock not found: $name"
  local holder_pid
  holder_pid="$(awk -F= '/^pid=/{print $2}' "$file" 2>/dev/null || true)"

  if [ "$holder_pid" != "$$" ] && is_pid_alive "$holder_pid"; then
    die "lock held by another process: pid=$holder_pid"
  fi

  rm -f "$file"
  echo "released: $name"
}

status() {
  local found=0
  for f in "$LOCK_DIR"/*.lock; do
    [ -e "$f" ] || continue
    found=1
    echo "--- $(basename "$f")"
    cat "$f"
  done
  [ "$found" -eq 1 ] || echo "no locks"
}

cmd="${1:-}"
case "$cmd" in
  acquire) acquire "${2:?lock name required}" ;;
  release) release "${2:?lock name required}" ;;
  status) status ;;
  *) die "usage: $0 {acquire|release|status} <name>" ;;
esac
