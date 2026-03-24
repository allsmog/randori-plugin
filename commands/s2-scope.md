---
name: s2
description: "PASTA Stage 2: Map technical scope — software components, actors, data sources/sinks, services"
argument-hint: "[path]"
allowed-tools:
  - Bash
  - Glob
  - Grep
  - Read
  - TodoWrite
---

# Stage 2: Technical Scope

Inventory all technical components, actors, data flows, and system services.

## Prerequisites

Stage 1 must be completed. Check for `.claude/pasta-s1.json`.

## Process

### Step 1: Inventory software components

Identify all services, databases, caches, queues, and external dependencies:

```bash
# Package manifests
cat package.json 2>/dev/null | head -50
cat pyproject.toml 2>/dev/null | head -50
cat go.mod 2>/dev/null | head -30
cat Cargo.toml 2>/dev/null | head -30
cat pom.xml 2>/dev/null | head -50

# Docker services
cat docker-compose.yml docker-compose.yaml 2>/dev/null || true

# Infrastructure
ls terraform/ k8s/ helm/ cloudformation/ 2>/dev/null || true
```

For each component, classify:
- **Type**: service | database | queue | cache | cdn | api-gateway | load-balancer | storage
- **Technology**: e.g., PostgreSQL, Redis, RabbitMQ, S3
- **Version**: if identifiable
- **Exposed ports**: from Docker/K8s config

### Step 2: Identify actors

Determine who interacts with the system:

```bash
# User roles and types
grep -rniE "(role|user.?type|admin|customer|operator|service.?account|api.?key)" --include="*.ts" --include="*.js" --include="*.py" --include="*.go" --include="*.java" -l

# Auth providers (external actors)
grep -rniE "(oauth|saml|oidc|auth0|clerk|cognito|firebase.?auth)" --include="*.ts" --include="*.js" --include="*.py" --include="*.go" -l
```

Classify each actor:
- **Type**: user | admin | service | external-system | attacker
- **Privileges**: what can they do?

### Step 3: Map data sources and sinks

**Data sources** (where data enters the system):

```bash
# API endpoints (data entry points)
grep -rniE "(app\.(get|post|put|patch|delete)|router\.(get|post|put|patch|delete)|@(Get|Post|Put|Patch|Delete)|@app\.(route|get|post))" --include="*.ts" --include="*.js" --include="*.py" --include="*.go" --include="*.java"

# File uploads
grep -rniE "(multer|upload|multipart|formidable|busboy)" --include="*.ts" --include="*.js" --include="*.py" --include="*.go" -l

# Message consumers
grep -rniE "(subscribe|consume|on.?message|queue|amqp|kafka|sqs)" --include="*.ts" --include="*.js" --include="*.py" --include="*.go" -l
```

**Data sinks** (where data is written):

```bash
# Database writes
grep -rniE "(\.create|\.insert|\.update|\.save|\.upsert|\.query|\.exec)" --include="*.ts" --include="*.js" --include="*.py" --include="*.go" --include="*.java" -l

# External API calls
grep -rniE "(fetch|axios|http\.request|requests\.(get|post)|http\.Get|HttpClient)" --include="*.ts" --include="*.js" --include="*.py" --include="*.go" --include="*.java" -l

# Log outputs
grep -rniE "(console\.log|logger|log\.(info|error|warn))" --include="*.ts" --include="*.js" --include="*.py" --include="*.go" -l
```

### Step 4: Identify system services

```bash
# Runtime environment
ls Dockerfile .dockerignore 2>/dev/null || true
ls .github/workflows/*.yml .gitlab-ci.yml Jenkinsfile 2>/dev/null || true
cat .nvmrc .python-version .tool-versions 2>/dev/null || true
```

### Step 5: Determine scope exclusions

Identify what's explicitly OUT of scope:
- Third-party SaaS platforms (unless configured in code)
- Operating system level (unless IaC defines it)
- Physical infrastructure

## Output

```markdown
# PASTA Stage 2: Technical Scope

## Software Components
| ID | Name | Type | Technology | Version | Ports |
|----|------|------|------------|---------|-------|
| C-001 | API Server | service | Express/Node.js | 22.x | 3000 |
| C-002 | Database | database | PostgreSQL | 15.x | 5432 |
| C-003 | Cache | cache | Redis | 7.x | 6379 |

## Actors
| ID | Name | Type | Privileges |
|----|------|------|------------|
| A-001 | End User | user | read own data, create resources |
| A-002 | Admin | admin | full CRUD, user management |
| A-003 | API Consumer | service | read via API key |

## Data Sources
- HTTP API endpoints (15 routes)
- File upload endpoint (/api/upload)
- Webhook receiver (/webhooks/stripe)

## Data Sinks
- PostgreSQL (user data, transactions)
- Redis (sessions, cache)
- S3 (file storage)
- External: Stripe API, SendGrid

## System Services
- Runtime: Node.js 22
- Container: Docker
- CI/CD: GitHub Actions
- Deployment: AWS ECS

## Scope Exclusions
- AWS infrastructure (managed by platform team)
- Third-party SaaS (Stripe, SendGrid)
```

**You MUST use the Write tool to save the above structured output to `.claude/pasta-s2.json` before this stage is considered complete.** This file is required by downstream stages and for resume support.
