---
name: s4
description: "PASTA Stage 4: Threat analysis — STRIDE classification, ATT&CK mapping, probabilistic assessment, attack tree drafts"
argument-hint: "[path]"
allowed-tools:
  - Glob
  - Grep
  - Read
  - Write
  - Agent
  - TodoWrite
---

# Stage 4: Threat Analysis

The core of the threat model. Identify threats using STRIDE, map to MITRE ATT&CK and CAPEC, assess probability using the VerSprite 5-factor model, and draft attack trees.

## Prerequisites

Stages 1-3 must be completed. Load `.claude/pasta-s3.json` (DFD, trust boundaries, entry points).

## Process

### Step 1: STRIDE threat identification

For each trust boundary crossing and entry point from S3, apply STRIDE:

| Category | Question | Code Evidence |
|----------|----------|---------------|
| **S**poofing | Can an attacker impersonate a legitimate user/service? | Missing auth, weak token validation, no mutual TLS |
| **T**ampering | Can data be modified in transit or at rest? | No integrity checks, missing CSRF protection, SQL injection |
| **R**epudiation | Can an attacker deny their actions? | Missing audit logging, no transaction logs, unsigned requests |
| **I**nformation Disclosure | Can sensitive data be exposed? | PII in logs, verbose errors, missing encryption, IDOR |
| **D**enial of Service | Can the service be made unavailable? | No rate limiting, unbounded queries, resource exhaustion |
| **E**levation of Privilege | Can an attacker gain unauthorized access? | Missing authz checks, IDOR, privilege escalation paths |

Use the threat-analyst agent to systematically search for evidence:

```bash
# Spoofing evidence
grep -rniE "(jwt\.verify|verify.?token|authenticate|passport\.authenticate)" --include="*.ts" --include="*.js" --include="*.py" --include="*.go"

# Tampering evidence
grep -rniE "(csrf|xsrf|csrfToken|parameterized|prepared.?statement|\.escape\(|\.sanitize\()" --include="*.ts" --include="*.js" --include="*.py" --include="*.go"

# Repudiation evidence
grep -rniE "(audit|log.*(create|update|delete|login|logout|access))" --include="*.ts" --include="*.js" --include="*.py" --include="*.go"

# Information disclosure evidence
grep -rniE "(stack.?trace|console\.log.*password|console\.log.*token|\.env|debug.*true)" --include="*.ts" --include="*.js" --include="*.py" --include="*.go"

# DoS evidence
grep -rniE "(rate.?limit|throttle|max.?connections|timeout|pool.?size)" --include="*.ts" --include="*.js" --include="*.py" --include="*.go"

# Elevation of privilege evidence
grep -rniE "(isAdmin|hasRole|authorize|permission.?check|access.?control)" --include="*.ts" --include="*.js" --include="*.py" --include="*.go"
```

### Step 2: Map to MITRE ATT&CK

For each identified threat, map to relevant ATT&CK Enterprise techniques:

| Threat Pattern | ATT&CK Techniques |
|---------------|-------------------|
| Credential theft/spoofing | T1078 (Valid Accounts), T1110 (Brute Force) |
| SQL/Command injection | T1059 (Command Scripting), T1190 (Exploit Public-Facing App) |
| Data exfiltration | T1567 (Exfil Over Web Service), T1048 (Exfil Over Alternative Protocol) |
| Privilege escalation | T1068 (Exploitation for Privilege Escalation), T1548 (Abuse Elevation Control) |
| Session hijacking | T1539 (Steal Web Session Cookie), T1557 (Adversary-in-the-Middle) |
| SSRF | T1090 (Proxy), T1018 (Remote System Discovery) |
| Supply chain | T1195 (Supply Chain Compromise) |

### Step 3: Map to OWASP Top 10

Cross-reference threats with OWASP Top 10 (2021):

| OWASP | STRIDE Categories | CWE Examples |
|-------|-------------------|-------------|
| A01: Broken Access Control | Elevation of Privilege, Information Disclosure | CWE-200, CWE-284, CWE-285 |
| A02: Cryptographic Failures | Information Disclosure | CWE-259, CWE-327, CWE-328 |
| A03: Injection | Tampering, Elevation of Privilege | CWE-79, CWE-89, CWE-78 |
| A04: Insecure Design | All categories | CWE-209, CWE-256, CWE-501 |
| A05: Security Misconfiguration | Information Disclosure, Elevation of Privilege | CWE-16, CWE-611 |
| A06: Vulnerable Components | Tampering, Elevation of Privilege | CWE-1035, CWE-1104 |
| A07: Auth Failures | Spoofing, Elevation of Privilege | CWE-287, CWE-798 |
| A08: Integrity Failures | Tampering | CWE-829, CWE-494 |
| A09: Logging Failures | Repudiation | CWE-117, CWE-223 |
| A10: SSRF | Tampering, Information Disclosure | CWE-918 |

### Step 4: 5-factor probabilistic assessment

For each threat scenario, assess using the VerSprite model:

| Factor | Question | Scale |
|--------|----------|-------|
| **Access** | How easy is it to reach the target? | 0 (impossible) → 1 (trivial) |
| **Window of Opportunity** | Is there a time window for the attack? | 0 (none) → 1 (always open) |
| **Ability to Repudiate** | Can the attacker hide their tracks? | 0 (fully logged) → 1 (no logging) |
| **Risk/Reward** | How motivated is the attacker? | 0 (low payoff) → 1 (high payoff) |
| **Threat Simplicity** | How simple is the attack? | 0 (expert only) → 1 (script kiddie) |

**Weighted likelihood** = mean of all 5 factors (0-1)

### Step 5: Draft attack trees

For the top threats (critical and high), build attack trees:

```
Goal: [Attacker's objective]
├── [OR] Attack Path A
│   ├── [AND] Prerequisite 1
│   │   └── [LEAF] Specific technique (ATT&CK T-code)
│   └── [AND] Prerequisite 2
│       └── [LEAF] Specific technique
└── [OR] Attack Path B
    └── [LEAF] Direct exploit (CAPEC reference)
```

Node types:
- **AND**: All children must succeed
- **OR**: Any child path suffices
- **LEAF**: Concrete attack step

Node roles (VerSprite alignment):
- Level 0: **threat-motive** (root goal)
- Level 1: **threat-agent** (who: insider, external attacker, bot)
- Level 2: **target** (what: API, database, user session)
- Level 3: **attack-vector** (how: network, social engineering, supply chain)
- Level 4: **attack-pattern** (specific CAPEC pattern)

### Step 6: Evidence anchoring

**Every threat scenario MUST include at least one evidence anchor**:

```json
{
  "evidenceAnchors": [
    {
      "filePath": "src/routes/auth.ts",
      "startLine": 45,
      "description": "Login endpoint lacks rate limiting — enables brute-force attacks"
    }
  ]
}
```

If no code evidence exists (e.g., architectural threat), describe the architectural concern with relevant configuration files.

## Output

```markdown
# PASTA Stage 4: Threat Analysis

## Threat Scenarios

### [TS-001] Brute-force authentication bypass
- **STRIDE**: Spoofing
- **ATT&CK**: T1110 (Brute Force)
- **OWASP**: A07 (Identification and Authentication Failures)
- **Target**: Login endpoint
- **Threat agent**: External attacker
- **Evidence**: `src/routes/auth.ts:45` — No rate limiting on POST /api/auth/login
- **Probability**: 0.72 (Access: 0.9, Window: 0.8, Repudiate: 0.5, Reward: 0.7, Simplicity: 0.7)
- **Impact**: High

### [TS-002] SQL injection via search endpoint
- **STRIDE**: Tampering, Information Disclosure
- **ATT&CK**: T1190 (Exploit Public-Facing Application)
- **OWASP**: A03 (Injection)
- **CAPEC**: CAPEC-66 (SQL Injection)
- **Evidence**: `src/routes/search.ts:23` — String concatenation in SQL query
- **Probability**: 0.65
- **Impact**: Critical

## STRIDE Summary
| Category | Count | Critical | High | Medium | Low |
|----------|-------|----------|------|--------|-----|
| Spoofing | 2 | 0 | 1 | 1 | 0 |
| Tampering | 3 | 1 | 1 | 1 | 0 |
| Repudiation | 1 | 0 | 0 | 1 | 0 |
| Information Disclosure | 3 | 0 | 2 | 1 | 0 |
| Denial of Service | 1 | 0 | 1 | 0 | 0 |
| Elevation of Privilege | 2 | 1 | 1 | 0 | 0 |

## Attack Trees
[Mermaid attack tree diagrams for top critical/high threats]

## Threat Agent Mapping
| Agent | Motivation | Capability | Targets |
|-------|-----------|------------|---------|
| External attacker | Financial gain | Medium | Auth, payment data |
| Insider | Data theft | High | User database, admin panel |
```

**You MUST use the Write tool to save the above structured output to `.claude/pasta-s4.json` before this stage is considered complete.** This file is the core threat analysis output and is required for resume support and report generation.
