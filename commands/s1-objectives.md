---
name: s1
description: "PASTA Stage 1: Define business objectives, security requirements, and compliance context"
argument-hint: "[path]"
allowed-tools:
  - Glob
  - Grep
  - Read
  - TodoWrite
  - AskUserQuestion
---

# Stage 1: Define Objectives

Gather business context, security requirements, and compliance landscape to frame the threat model.

## Process

### Step 1: Identify business context

Read project documentation to understand what the application does:

```bash
ls README.md CONTRIBUTING.md docs/ .github/ LICENSE 2>/dev/null || true
```

Read the README and any architecture docs. Identify:
- **Application purpose**: What does this software do?
- **Users/customers**: Who uses it?
- **Data handled**: What sensitive data is processed?
- **Business criticality**: How important is this system?

### Step 2: Identify security requirements

Search for security-relevant configuration and patterns:

```bash
# Auth/access control patterns
grep -rniE "(authenticate|authorize|permission|role|rbac|oauth|jwt|session)" --include="*.ts" --include="*.js" --include="*.py" --include="*.go" --include="*.java" -l

# Encryption patterns
grep -rniE "(encrypt|decrypt|hash|bcrypt|argon2|aes|tls|ssl|https)" --include="*.ts" --include="*.js" --include="*.py" --include="*.go" --include="*.java" -l

# Input validation
grep -rniE "(validate|sanitize|escape|zod|joi|pydantic)" --include="*.ts" --include="*.js" --include="*.py" --include="*.go" --include="*.java" -l

# Logging
grep -rniE "(winston|pino|log4j|slog|zerolog|logging)" --include="*.ts" --include="*.js" --include="*.py" --include="*.go" --include="*.java" -l
```

Categorize requirements:
- **Authentication**: How are users identified?
- **Authorization**: How is access controlled?
- **Encryption**: What data is encrypted at rest/in transit?
- **Input validation**: How is user input validated?
- **Session management**: How are sessions handled?
- **Logging**: What is logged?

### Step 3: Identify compliance context

Check for compliance indicators:

```bash
# Compliance-related files
ls SOC2.md HIPAA.md GDPR.md compliance/ security/ .security/ 2>/dev/null || true

# PCI indicators (payment processing)
grep -rniE "(stripe|payment|credit.?card|billing|checkout)" --include="*.ts" --include="*.js" --include="*.py" --include="*.go" -l

# HIPAA indicators (healthcare data)
grep -rniE "(patient|health|medical|phi|hipaa)" --include="*.ts" --include="*.js" --include="*.py" --include="*.go" -l

# GDPR indicators (EU personal data)
grep -rniE "(gdpr|consent|data.?subject|right.?to.?erasure|dpa)" --include="*.ts" --include="*.js" --include="*.py" --include="*.go" -l
```

### Step 4: Business impact assessment

For each major asset/service identified, assess CIA impact:
- **Confidentiality**: What happens if this data is exposed?
- **Integrity**: What happens if this data is modified?
- **Availability**: What happens if this service is unavailable?

Rate each as: critical | high | medium | low

### Step 5: Define risk profile

Based on findings, determine:
- **Risk appetite**: aggressive (startup, speed over security) | moderate (balanced) | conservative (regulated, security-first)
- **Data classifications**: What types of data exist? (PII, financial, health, public)
- **Critical assets**: What must be protected above all?

## Output

Present Stage 1 results as:

```markdown
# PASTA Stage 1: Business Objectives

## Application Overview
<2-3 sentences describing what the application does>

## Business Requirements
1. [BR-001] <requirement description>
   - Stakeholders: <who cares>
   - Data classifications: <what data>

## Security Requirements
| ID | Category | Description | Priority |
|----|----------|-------------|----------|
| SR-001 | auth | <description> | high |
| SR-002 | encryption | <description> | critical |

## Compliance Context
| Framework | Applicability | Status |
|-----------|--------------|--------|
| OWASP ASVS | Applicable | <met/partial/gap> |
| ISO 27001 | <if relevant> | <status> |

## Business Impact Assessment
| Asset | Confidentiality | Integrity | Availability |
|-------|----------------|-----------|--------------|
| User database | High | High | Medium |
| API service | Medium | High | High |

## Risk Profile
- **Risk appetite**: <aggressive/moderate/conservative>
- **Data classifications**: <list>
- **Critical assets**: <list>
```

**You MUST use the Write tool to save the above structured output to `.claude/pasta-s1.json` before this stage is considered complete.** Create the `.claude/` directory first if needed. This file is required by downstream stages and for resume support.
