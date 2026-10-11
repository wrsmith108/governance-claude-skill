# Governance Skill for Claude Code

An agent skill for enforcing engineering standards and code governance. Provides proactive reminders during code reviews and commits.

## Features

- **Proactive Triggers** — Activates on "code review", "commit", "standards", "compliance", "retro",
- **Two-Document Model** — Separates CLAUDE.md (operational) from standards.md (policy)
- **Setup Verification** — `scripts/governance-check.mjs` validates configuration with actionable fixes
- **Anti-Pattern Tables** — Code quality, documentation, workflow, and testing anti-patterns
- **Deep Review Rules** (v2.2) — approach validation, type safety, constant and mock consistency, external-API contracts and anti-false-green mocks, shared-state/concurrency audit, duplicate security gates, verification-code correctness, zero deferral, string-replacement sweeps, severity guide, retrospectives
- **Report Templates** (v2.2) — `code-review-template.md` and `retro-template.md`
- **Pre-Commit Checklist** — Reminds about typecheck, lint, test before commits
- **PR Review Checklist** — Standards for code review (correctness, security, performance)
- **Ready-to-Use Default** — `standards.md` works out of the box; extend with your own rules
- **No Custom Agent Required** — Uses the built-in `reviewer` subagent type (v2.1+; protocol expanded in v2.2)

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

The skill delegates to the built-in `reviewer` subagent (one subagent, not several), so the review's intermediate output stays out of the main conversation.

## File Structure

```
governance-claude-skill/
├── .claude/
│   └── agents/
│       └── governance-specialist.md    # thin pointer to agent-prompt.md
├── .claude-plugin/
│   └── plugin.json                    # Claude plugin manifest
├── scripts/
│   └── governance-check.mjs           # setup verification script
├── templates/
│   ├── standards-template.md          # full-featured standards template
│   ├── code-review-template.md        # code review report template
│   ├── retro-template.md              # retrospective report template
│   └── audit-standards-template.mjs   # configurable audit script
├── agent-prompt.md                    # full agent protocol
├── SKILL.md                           # thin dispatcher (v2.2.0)
├── standards.md                       # minimal working default
├── package.json                       # package metadata and published file list
├── CHANGELOG.md                       # version history
├── LICENSE                            # MIT license
└── README.md                          # this file
```

**Note**: `.claude/agents/governance-specialist.md` is shipped and listed in `package.json`, so anyone invoking it keeps working. It is a thin pointer that tells the agent to read and follow `agent-prompt.md`, the same protocol the skill uses. The skill itself delegates to the built-in `reviewer` subagent and does not require it.

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

### Review Depth (v2.2)
| Anti-Pattern | Correct Pattern |
|--------------|-----------------|
| ❌ Mock that passes whatever the code does | ✅ Mocks match the real external contract |
| ❌ Same security gate copied and diverging | ✅ One implementation, or siblings kept in sync |
| ❌ Verification that cannot fail | ✅ Checks that observe what they claim |
| ❌ Findings left for later | ✅ Fix now, or record a documented exception |

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
