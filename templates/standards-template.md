# Engineering Standards

**Version**: 1.0
**Status**: Draft
**Owner**: [Your Name / Role]

---

## Executive Summary

This document establishes the engineering standards for [PROJECT_NAME]. These standards are optimized for:

- **[Team size]** (e.g., small team efficiency)
- **[Development style]** (e.g., agentic development with Claude Code)
- **[Timeline]** (e.g., rapid MVP delivery)
- **[Sustainability]** (e.g., long-term maintainability)

---

## 1. Code Quality

### 1.1 Language Standards

All code must use [TypeScript/JavaScript/Python] with [strict mode / type hints] enabled.

```json
// For TypeScript projects - tsconfig.json requirements
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true
  }
}
```

**Rules:**
- No `any` types without explicit justification in comments
- Prefer `unknown` over `any` for external data
- All function parameters and return types must be typed
- Use [Zod/Pydantic/etc.] for runtime validation at system boundaries

### 1.2 Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Files (components) | PascalCase | `UserCard.tsx` |
| Files (utilities) | camelCase | `userService.ts` |
| Variables/Functions | camelCase | `getUserById()` |
| Types/Interfaces | PascalCase | `interface User {}` |
| Constants | SCREAMING_SNAKE | `const MAX_RETRIES = 3` |
| Database columns | snake_case | `created_at` |
| CSS classes | kebab-case | `user-card` |
| Environment variables | SCREAMING_SNAKE | `API_SECRET_KEY` |

### 1.3 File Organization

```
src/
├── components/           # Reusable UI components
├── pages/               # Routes / Views
├── lib/                 # Business logic & utilities
│   ├── db/             # Database layer
│   ├── auth/           # Authentication
│   └── utils/          # Shared utilities
└── middleware.ts        # Request middleware
```

**Rules:**
- Maximum **[500]** lines per file (split if larger)
- One component per file
- Co-locate tests with source files (`*.test.ts`)
- Index files only for explicit public exports

### 1.4 Documentation Requirements

**Required documentation:**
- README.md for repository overview
- JSDoc / docstrings for all public functions
- Inline comments for complex business logic only
- Architecture Decision Records (ADRs) for significant choices

**JSDoc template:**
```typescript
/**
 * Brief description of what the function does.
 *
 * @param paramName - Description of parameter
 * @returns Description of return value
 * @throws {ErrorType} When this error occurs
 *
 * @example
 * const result = myFunction('input');
 */
```

### 1.5 Code Review Standards

**All code requires review before merge.** Reviewers check for:

| Category | Criteria |
|----------|----------|
| Correctness | Does it work? Edge cases handled? |
| Security | No secrets, injection vulnerabilities, or auth bypasses |
| Performance | No N+1 queries, unnecessary re-renders, or memory leaks |
| Style | Matches project conventions, readable, maintainable |
| Testing | Tests exist for new functionality |
| Scope | No unrelated changes, minimal footprint |

---

## 2. Testing Standards

### 2.1 Test Coverage Requirements

| Layer | Minimum Coverage | Testing Framework |
|-------|-----------------|-------------------|
| Unit tests | [90-100]% | [Vitest/Jest/pytest] |
| API routes | [90-100]% | [Framework + supertest] |
| E2E critical paths | [100]% | [Playwright/Cypress] |

**Critical paths requiring E2E tests:**
- User authentication flow
- Core business workflows
- Payment/checkout (if applicable)

### 2.2 Test Naming Convention

```typescript
describe('functionName', () => {
  it('returns expected result for normal input', async () => { /* ... */ });
  it('returns null for missing data', async () => { /* ... */ });
  it('throws Error on invalid input', async () => { /* ... */ });
});
```

### 2.3 Testing Culture

- **Developers own their tests** — Write tests alongside code, not after
- **Tests run before commit** — Pre-commit hooks enforce test passage
- **Flaky tests are bugs** — Fix or quarantine immediately
- **Mock external services only** — Don't mock internal modules

---

## 3. Development Workflow

### 3.1 Branching Strategy

**Trunk-based development with short-lived feature branches:**

```
main (protected)
  └── feature/PROJECT-123-add-feature
  └── fix/PROJECT-456-bug-description
  └── chore/update-dependencies
```

**Rules:**
- Keep branches focused (single ticket scope)
- Rebase onto main before merge
- Squash commits on merge
- Delete branch after merge

### 3.2 Commit Message Format

```
<type>(scope): <description>

[optional body]

[optional footer with ticket reference]
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### 3.3 CI/CD Pipeline

| Environment | Branch | Trigger |
|-------------|--------|---------|
| Preview | `feature/*` | Push/PR |
| Staging | `staging` | Merge |
| Production | `main` | Merge |

**All deployments run:**
1. Lint
2. Typecheck
3. Unit tests
4. Standards audit (`npm run audit:standards`)

**Production additionally runs:**
5. E2E tests
6. Production build

### 3.4 Definition of Done

A task is complete when:

- [ ] Code implements requirements
- [ ] TypeScript/linter compiles without errors
- [ ] Tests written and passing
- [ ] Code reviewed and approved
- [ ] Documentation updated (if applicable)
- [ ] No console warnings or errors
- [ ] Verified in deploy preview

### 3.5 Feature Flags

Major features should be wrapped in feature flags for safe rollout:

```typescript
export const FEATURE_FLAGS = {
  NEW_CHECKOUT_FLOW: false,
  DARK_MODE: false,
} as const;
```

---

## 4. Agentic Development Standards

> **Optional section** — Include if using AI coding assistants

### 4.1 AI Coding Assistant Integration

**Context files:**
- `CLAUDE.md` — Project context and commands
- Ticket system — Detailed requirements
- Architecture docs — System design reference

**Effective prompting:**
- Reference ticket ID for context
- Specify target files explicitly
- Request tests alongside implementation

### 4.2 Memory-Driven Development

Store key decisions for cross-session persistence:

```bash
# Store architecture decisions
npx claude-flow memory store "auth_pattern" "Using JWT with refresh tokens"

# Retrieve before starting related work
npx claude-flow memory get "auth_pattern"
```

---

## 5. Phase Retrospectives

> **Optional section** — Include for phased development projects

### 5.1 Retrospective Process

At the end of each implementation phase:

1. Document what went well
2. Document what could be improved
3. Create action items as tickets
4. Store technical learnings in memory

### 5.2 Effort Measurement

| Size | Estimate | Description |
|------|----------|-------------|
| XS | 5,000 tokens | Trivial fix |
| S | 10,000 tokens | Simple feature |
| M | 25,000 tokens | Standard feature |
| L | 50,000 tokens | Complex feature |
| XL | 100,000+ tokens | Epic — break down |

---

## 6. Security Standards

### 6.1 Secrets Management

- **Never commit secrets** — Use environment variables
- **Rotate on exposure** — Immediate rotation if committed
- **Minimal access** — Only required secrets per environment
- **Use Varlock** — Secure env var management in Claude sessions

### 6.2 Authentication & Authorization

- **Trust your auth provider** — Don't implement custom auth
- **Verify on server** — Never trust client-side claims
- **Audit sensitive actions** — Log admin operations
- **Principle of least privilege** — Default deny, explicit allow

### 6.3 Data Protection

- **Validate input** — Schema validation at API boundaries
- **Sanitize output** — Escape user content in templates
- **Encrypt sensitive data** — At rest and in transit
- **Privacy compliance** — Ability to delete user data

---

## 7. Performance Standards

### 7.1 Page Load Targets

| Metric | Target |
|--------|--------|
| LCP (Largest Contentful Paint) | < 2.5s |
| FID (First Input Delay) | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| TTI (Time to Interactive) | < 3s |

### 7.2 API Response Targets

| Endpoint Type | Target | Max |
|---------------|--------|-----|
| Read (single) | < 100ms | 500ms |
| Read (list) | < 200ms | 1s |
| Write | < 300ms | 2s |
| Bulk operations | < 5s | 30s |

---

## Appendix: Quick Reference

### Pre-Commit Checklist

```
[ ] TypeScript compiles (npm run typecheck)
[ ] Linter passes (npm run lint)
[ ] Tests pass (npm run test)
[ ] Standards audit (npm run audit:standards)
[ ] No console.log statements
[ ] No hardcoded secrets
[ ] Meaningful commit message
```

### PR Description Template

```markdown
## Summary
[What this PR does]

## Ticket
[PROJECT-XXX](link)

## Changes
- Change 1
- Change 2

## Testing
- [ ] Unit tests added/updated
- [ ] Tested in preview
- [ ] Edge cases considered
```

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | YYYY-MM-DD | Initial draft |

---

*Template from: [Governance Claude Skill](https://github.com/wrsmith108/governance-claude-skill)*
