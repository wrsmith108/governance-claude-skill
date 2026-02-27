#!/usr/bin/env node

/**
 * Governance Setup Check Script
 *
 * Verifies that the governance skill is properly configured in a project.
 * Run with: node scripts/governance-check.mjs
 *
 * Checks:
 * 1. CLAUDE.md exists and has required sections
 * 2. standards.md exists with proper structure
 * 3. Audit script is configured
 * 4. ADR directory exists
 * 5. Pre-commit hooks are configured
 * 6. Governance skill present
 */

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

// ANSI colors
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

const ROOT = process.cwd();

let passes = 0;
let warnings = 0;
let failures = 0;

function pass(msg) {
  console.log(`${GREEN}✓${RESET} ${msg}`);
  passes++;
}

function warn(msg, fix) {
  console.log(`${YELLOW}⚠${RESET} ${msg}`);
  if (fix) console.log(`   ${BLUE}Fix:${RESET} ${fix}`);
  warnings++;
}

function fail(msg, fix) {
  console.log(`${RED}✗${RESET} ${msg}`);
  if (fix) console.log(`   ${BLUE}Fix:${RESET} ${fix}`);
  failures++;
}

function section(title) {
  console.log(`\n${BOLD}${title}${RESET}`);
}

console.log(`\n${BOLD}🏛️  Governance Setup Check${RESET}\n`);
console.log('━'.repeat(50));

// ============================================================================
// Check 1: CLAUDE.md exists
// ============================================================================
section('1. CLAUDE.md (AI Operational Context)');

const claudeMdPath = join(ROOT, 'CLAUDE.md');
if (existsSync(claudeMdPath)) {
  pass('CLAUDE.md exists');

  const content = readFileSync(claudeMdPath, 'utf-8');

  if (content.includes('## Build Commands') || content.includes('## Commands')) {
    pass('Has build commands section');
  } else {
    warn('Missing build commands section', 'Add ## Build Commands with npm scripts');
  }

  if (content.includes('standards.md') || content.includes('Standards')) {
    pass('References standards.md');
  } else {
    warn(
      'No reference to standards.md',
      'Add cross-reference: > **Authoritative reference**: [standards.md](standards.md)'
    );
  }

  const lines = content.split('\n').length;
  if (lines <= 500) {
    pass(`Concise length (${lines} lines)`);
  } else if (lines <= 700) {
    warn(`Getting long (${lines} lines)`, 'Consider moving policy details to standards.md');
  } else {
    fail(`Too long (${lines} lines)`, 'Move policy and rationale to standards.md to reduce token usage');
  }
} else {
  fail('CLAUDE.md not found', 'Create CLAUDE.md at project root with project context');
}

// ============================================================================
// Check 2: standards.md exists
// ============================================================================
section('2. standards.md (Engineering Policy)');

// Search in priority order: repo root first, then docs locations
const standardsPaths = [
  { path: join(ROOT, 'standards.md'), label: 'root' },
  { path: join(ROOT, 'docs', 'architecture', 'standards.md'), label: 'docs/architecture/' },
  { path: join(ROOT, 'docs', 'standards.md'), label: 'docs/' },
];

let foundStandards = null;
for (const { path, label } of standardsPaths) {
  if (existsSync(path)) {
    foundStandards = { path, label };
    break;
  }
}

if (foundStandards) {
  pass(`standards.md found at ${foundStandards.label}`);
  const standardsContent = readFileSync(foundStandards.path, 'utf-8');

  const requiredSections = [
    { pattern: /## 1.*Code Quality|## Code Quality/i, name: 'Code Quality section' },
    { pattern: /## 2.*Testing|## Testing/i, name: 'Testing section' },
    { pattern: /## 3.*Workflow|## Development Workflow/i, name: 'Workflow section' },
  ];

  for (const { pattern, name } of requiredSections) {
    if (pattern.test(standardsContent)) {
      pass(`Has ${name}`);
    } else {
      warn(`Missing ${name}`, `Add ${name} to standards.md`);
    }
  }
} else {
  fail(
    'standards.md not found',
    'Copy the starter: cp node_modules/@wrsmith108/governance-skill/standards.md standards.md\n' +
    '   Or create docs/architecture/standards.md using templates/standards-template.md'
  );
}

// ============================================================================
// Check 3: Audit script configured
// ============================================================================
section('3. Audit Script (Automated Compliance)');

const packageJsonPath = join(ROOT, 'package.json');
if (existsSync(packageJsonPath)) {
  const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

  if (pkg.scripts?.['audit:standards']) {
    pass('npm run audit:standards configured');

    const scriptMatch = pkg.scripts['audit:standards'].match(/node\s+(\S+)/);
    if (scriptMatch) {
      const scriptPath = join(ROOT, scriptMatch[1]);
      if (existsSync(scriptPath)) {
        pass(`Audit script exists: ${scriptMatch[1]}`);
      } else {
        fail(
          `Audit script not found: ${scriptMatch[1]}`,
          'Create the audit script or copy from templates/audit-standards-template.mjs'
        );
      }
    }
  } else {
    fail(
      'audit:standards script not configured',
      'Add to package.json: "audit:standards": "node scripts/audit-standards.mjs"'
    );
  }
} else {
  warn('No package.json found', 'This may not be a Node.js project');
}

// ============================================================================
// Check 4: ADR directory
// ============================================================================
section('4. Architecture Decision Records');

const adrPath = join(ROOT, 'docs', 'adr');
if (existsSync(adrPath)) {
  pass('docs/adr/ directory exists');

  const templatePath = join(adrPath, '000-template.md');
  if (existsSync(templatePath)) {
    pass('ADR template exists');
  } else {
    warn('No ADR template', 'Create docs/adr/000-template.md for consistent decision records');
  }
} else {
  warn('docs/adr/ directory not found', 'Create docs/adr/ for architecture decision records');
}

// ============================================================================
// Check 5: Pre-commit hooks
// ============================================================================
section('5. Pre-commit Hooks');

const huskyPath = join(ROOT, '.husky', 'pre-commit');
const lefthookPath = join(ROOT, 'lefthook.yml');
const preCommitPath = join(ROOT, '.pre-commit-config.yaml');

if (existsSync(huskyPath)) {
  pass('Husky pre-commit hook configured');

  const hookContent = readFileSync(huskyPath, 'utf-8');
  if (hookContent.includes('lint') || hookContent.includes('typecheck') || hookContent.includes('test')) {
    pass('Hook runs quality checks');
  } else {
    warn('Hook may not run quality checks', 'Add lint/typecheck/test to pre-commit hook');
  }
} else if (existsSync(lefthookPath)) {
  pass('Lefthook configured');
} else if (existsSync(preCommitPath)) {
  pass('pre-commit configured');
} else {
  warn(
    'No pre-commit hooks found',
    'Install husky: npx husky install && npx husky add .husky/pre-commit "npm run lint && npm run typecheck"'
  );
}

// ============================================================================
// Check 6: Governance skill present
// ============================================================================
section('6. Governance Skill');

const skillPaths = [
  join(ROOT, '.claude', 'skills', 'governance', 'SKILL.md'),
  join(ROOT, 'SKILL.md'),
];

if (skillPaths.some(existsSync)) {
  pass('Governance skill installed');
} else {
  warn(
    'Governance skill not found in project',
    'Install via: claude plugin add github:wrsmith108/governance-claude-skill'
  );
}

// ============================================================================
// Summary
// ============================================================================
console.log('\n' + '━'.repeat(50));
console.log(`\n${BOLD}📊 Summary${RESET}\n`);
console.log(`${GREEN}Passed:${RESET}   ${passes}`);
console.log(`${YELLOW}Warnings:${RESET} ${warnings}`);
console.log(`${RED}Failed:${RESET}   ${failures}`);

const total = passes + warnings + failures;
const score = Math.round((passes / total) * 100);
console.log(`\nGovernance Score: ${score}%`);

if (failures > 0) {
  console.log(`\n${RED}${BOLD}Governance setup incomplete.${RESET} Fix the failures above.\n`);
  process.exit(1);
} else if (warnings > 0) {
  console.log(`\n${YELLOW}${BOLD}Governance setup functional${RESET} with recommendations above.\n`);
  process.exit(0);
} else {
  console.log(`\n${GREEN}${BOLD}Governance fully configured!${RESET}\n`);
  process.exit(0);
}
