# Changelog

## [2.1.0] - 2026-02-26

### Changed
- **Structural flattening**: Removed redundant `skills/governance/` nested directory. The repo root IS the skill — matches how Skillsmith installs to `~/.claude/skills/governance/`
- **Thin dispatcher pattern**: `SKILL.md` is now a thin orchestrator (~60 lines); full agent protocol extracted to new `agent-prompt.md`
- **`delegates_to` updated**: Changed from custom `governance-specialist` to built-in `reviewer` subagent type — works in all Claude Code installations without any custom agent setup
- **Scripts path corrected**: `scripts/governance-check.mjs` is now at repo root `scripts/` (was nested at `skills/governance/scripts/`)

### Added
- `agent-prompt.md`: Full governance agent protocol (operating instructions, task types, anti-pattern tables, output format)
- `standards.md`: Minimal working default standards document — install and go. Replace/extend with project-specific rules. Full template still available at `templates/standards-template.md`
- `scripts/governance-check.mjs` **now checks** for `standards.md` existence and reports a clear failure with copy instructions if missing

### Fixed
- Broken skill on fresh install: `standards.md` was only a template, not a ready-to-use file — new installs no longer start broken
- `governance-specialist` subagent not portable: replaced with built-in `reviewer` type

### Lesson Learned
Providing only a template for a required dependency (standards.md) means the skill is broken out of the box. A minimal working default is better than a comprehensive template that never gets created.

---

## [2.0.1] - 2026-02-10

### Fixed
- Corrected script invocation paths to use `skills/governance/scripts/` nested directory structure instead of flat `scripts/`

## [2.0.0] - 2026-01-28

### Breaking Changes
- Refactored to delegated execution model with `governance-specialist` subagent
- Skill now acts as orchestrator, delegating verbose operations to parallel agent

### Added
- `governance-specialist` subagent in `.claude/agents/` for parallel execution
- `delegates_to` field in SKILL.md frontmatter
- "How to Invoke" section with Task tool patterns
- Token efficiency comparison (70-90% savings)
- Zero Deferral Policy - all issues fixed immediately
- Structured output format for specialist responses

### Changed
- Updated triggers to include retrospective support
- Added explicit commands: `/governance`, `/review`, `/retro`, `/audit`
- Enhanced anti-pattern documentation

All notable changes to this skill will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-12-27

### Added
- **Initial Release** — Governance skill for Claude Code projects
- **SKILL.md** — Core skill definition with triggers for code review and commits
- **governance-check.mjs** — Setup verification script with actionable fix instructions
- **Anti-Pattern Tables** — Code quality, documentation, workflow, and testing anti-patterns
- **Quick Start Section** — First-time setup guide at top of SKILL.md
- **allowed-tools Frontmatter** — Explicit tool dependencies (Bash, Read, Grep, Glob)
- **Templates** — Reusable starting files:
  - `templates/standards-template.md` — Clean standards template
  - `templates/audit-standards-template.mjs` — Configurable audit script
- **Two-Document Model** — Separation of concerns between CLAUDE.md (operational) and standards.md (policy)
- **Trigger Phrases** — Skill activates on "code review", "commit", "standards", "compliance", "before I merge"
- **Pre-Commit Checklist** — Reminder before commits
- **PR Review Checklist** — Standards for code review

### Lesson Learned
Governance documentation tends to grow in CLAUDE.md, causing context bloat. Extracting to a skill keeps CLAUDE.md lean while providing proactive enforcement during high-stakes activities (commits, PRs).
