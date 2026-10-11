# Code Review Report Template

**Suggested location**: `docs/code_review/YYYY-MM-DD-<brief-slug>.md` (a suggestion; use your project's docs directory if it has one)

**Example filename**: `2025-01-24-auth-refactor-review.md`

---

## Template

```markdown
# Code Review: <Title>

**Date**: YYYY-MM-DD
**Reviewer**: <who or what performed the review>
**Related issues**: <issue tracker reference, if a tracker is used>
**Files Changed**: N files
**Execution environment validated**: Yes/No (<container, venv, nvm, or "host">)

## Summary

Brief description of what was reviewed.

## Pre-Review Checks

| Check | Status |
|-------|--------|
| `npm run typecheck` | PASS/FAIL |
| `npm run lint` | PASS/FAIL |
| `npm run test` | PASS/FAIL |
| `npm run audit:standards` (required if the project has an audit script) | PASS/FAIL/N/A (no audit script) |

## Files Reviewed

| File | Lines Changed | Status | Notes |
|------|---------------|--------|-------|
| `path/to/file.ts` | +X/-Y | PASS/FAIL | Brief note |

## Sweeps Performed

Required whenever the diff adds or changes a correctness-bearing guard. One row per guard. An empty section on a guard-hardening diff is itself a finding: a sweep that found nothing and a sweep that never ran read identically without this table.

| Guard | Command run | Result set | Disposition |
|-------|-------------|------------|-------------|
| `assertSafePath` | `grep -rn 'writeFile(' src --include='*.ts'` | 2 sites | 2 fixed (commit abc1234) |

State "no siblings exist" as a row rather than omitting it. That is a finding of fact and the cheapest one to record. Write `N/A — no guard changed in this diff` when the trigger genuinely is not present, so a skip is visible rather than inferred from silence.

## Findings

| Finding | Severity | Standard | Status |
|---------|----------|----------|--------|
| Description | Critical/High/Medium/Low | §N | Fixed (abc1234) / Excepted / Pre-existing |

## CI Impact Assessment

- [ ] No new ESLint warnings introduced
- [ ] TypeScript strict mode satisfied
- [ ] Tests meet the project's coverage threshold in `standards.md`
- [ ] No native module changes requiring rebuild

## Overall Result

**PASS/FAIL**: Summary of review outcome.

## Process Recommendations

- Recommendation 1
- Recommendation 2
```

---

## Field Descriptions

| Field | Required | Description |
|-------|----------|-------------|
| **Date** | Yes | Review date (YYYY-MM-DD) |
| **Reviewer** | Yes | Who performed the review |
| **Related issues** | No | Issue tracker reference, if a tracker is used |
| **Files Changed** | Yes | Count of files reviewed |
| **Execution environment validated** | Yes | Whether commands ran in the project's documented execution environment (container, venv, nvm, etc.) |
| **Pre-Review Checks** | Yes | typecheck, lint and test always run; `audit:standards` is required whenever the project has an audit script, otherwise record `N/A (no audit script)` |
| **Sweeps Performed** | Yes | One row per changed guard, or the `N/A` line |
| **Findings** | Yes | Even if empty, document it |
| **CI Impact Assessment** | Yes | All 4 checkboxes must be addressed |
| **Overall Result** | Yes | PASS only when the gate below holds |
| **Process Recommendations** | No | Improvements to process, tooling or workflow. Code findings never go here; they go in Findings and are fixed |

## Finding Statuses

| Status | Meaning |
|--------|---------|
| **Fixed (<commit>)** | Fixed in this change; cite the commit hash in lowercase hex, e.g. `Fixed (abc1234)` |
| **Excepted** | Architectural scope: a minimal fix was applied now and the remainder is recorded, with the reason written in the PR description |
| **Pre-existing** | Unrelated to this change: recorded (in the tracker if one is connected, otherwise in this report), with the reason written in the PR description |

**Gate**: the review passes only when every Findings row's status is exactly `Fixed (<commit>)`, `Excepted` or `Pre-existing`. Check it mechanically (the command examines only the `## Findings` section, so the other tables in the report cannot trigger it; the whole cell must match, so "Fixed later" fails; it prints each offending row and exits 1, and prints nothing and exits 0 when the gate holds):

```bash
awk '/^## /{f=($0 ~ /^## Findings[ \t]*$/)} f && /^\|/ {if(++n>2){split($0,c,"|"); if(c[5] !~ /^ *(Fixed \([0-9a-f]+\)|Excepted|Pre-existing) *$/){print; bad=1}}} END{exit bad}' <report>.md
```

## Severity Guide

| Severity | Action | Examples |
|----------|--------|----------|
| Critical | Fix immediately (blocking) | Security vulnerabilities, data loss risks |
| High | Fix immediately (blocking) | Missing tests, type safety issues |
| Medium | Fix immediately | Architecture issues, style problems |
| Low | Fix immediately | Minor refactors, documentation gaps |

## Standard References

The **Standard** column (§N) references sections of the project's `standards.md`:
- §1 - Code Quality
- §2 - Testing
- §3 - Workflow
- §4 - Security

---

**See also**: [SKILL.md](../SKILL.md) | [retro-template.md](retro-template.md)
