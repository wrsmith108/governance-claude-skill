# Retrospective Report Template

**Location**: `docs/retro/YYYY-MM-DD-<topic-slug>.md`

**Example filename**: `2025-01-24-auth-migration-retro.md`

---

## Template

```markdown
# <Topic> Retrospective

**Date:** YYYY-MM-DD
**Duration:** N waves / N sessions
**Issues completed:** <issue tracker reference, if any>
**PRs updated:** #N
**Branch:** `feature/branch-name`

---

## What Went Well

1. (e.g., "Isolated branch - clean separation from the main line")
2. (e.g., "Research before coding - context gathered before the first edit")
3.

---

## What Went Wrong

1. (e.g., "Build environment needed a rebuild after a dependency install")
2. (e.g., "Context was lost mid-session")

---

## Metrics

| Metric | Value |
|--------|-------|
| Files modified | N |
| Tests passing | N/N |
| Code review issues found | N |
| Code review issues fixed | N |

---

## Breaking Changes (if applicable)

| Component | Breaking Change | Resolution |
|-----------|-----------------|------------|
| Package/API | What changed | How we handled it |

---

## Code Review Findings (per wave)

### Wave N: <Description>

| Finding | Severity | Resolution |
|---------|----------|------------|
| Description | Critical/High/Medium/Low | Fixed (abc1234) / Excepted / Pre-existing |

---

## Sweeps Performed

Required whenever the PR diff adds or changes a correctness-bearing guard. One row per guard. An empty section on a guard-hardening PR is itself a finding: a sweep that found nothing and a sweep that never ran read identically without this table. Fetch the sweep from the PR description if that is where it was recorded.

| Guard | Command run | Result set | Disposition |
|-------|-------------|------------|-------------|
| `assertSafePath` | `grep -rn 'writeFile(' src --include='*.ts'` | 2 sites | 2 fixed (commit abc1234) |

State "no siblings exist" as a row rather than omitting it. Write `N/A — no guard changed` when the trigger genuinely is not present, so a skip is visible rather than inferred from silence.

---

## Waves Summary (if multi-wave)

| Wave | Issue tracker reference, if any | Scope | Commits |
|------|---------------------------------|-------|---------|
| 1 | <reference> | Description | abc1234 |

---

## Key Lessons

1. (Actionable, e.g., "Query the package registry for versions - don't assume version numbers")
2.

---

## Recommendations for Future Work

1. (Forward-looking, e.g., "Run the full pre-push checks between waves")
2.
```

---

## Section Descriptions

| Section | Required | Description |
|---------|----------|-------------|
| **Header** | Yes | Date, duration, issues (tracker reference, if any), PRs, branch |
| **What Went Well** | Yes | Minimum 2 items |
| **What Went Wrong** | Yes | Be honest, even if brief |
| **Metrics** | Yes | Quantitative outcomes |
| **Breaking Changes** | If applicable | Document any breaking changes |
| **Code Review Findings** | If applicable | Per-wave breakdown |
| **Sweeps Performed** | Yes | One row per changed guard (Guard, Command, Result Set, Disposition), or `N/A — no guard changed` |
| **Waves Summary** | If multi-wave | Links issues (if tracked) to commits |
| **Key Lessons** | Yes | Actionable learnings |
| **Recommendations** | Yes | Forward-looking guidance |

## Completion Checklist

Before saving your retrospective:

- [ ] All completed issues listed with their tracker reference, if any
- [ ] PRs and branch documented
- [ ] "What Went Well" has at least 2 items
- [ ] "What Went Wrong" is honest (even if brief)
- [ ] Metrics are accurate (including code review findings)
- [ ] Key lessons are actionable
- [ ] Breaking changes documented (if applicable)
- [ ] `## Sweeps Performed` section filled in (rows, or `N/A — no guard changed`)
- [ ] **Report written to `docs/retro/`**

## Common Patterns

These are non-normative examples of how to fill in fields.

### Duration Formats
- Single session: `1 session`
- Multiple sessions: `3 sessions`
- Wave-based: `2 waves`
- Mixed: `2 waves / 4 sessions`

### Metric Examples
- Files modified: `12`
- Tests passing: `340/340`
- Code review issues found: `5`
- Code review issues fixed: `5`

---

**See also**: [SKILL.md](../SKILL.md) | [code-review-template.md](code-review-template.md)
