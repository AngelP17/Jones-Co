# ORCHESTRA.md

Universal swarm protocol for deterministic multi-agent execution.

## Mission
Use Orchestra to convert a goal into a tracked DAG, route relevant skills, and execute work with explicit state transitions.

## Canonical Paths
- State: `.orchestra/swarm/state.json`
- Skill registry: `.orchestra/swarm/registry.json`
- Council ADRs: `.orchestra/council/adr-*.md`
- Agent task files (v4.2): `.orchestra/swarm/agents/<agent>/tasks.md`
- Artifacts: `.orchestra/artifacts/`
- Locks: `.orchestra/locks/`

## Core Commands
- `.orchestra/scripts/orchestra.sh init "<mission>"`
- `.orchestra/scripts/orchestra.sh registry --refresh`
- `.orchestra/scripts/orchestra.sh plan "<goal>"`
- `.orchestra/scripts/orchestra.sh status`
- `.orchestra/scripts/orchestra.sh next`
- `.orchestra/scripts/orchestra.sh claim <task_id>`
- `.orchestra/scripts/orchestra.sh done <task_id> [needs_review|done]`

## Task Lifecycle
- `ready`: task can be claimed
- `running`: actively in progress
- `needs_review`: implementation complete, awaiting review/council signoff
- `done`: complete and unblocks dependents
- `blocked`: waiting on dependencies

## Execution Contract
1. Plan first. Do not implement against an empty DAG.
2. Claim before editing code.
3. For each task, consult `skill_hints` and use the hinted skills before implementing.
4. Keep edits scoped to the task `files` list unless explicitly required.
5. Transition to `done` only when acceptance criteria are met.
6. If uncertain, mark `needs_review` with notes in `.orchestra/artifacts/`.

## Council Protocol (4.20)
Each ADR should include:
- Harper: repository reconnaissance and risk inventory
- Benjamin: invariants, edge cases, correctness gates
- Lucas: UX/DX consistency and interface clarity
- Conductor: decision synthesis, stop conditions, and final DAG

## Determinism Rules
- No hidden state outside `.orchestra/`.
- Keep status transitions explicit through CLI commands.
- Use idempotent scripts where possible.
- Prefer reproducible outputs over free-form summaries.

## Quality Gates
Run before merge:
- `bash ./.orchestra/scripts/quality-gate.sh quick`
- `bash ./.orchestra/scripts/quality-gate.sh full` (when available)

## Bootstrap Outputs
`bootstrap.sh install` ensures these entrypoints exist (symlink, hardlink, or copy fallback):
- `.cursor/rules/orchestra.md`
- `CLAUDE.md`
- `codex.md`
- `.github/prompts/orchestra.md`
- `.github/copilot-instructions.md`
- `AGENTS.md`

All entrypoints are projections of this file (`ORCHESTRA.md`).
