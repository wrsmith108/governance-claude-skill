# Changelog

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

---

## Future Improvements (Planned)

### [1.1.0] - TBD
- [ ] Hook integration for post-edit suggestions
- [ ] Project-type detection (Node.js, Python, Go) for tailored checks
- [ ] Integration with CI/CD pipelines

---

## Template

Use this template for future changelog entries:

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
- New features

### Changed
- Updates to existing features

### Fixed
- Bug fixes

### Lesson Learned
Key insight that led to this change — helps future maintainers understand the "why"
```
