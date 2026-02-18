#!/usr/bin/env bash
set -euo pipefail

# Orchestra CLI wrapper
# Usage:
#   orchestra.sh init <mission>
#   orchestra.sh registry [--refresh]
#   orchestra.sh plan [goal...]
#   orchestra.sh next
#   orchestra.sh claim <task_id>
#   orchestra.sh done <task_id> [needs_review|done]
#   orchestra.sh status
#   orchestra.sh install
#   orchestra.sh verify

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
STATE="$ROOT/.orchestra/swarm/state.json"
REG="$ROOT/.orchestra/swarm/registry.json"
COUNCIL_DIR="$ROOT/.orchestra/council"

mkdir -p "$ROOT/.orchestra"/{council,swarm,artifacts,locks,scripts}

cmd="${1:-}"
shift || true

die(){ echo "error: $*" >&2; exit 1; }

ensure_seed_registry() {
  if [ -f "$REG" ]; then return 0; fi
  cat > "$REG" <<'JSON'
{
  "version": 1,
  "skills_root": "~/.agents/skills",
  "routes": [
    { "when": ["dag","dependencies","planning","decompose","milestone"], "use": ["ralph","workflow-orchestration-patterns","saga-orchestration"] },
    { "when": ["agent","swarm","autonomous","multi-agent","handoff"], "use": ["autonomous-agent-patterns","parallel-agents","multi-agent-patterns","autogpt-agents"] },

    { "when": ["api","contract","rest","graphql","design"], "use": ["api-design-principles","protocol-reverse-engineering","query-builder"] },
    { "when": ["auth","oauth","session","jwt","rbac"], "use": ["auth-implementation-patterns","top-100-web-vulnerabilities-reference"] },

    { "when": ["db","postgres","schema","migration","index","sql"], "use": ["postgresql-table-design","postgresql","database-migration","sql-optimization-patterns"] },
    { "when": ["cache","redis","caching"], "use": ["cache-components","turborepo-caching"] },

    { "when": ["frontend","ui","ux","design system","tailwind"], "use": ["react-ui-patterns","ui-design-system","tailwind-design-system","ui-ux-pro-max","ui-ux-designer"] },
    { "when": ["react","typescript","ts","state"], "use": ["react-expert","react-best-practices","react-state-management","typescript-pro","typescript-advanced-types"] },
    { "when": ["vue"], "use": ["vue-expert"] },

    { "when": ["security","xss","vuln","pentest"], "use": ["frontend-mobile-security-xss-scan","frontend-security-coder","k8s-security-policies","ssh-penetration-testing"] },

    { "when": ["ci","cd","pipeline","deploy","gitops"], "use": ["deployment-pipeline-design","gitops-workflow","workflow-automation","vercel-deploy"] },
    { "when": ["kubernetes","k8s","cluster"], "use": ["kubernetes-specialist","k8s-security-policies","linkerd-patterns"] },
    { "when": ["terraform","iac"], "use": ["terraform-engineer","senior-devops"] },

    { "when": ["observability","metrics","tracing","logs","slo"], "use": ["observability-engineer","performance-engineer","incident-runbook-templates"] },
    { "when": ["incident","oncall","runbook","sev"], "use": ["incident-responder","incident-response-smart-fix","incident-runbook-templates"] },

    { "when": ["rust"], "use": ["rust-engineer","memory-safety-patterns","systems-programming-rust-project"] },
    { "when": ["python","fastapi"], "use": ["python-pro","async-python-patterns","fastapi-templates"] },
    { "when": ["node","nodejs"], "use": ["nodejs-backend-patterns","javascript-pro","modern-javascript-patterns"] },
    { "when": ["go","golang","concurrency"], "use": ["go-concurrency-patterns"] },

    { "when": ["docs","readme","documentation"], "use": ["readme","code-documenter"] },
    { "when": ["testing","e2e","qa"], "use": ["webapp-testing","websocket-engineer","ui-visual-validator"] }
  ]
}
JSON
}

registry_refresh() {
  ensure_seed_registry
  python3 - "$REG" <<'PY'
import json,os,sys
reg_path=sys.argv[1]
with open(reg_path) as f: reg=json.load(f)
skills_root=os.path.expanduser(reg.get("skills_root","~/.agents/skills"))
skills=[]
if os.path.isdir(skills_root):
  for d in sorted(os.listdir(skills_root)):
    p=os.path.join(skills_root,d)
    if os.path.isdir(p) and os.path.isfile(os.path.join(p,"SKILL.md")):
      skills.append(d)
reg["available_skills"]=skills
with open(reg_path,"w") as f: json.dump(reg,f,indent=2)
print(f"refreshed registry: {len(skills)} skills")
PY
}

state_init() {
  local mission="$1"
  ensure_seed_registry
  cat > "$STATE" <<JSON
{
  "version": 1,
  "mission": "${mission}",
  "goal": "",
  "parallelism": 3,
  "created_at": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "tasks": []
}
JSON
  echo "initialized: $STATE"
}

state_status() {
  [ -f "$STATE" ] || die "missing state.json (run init)"
  python3 - "$STATE" <<'PY'
import json,sys
d=json.load(open(sys.argv[1]))
tasks=d.get("tasks",[])
counts={}
for t in tasks:
  counts[t["status"]]=counts.get(t["status"],0)+1
print(f'mission: {d.get("mission")}')
print(f'goal: {d.get("goal","")}')
print(f'parallelism: {d.get("parallelism")}')
print("tasks:", len(tasks), "counts:", counts)
ready=[t["id"] for t in tasks if t["status"]=="ready"]
if ready: print("ready:", ", ".join(ready))
PY
}

state_next() {
  [ -f "$STATE" ] || die "missing state.json (run init)"
  python3 - "$STATE" <<'PY'
import json,sys
d=json.load(open(sys.argv[1]))
ready=[t for t in d.get("tasks",[]) if t.get("status")=="ready"]
for t in ready:
  print(f'{t["id"]}\t{t.get("agent","")}\t{t.get("title","")}')
PY
}

state_claim() {
  local id="$1"
  [ -f "$STATE" ] || die "missing state.json (run init)"
  python3 - "$STATE" "$id" <<'PY'
import json,sys
p,tid=sys.argv[1],sys.argv[2]
d=json.load(open(p))
ok=False
for t in d.get("tasks",[]):
  if t["id"]==tid:
    if t["status"]!="ready":
      raise SystemExit(f"task not ready: {tid} status={t['status']}")
    t["status"]="running"
    ok=True
if not ok: raise SystemExit(f"task not found: {tid}")
json.dump(d,open(p,"w"),indent=2)
print("claimed:",tid)
PY
}

state_done() {
  local id="$1"
  local mode="${2:-done}"
  [ -f "$STATE" ] || die "missing state.json (run init)"
  python3 - "$STATE" "$id" "$mode" <<'PY'
import json,sys
p,tid,mode=sys.argv[1],sys.argv[2],sys.argv[3]
if mode not in ("needs_review","done"):
  raise SystemExit("mode must be needs_review|done")
d=json.load(open(p))
ok=False
for t in d.get("tasks",[]):
  if t["id"]==tid:
    t["status"]=mode
    ok=True
if not ok: raise SystemExit(f"task not found: {tid}")
# unblock dependents if marking done
if mode=="done":
  done={t["id"] for t in d.get("tasks",[]) if t["status"]=="done"}
  for t in d.get("tasks",[]):
    if t["status"]=="blocked":
      deps=t.get("deps",[])
      if all(dep in done for dep in deps):
        t["status"]="ready"
json.dump(d,open(p,"w"),indent=2)
print("updated:",tid,"->",mode)
PY
}

render_agent_task_files() {
  [ -f "$STATE" ] || die "missing state.json (run init)"
  local out_root="$ROOT/.orchestra/swarm/agents"
  mkdir -p "$out_root"

  python3 - "$STATE" "$out_root" <<'PY'
import datetime
import json
import os
import re
import shutil
import sys

state_path, out_root = sys.argv[1], sys.argv[2]
state = json.load(open(state_path))
tasks = state.get("tasks", [])
mission = state.get("mission", "")
goal = state.get("goal", "")

def slug(value: str) -> str:
  s = re.sub(r"[^A-Za-z0-9._-]+", "-", value).strip("-").lower()
  return s or "unassigned"

by_agent = {}
for task in tasks:
  agent = (task.get("agent") or "unassigned").strip() or "unassigned"
  by_agent.setdefault(agent, []).append(task)

os.makedirs(out_root, exist_ok=True)
active_dirs = set()
generated_at = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

for agent, agent_tasks in sorted(by_agent.items()):
  agent_dir = slug(agent)
  active_dirs.add(agent_dir)
  full_dir = os.path.join(out_root, agent_dir)
  os.makedirs(full_dir, exist_ok=True)
  task_file = os.path.join(full_dir, "tasks.md")

  lines = [
    f"# Agent Tasks - {agent}",
    "",
    f"- Mission: {mission}",
    f"- Goal: {goal}",
    f"- Generated: {generated_at}",
    "",
  ]

  for task in agent_tasks:
    deps = ", ".join(task.get("deps", [])) or "none"
    hints = ", ".join(task.get("skill_hints", [])) or "none"
    lines.append(f"## {task.get('id')}: {task.get('title', '')}")
    lines.append(f"- Status: {task.get('status', '')}")
    lines.append(f"- Deps: {deps}")
    lines.append(f"- Council review: {str(task.get('council_review', False)).lower()}")
    lines.append("- Files:")
    if task.get("files"):
      for fp in task["files"]:
        lines.append(f"  - {fp}")
    else:
      lines.append("  - (none)")
    lines.append(f"- Skill hints: {hints}")
    lines.append("")

  with open(task_file, "w") as f:
    f.write("\n".join(lines).rstrip() + "\n")

for entry in os.listdir(out_root):
  full = os.path.join(out_root, entry)
  if os.path.isdir(full) and entry not in active_dirs:
    shutil.rmtree(full)

index_file = os.path.join(out_root, "tasks.md")
index_lines = [
  "# Agent Task Index",
  "",
  f"- Mission: {mission}",
  f"- Goal: {goal}",
  f"- Generated: {generated_at}",
  "",
]
for agent in sorted(by_agent):
  agent_dir = slug(agent)
  agent_tasks = by_agent[agent]
  status_counts = {}
  for t in agent_tasks:
    status = t.get("status", "unknown")
    status_counts[status] = status_counts.get(status, 0) + 1
  counts = ", ".join(f"{k}:{v}" for k, v in sorted(status_counts.items()))
  index_lines.append(f"- [{agent}](./{agent_dir}/tasks.md) ({counts})")
if not by_agent:
  index_lines.append("- (no tasks)")

with open(index_file, "w") as f:
  f.write("\n".join(index_lines).rstrip() + "\n")

print(f"generated agent task files: {len(by_agent)}")
PY
}

write_adr_template() {
  local mission="$1"
  local goal="$2"
  mkdir -p "$COUNCIL_DIR"
  local ts
  ts="$(date -u +"%Y%m%d-%H%M%S")"
  local adr="$COUNCIL_DIR/adr-${ts}.md"
  cat > "$adr" <<MD
# ADR - ${mission}
Created: $(date -u +"%Y-%m-%d %H:%M:%SZ")

## Goal
${goal}

## Council Briefs (4.20 method)
### Harper (Research & Recon)
- Repo conventions:
- Prior art:
- Risks / gotchas:

### Benjamin (Logic & Correctness)
- Invariants:
- Edge cases:
- DAG correctness notes:
- Quality gates:

### Lucas (UX & Product)
- DX/UX expectations:
- API ergonomics:
- Naming & consistency:

### Conductor (Synthesis)
- Decision:
- Stop conditions:
- Task plan summary:

## DAG
(See .orchestra/swarm/state.json)

MD
  echo "wrote ADR: $adr"
}

plan_generate() {
  ensure_seed_registry
  [ -f "$STATE" ] || die "missing state.json (run init)"
  local goal="${*:-}"
  python3 - "$STATE" "$REG" "$goal" <<'PY'
import json,sys

state_path, reg_path, goal = sys.argv[1], sys.argv[2], sys.argv[3].strip()
state=json.load(open(state_path))
reg=json.load(open(reg_path))

mission=state.get("mission","mission")
if not goal:
  goal = state.get("goal","").strip() or mission

state["goal"]=goal

text = (mission + " " + goal).lower()

def has_any(*words):
  return any(w in text for w in words)

# Heuristic intent flags (conservative, but useful)
need_frontend = has_any("ui","frontend","react","typescript","tailwind","ux","dashboard","page")
need_backend  = has_any("api","backend","service","endpoint","webhook","worker","graphql","rest")
need_db       = has_any("db","database","postgres","schema","migration","sql","index")
need_auth     = has_any("auth","login","oauth","jwt","session","rbac","permission")
need_obs      = has_any("observability","metrics","tracing","logs","slo","monitoring")
need_ci       = has_any("ci","cd","pipeline","deploy","release","gitops","vercel")
need_security = has_any("security","xss","vuln","pentest","threat")
need_tests    = has_any("test","testing","e2e","qa","vitest","cypress","playwright")

# Default skeleton always includes planning + docs
# DAG shape:
# 0) council-adr (done manually, but we represent it)
# 1) contracts (API/data contracts) -> 2) db (if needed) -> 3) backend -> 4) frontend -> 5) tests -> 6) obs/ci/docs

tasks=[]

def route_skills(task_text):
  """Attach skills from registry routes by keyword match across goal+task."""
  tt=(goal+" "+task_text).lower()
  skills=[]
  for r in reg.get("routes",[]):
    when=[w.lower() for w in r.get("when",[])]
    if any(w in tt for w in when):
      for s in r.get("use",[]):
        if s not in skills:
          skills.append(s)
  # Always include ralph for planning-ish tasks
  if any(x in tt for x in ["dag","plan","dependencies","orchestr"]):
    if "ralph" not in skills:
      skills.insert(0,"ralph")
  return skills

def add_task(tid,title,agent,deps,status="blocked",files=None,review=False):
  tasks.append({
    "id": tid,
    "title": title,
    "agent": agent,
    "deps": deps,
    "status": status,
    "files": files or [],
    "skill_hints": route_skills(title),
    "council_review": review,
    "retries": 0
  })

# Always model council step (acts as a barrier)
add_task("council","Council ADR + DAG plan","grok-conductor",[], "ready",
         [".orchestra/council/*",".orchestra/swarm/state.json"], review=False)

# Contract step is usually useful if backend/db/frontend exist
if need_backend or need_db or need_frontend or need_auth:
  add_task("contracts","Define data/API contracts + acceptance criteria","benjamin",
           ["council"], "blocked",
           [".orchestra/artifacts/*",".orchestra/swarm/state.json"], review=True)

if need_db:
  add_task("db","Create schema + migration plan","sre-core",
           ["contracts"], "blocked",
           ["db/migrate/*","schema.sql","schema.rb","migrations/*"], review=False)

if need_auth:
  add_task("auth","Auth model + threat notes + integration points","rust-backend" if need_backend else "sre-core",
           ["contracts"], "blocked",
           ["src/**","app/**","config/**"], review=True)

if need_backend:
  deps=["contracts"]
  if need_db:
    deps.append("db")
  if need_auth:
    deps.append("auth")
  add_task("backend","Implement backend endpoints + business logic","rust-backend",
           deps, "blocked",
           ["src/**","app/**","routes/**","Cargo.toml","Gemfile","package.json"], review=True)

if need_frontend:
  deps=["contracts"]
  if need_backend:
    deps.append("backend")
  add_task("frontend","Implement UI + types + state + integration","react-frontend",
           deps, "blocked",
           ["app/**","src/**","frontend/**","package.json","tsconfig.json"], review=True)

# Tests almost always beneficial when backend/frontend present
if need_tests or need_backend or need_frontend:
  deps=[]
  if need_backend:
    deps.append("backend")
  if need_frontend:
    deps.append("frontend")
  if not deps:
    deps=["contracts"]
  add_task("tests","Add unit/integration/e2e tests + assertions","qa-automation",
           deps, "blocked",
           ["test/**","tests/**","spec/**","cypress/**","playwright/**"], review=True)

if need_obs:
  deps=[]
  if need_backend:
    deps.append("backend")
  if not deps:
    deps=["contracts"]
  add_task("observability","Add metrics/logging/tracing hooks + dashboards/runbooks","devops-bridge",
           deps, "blocked",
           [".orchestra/artifacts/*","config/**","deploy/**"], review=False)

if need_ci:
  deps=[]
  if need_backend:
    deps.append("backend")
  if need_frontend:
    deps.append("frontend")
  if not deps:
    deps=["contracts"]
  add_task("ci","CI/CD wiring (lint/test/build)","devops-bridge",
           deps, "blocked",
           [".github/**",".gitlab-ci.yml","ci/**","deploy/**"], review=False)

if need_security:
  deps=[]
  if need_backend:
    deps.append("backend")
  if need_frontend:
    deps.append("frontend")
  if not deps:
    deps=["contracts"]
  add_task("security","Security scan + mitigations","qa-automation",
           deps, "blocked",
           [".orchestra/artifacts/*","config/**","src/**","app/**"], review=True)

add_task("docs","Update README/docs + usage notes","devops-bridge",
         ["tests"] if any(t["id"]=="tests" for t in tasks) else ["contracts"],
         "blocked",
         ["README.md","docs/**",".orchestra/artifacts/*"], review=False)

# Mark ready tasks whose deps are done/ready. For init, only council is ready.
state["tasks"]=tasks
json.dump(state,open(state_path,"w"),indent=2)
print(f"planned {len(tasks)} tasks into {state_path}")
PY
}

case "$cmd" in
  init)
    state_init "${1:?mission required}"
    ;;
  registry)
    ensure_seed_registry
    if [ "${1:-}" = "--refresh" ]; then
      registry_refresh
    else
      cat "$REG"
    fi
    ;;
  plan)
    # plan [goal...]
    goal_input="${*:-}"
    plan_generate "$goal_input"
    # read mission/goal back to create ADR template
    mission="$(python3 -c 'import json,sys;print(json.load(open(sys.argv[1])).get("mission",""))' "$STATE")"
    goal="$(python3 -c 'import json,sys;print(json.load(open(sys.argv[1])).get("goal",""))' "$STATE")"
    write_adr_template "$mission" "$goal"
    render_agent_task_files
    echo "tip: open the ADR, fill Council briefs, then start claiming tasks."
    ;;
  next)
    state_next
    ;;
  claim)
    state_claim "${1:?task id required}"
    render_agent_task_files
    ;;
  done)
    state_done "${1:?task id required}" "${2:-done}"
    render_agent_task_files
    ;;
  status)
    state_status
    ;;
  install)
    bash "$ROOT/.orchestra/scripts/bootstrap.sh" install
    ;;
  verify)
    bash "$ROOT/.orchestra/scripts/bootstrap.sh" verify
    ;;
  *)
    die "usage: $0 {init|registry|plan|next|claim|done|status|install|verify}"
    ;;
esac
