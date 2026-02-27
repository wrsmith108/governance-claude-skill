# Engineering Standards

**Version**: 1.0 — Starter Default
**Status**: Active
**Owner**: [Your Name / Role]

> **This is a minimal working default.** Replace or extend with your project-specific rules.
> Template with full sections available at `templates/standards-template.md`.

---

## 1. Code Quality

### 1.1 Language Standards

- **TypeScript strict mode** required (`"strict": true` in `tsconfig.json`)
- No `any` types — use `unknown` for external/untyped data
- All exported functions and types must be explicitly typed
- Use runtime validation (e.g., Zod) at system boundaries (user input, external APIs)

### 1.2 Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Components | PascalCase | `UserCard.tsx` |
| Utilities | camelCase | `userService.ts` |
| Variables/Functions | camelCase | `getUserById()` |
| Types/Interfaces | PascalCase | `interface User {}` |
| Constants | SCREAMING_SNAKE | `const MAX_RETRIES = 3` |
| Database columns | snake_case | `created_at` |
| Environment variables | SCREAMING_SNAKE | `API_SECRET_KEY` |

### 1.3 File Organization

- Maximum **500 lines** per file — split if larger
- One component per file
- Co-locate tests with source files (`*.test.ts`)

### 1.4 Documentation

- JSDoc required for all public/exported functions
- Inline comments only for non-obvious business logic
- ADRs for significant architectural choices (`docs/adr/`)

### 1.5 Code Review

All code requires review before merge. Check for:

| Category | Criteria |
|----------|----------|
| Correctness | Works as intended, edge cases handled |
| Security | No secrets, no injection vulnerabilities |
| Performance | No N+1 queries, no memory leaks |
| Testing | Tests exist for new code |

---

## 2. Testing

### 2.1 Coverage Requirements

| Layer | Minimum | Framework |
|-------|---------|-----------|
| Unit tests | 80%+ | Vitest / Jest |
| API routes | 90%+ | Supertest |
| E2E critical paths | 100% | Playwright |

### 2.2 Culture

- Write tests alongside code, not after
- Pre-commit hooks must pass tests before commit
- Flaky tests are bugs — fix or quarantine immediately

---

## 3. Development Workflow

### 3.1 Branching

- Protected `main` branch — no direct commits
- Short-lived feature branches: `feature/TICKET-123-description`
- Squash-merge on completion; delete branch after merge

### 3.2 Commit Messages

```
<type>(scope): <description>
```

Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`

### 3.3 Definition of Done

- [ ] Code implements requirements
- [ ] TypeScript/linter compiles without errors
- [ ] Tests written and passing
- [ ] Code reviewed and approved
- [ ] No hardcoded secrets or `console.log` statements

---

## 4. Security

- **Never commit secrets** — use environment variables
- Validate and sanitize all input at system boundaries
- Principle of least privilege for all API/DB access

---

*Based on the [Governance Claude Skill](https://github.com/wrsmith108/governance-claude-skill)*
*Extend this file with project-specific rules. See `templates/standards-template.md` for a fuller template.*
