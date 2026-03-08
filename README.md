# Governance Skill for Claude Code

An agent skill for enforcing engineering standards and code governance. Provides proactive reminders during code reviews and commits.

## Features

- **Proactive Triggers** — Activates on "code review", "commit", "standards", "compliance", "retro",
- **Two-Document Model** — Separates CLAUDE.md (operational) from standards.md (policy)
- **Setup Verification** — `scripts/governance-check.mjs` validates configuration with actionable fixes
- **Anti-Pattern Tables** — Code quality, documentation, workflow, and testing anti-patterns
- **Pre-Commit Checklist** — Reminds about typecheck, lint, test before commits
- **PR Review Checklist** — Standards for code review (correctness, security, performance)
- **Ready-to-Use Default** — `standards.md` works out of the box; extend with your own rules
- **No Custom Agent Required** — Uses the built-in `reviewer` subagent type (v2.1+)

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

When your agent (such as Claude) detects trigger phrases like "code review", "commit", "standards", or "compliance", this skill activates and provides:

1. Quick reference to relevant standards
2. Reminder to run `npm run audit:standards`
3. Checklists for PRs and commits
4. Links to authoritative documentation

The skill delegates to the built-in `reviewer` subagent for context efficiency (70–90% token savings vs. inline execution).

## File Structure

```
governance-claude-skill/
├── .claude/
│   └── agents/
│       └── governance-specialist.md    # repo-local development agent
├── scripts/
│   └── governance-check.mjs           # setup verification script
├── templates/
│   ├── standards-template.md          # full-featured standards template
│   └── audit-standards-template.mjs   # configurable audit script
├── agent-prompt.md                    # full agent protocol
├── SKILL.md                           # thin dispatcher (v2.1.0)
└── standards.md                       # minimal working default
```

**Note**: `.claude/agents/governance-specialist.md` is kept for repo-local development use only. It is NOT required for the skill to work — the skill uses the built-in `reviewer` subagent type.

## The Two-Document Model

| Document | Purpose | Update Frequency |
|----------|---------|------------------|
| **CLAUDE.md** | AI operational context (commands, URLs) | Frequent |
| **standards.md** | Engineering policy (authoritative) | Infrequent |

**Benefits:**
- CLAUDE.md stays lean (better token efficiency)
- standards.md is the single source of truth for policy

## Setting Up in Your Project

1. **Install the skill** (see Quick Start above)

2. **Copy the starter standards.md** to your project:
   ```bash
   cp ~/.claude/skills/governance/standards.md standards.md
   # Or to the traditional location:
   cp ~/.claude/skills/governance/standards.md docs/architecture/standards.md
   ```
   Edit it with your project-specific rules. Full template at `templates/standards-template.md`.

3. **Add CLAUDE.md** at project root with build commands and a cross-reference:
   ```markdown
   > **Standards**: [standards.md](standards.md)
   ```

4. **Create audit script** for automated compliance:
   ```bash
   cp ~/.claude/skills/governance/templates/audit-standards-template.mjs scripts/audit-standards.mjs
   # Add to package.json: "audit:standards": "node scripts/audit-standards.mjs"
   ```

5. **Run setup check**:
   ```bash
   node scripts/governance-check.mjs
   ```

## Governance Check Output

```
🏛️  Governance Setup Check

1. CLAUDE.md (AI Operational Context)
✓ CLAUDE.md exists
✓ Has build commands section
✓ References standards.md
✓ Concise length (452 lines)

2. standards.md (Engineering Policy)
✓ standards.md found at root
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
| ❌ Defer issues | ✅ Fix immediately |

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for full history.

## Contributing

Contributions welcome! Please submit issues and PRs.

## License

MIT License — See [LICENSE](LICENSE)

## Credits

Created for the Claude Code community. Patterns refined through real-world governance of AI-assisted development projects.
