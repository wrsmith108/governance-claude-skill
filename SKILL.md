---
name: governance
version: "2.2.0"
description: "Engineering standards and code governance enforcement. Triggers during code reviews, commits, and standards discussions. Delegates the review to a single built-in reviewer subagent so intermediate output stays out of the main conversation."
category: development
tags:
  - governance
  - code-review
  - standards
  - compliance
  - quality
  - automation
author: wrsmith108
repository: https://github.com/wrsmith108/governance-claude-skill
license: MIT
triggers:
  keywords:
    - code review
    - review this
    - commit
    - before I merge
    - standards
    - compliance
    - code quality
    - best practices
    - retro
    - retrospective
  explicit:
    - /governance
    - /review
    - /retro
    - /audit
delegates_to: reviewer
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Grep
  - Glob
  - Task
---

# Governance Skill

Enforces engineering standards and code quality policies. The review runs in one delegated `reviewer` subagent, which keeps intermediate output out of the main conversation.

> **Standards Document**: [standards.md](standards.md) (starter default — replace with your own)
> **Audit Script**: `npm run audit:standards`
> **Full Protocol**: [agent-prompt.md](agent-prompt.md)

---

## Execution Model (v2.2)

**Type**: Delegated Execution — delegates to ONE built-in `reviewer` subagent.

This skill uses the `reviewer` subagent type (available in all Claude Code installations — no custom agent required):

1. **Spawn** a single reviewer agent
2. **Delegate** the governance task, telling it to read `agent-prompt.md` in full first
3. **Await** completion
4. **Report** the structured summary to the user

### Why Delegate

The reviewer runs commands, reads files and applies fixes in its own context. Only the structured summary returns to the main conversation, so the main thread does not carry the review's intermediate output.

---

## What's Checked

The full rules live in `agent-prompt.md`. The reviewer covers:

- **Approach validation** — is the chosen approach sound before the details are reviewed
- **Type safety** — no unjustified `any`, explicit types at boundaries
- **Constant and mock consistency** — one canonical home per shared constant; mocks match real shapes
- **External-API contracts** — and anti-false-green mocks that pass whatever the code does
- **Shared-state and concurrency audit** — five checks: global reads outside the producer, re-firing lifecycle listeners, missing re-fire tests, double reads of a module-level singleton across an `await`, and unguarded async-completion writes to shared state
- **Duplicate security gates and sibling implementations** — the same guard or logic must not diverge across copies
- **Observation and gate correctness in verification code** — a check must be able to fail, and must examine what it claims to
- **Zero deferral** — every finding is fixed now, with narrow, documented exceptions
- **String-replacement sweeps** — scripted edits are re-checked for dropped or mangled text
- **Severity guide** — how findings are classified
- **Retrospectives** — structured post-merge review

---

## How to Invoke

When this skill is triggered, read `agent-prompt.md` for the full protocol, then delegate:

### Code Review
```javascript
Task({
  description: "Governance code review",
  prompt: `Read <skill-dir>/agent-prompt.md in full before doing anything, and follow it.
(<skill-dir> is the directory containing this SKILL.md, e.g. ~/.claude/skills/governance.)
Review the following files for standards compliance:
- [list files or PR description]

Execute full code review workflow:
1. Run standards audit
2. Check each file against standards.md
3. Fix ALL issues immediately (zero deferral)
4. Return structured summary`,
  subagent_type: "reviewer"
})
```

### Pre-Commit Check
```javascript
Task({
  description: "Pre-commit governance",
  prompt: `Read <skill-dir>/agent-prompt.md in full before doing anything, and follow it.
(<skill-dir> is the directory containing this SKILL.md, e.g. ~/.claude/skills/governance.)
Run pre-commit governance checks:
1. typecheck, lint, format:check, test
2. Check for untracked source files
3. Return pass/fail with specific failures`,
  subagent_type: "reviewer"
})
```

### Retrospective
```javascript
Task({
  description: "Run retrospective",
  prompt: `Read <skill-dir>/agent-prompt.md in full before doing anything, and follow it.
(<skill-dir> is the directory containing this SKILL.md, e.g. ~/.claude/skills/governance.)
Run retrospective for [topic/sprint]:
1. Analyze completed issues
2. Gather metrics
3. Write report
4. Return summary`,
  subagent_type: "reviewer"
})
```

---

## Quick Reference

### Pre-Commit Checklist

```
[ ] npm run typecheck
[ ] npm run lint
[ ] npm run test
[ ] npm run audit:standards
[ ] No console.log statements
[ ] No hardcoded secrets
```

### Compliance Check

```bash
npm run audit:standards
node scripts/governance-check.mjs
```

---

*Full agent protocol, anti-pattern tables, and output format in [agent-prompt.md](agent-prompt.md)*
*Version 2.2.0 — Expanded review rules, code-review and retro templates, dispatcher passes the protocol path*
