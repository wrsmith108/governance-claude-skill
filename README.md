# Governance Skill for Claude Code

A [Claude Code](https://claude.ai/code) skill for enforcing engineering standards and code governance. Provides proactive reminders during code reviews and commits.

## Features

- **Proactive Triggers** — Activates on "code review", "commit", "standards", "compliance"
- **Two-Document Model** — Separates CLAUDE.md (operational) from standards.md (policy)
- **Setup Verification** — `governance-check.mjs` validates configuration with actionable fixes
- **Anti-Pattern Tables** — Code quality, documentation, workflow, and testing anti-patterns
- **Pre-Commit Checklist** — Reminds about typecheck, lint, test before commits
- **PR Review Checklist** — Standards for code review (correctness, security, performance)
- **Templates** — Clean starting files for new projects

## Quick Start

### Option A: Claude Plugin (Recommended)

```bash
claude plugin add github:wrsmith108/governance-claude-skill
```

### Option B: Manual Installation

```bash
git clone https://github.com/wrsmith108/governance-claude-skill ~/.claude/skills/governance
```

### Verify Setup

```bash
node scripts/governance-check.mjs
```

## How It Works

When Claude detects trigger phrases like "code review", "commit", "standards", or "compliance", this skill activates and provides:

1. Quick reference to relevant standards
2. Reminder to run `npm run audit:standards`
3. Checklists for PRs and commits
4. Links to authoritative documentation

## The Two-Document Model

This skill enforces a separation of concerns:

| Document | Purpose | Update Frequency |
|----------|---------|------------------|
| **CLAUDE.md** | AI operational context (commands, URLs) | Frequent |
| **standards.md** | Engineering policy (authoritative) | Infrequent |

**Benefits:**
- CLAUDE.md stays lean (better token efficiency)
- standards.md is the single source of truth for policy
- No duplication drift between documents

## Setting Up in Your Project

1. **Create CLAUDE.md** at project root with:
   - Build commands
   - Project structure
   - Cross-references to standards.md

2. **Create docs/architecture/standards.md** with:
   - Code quality standards
   - Testing requirements
   - Workflow processes

3. **Create audit script** for automated compliance:
   ```bash
   # Copy template
   cp templates/audit-standards-template.mjs scripts/audit-standards.mjs

   # Add npm script
   # "audit:standards": "node scripts/audit-standards.mjs"
   ```

4. **Run setup check**:
   ```bash
   node scripts/governance-check.mjs
   ```

## Templates

The `templates/` directory contains clean starting files:

| Template | Purpose |
|----------|---------|
| `standards-template.md` | Engineering standards document |
| `audit-standards-template.mjs` | Configurable compliance checker |

## Governance Check Output

```
🏛️  Governance Setup Check

1. CLAUDE.md (AI Operational Context)
✓ CLAUDE.md exists
✓ Has build commands section
✓ References standards.md
✓ Concise length (452 lines)

2. standards.md (Engineering Policy)
✓ standards.md exists at docs/architecture/
✓ Has Code Quality section
✓ Has Testing section
✓ Has Workflow section

3. Audit Script (Automated Compliance)
✓ npm run audit:standards configured
✓ Audit script exists

4. Architecture Decision Records
✓ docs/adr/ directory exists
✓ ADR template exists

5. Pre-commit Hooks
✓ Husky pre-commit hook configured
✓ Hook runs quality checks

6. Governance Skill
✓ Governance skill installed

Governance Score: 100%
```

## Anti-Patterns Enforced

### Code Quality
| Anti-Pattern | Correct Pattern |
|--------------|-----------------|
| ❌ `any` type | ✅ `unknown` for external data |
| ❌ 600+ line files | ✅ Split at 500 lines |
| ❌ Hardcoded secrets | ✅ Environment variables |

### Workflow
| Anti-Pattern | Correct Pattern |
|--------------|-----------------|
| ❌ Commit to main | ✅ Feature branches with PR |
| ❌ Skip audit | ✅ Run `audit:standards` before commit |
| ❌ Merge without review | ✅ Require approval |

## Contributing

Contributions welcome! Please submit issues and PRs.

## License

MIT License — See [LICENSE](LICENSE)

## Credits

Created for the Claude Code community. Patterns refined through real-world governance of AI-assisted development projects.
