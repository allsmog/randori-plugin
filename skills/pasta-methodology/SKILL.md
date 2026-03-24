---
name: PASTA Methodology
description: >-
  This skill should be used when the user mentions "PASTA", "threat modeling
  methodology", "Process for Attack Simulation", "7-stage threat model",
  "OWASP threat modeling", or needs to understand the PASTA framework stages,
  outputs, and how they connect.
version: 1.0.0
---

# PASTA (Process for Attack Simulation and Threat Analysis)

## Purpose

Reference for the PASTA threat modeling methodology — a 7-stage, risk-centric approach that combines business context, technical analysis, and attack simulation.

## When to Use

- When performing any PASTA stage
- When explaining the methodology to stakeholders
- When deciding which stages to run
- When connecting stage outputs to downstream stages

## The 7 Stages

```
S1 Define Objectives
    ↓ (business context, risk profile)
S2 Technical Scope
    ↓ (components, actors, services)
S3 Decomposition
    ↓ (DFD, trust boundaries, entry points)
S4 Threat Analysis
    ↓ (STRIDE threats, ATT&CK, attack trees)
S5 Vulnerability Analysis
    ↓ (CVE/CWE correlation, weak patterns)
S6 Attack Modeling
    ↓ (full attack trees, simulation)
S7 Risk Management
    → (mitigations, residual risk, priorities)
```

### Stage 1: Define Objectives
**Purpose**: Frame the threat model in business context
**Inputs**: README, architecture docs, interviews
**Outputs**:
- Business requirements with stakeholders
- Security requirements by category (auth, encryption, logging, etc.)
- Compliance requirements (OWASP ASVS, ISO 27001, etc.)
- Business impact assessment (CIA per asset)
- Risk profile (appetite, data classifications, critical assets)

**Key question**: What are we protecting and why?

### Stage 2: Technical Scope
**Purpose**: Inventory all technical components
**Inputs**: S1 output, package manifests, Docker configs, IaC
**Outputs**:
- Software components (services, databases, caches, queues)
- Actors (users, admins, services, external systems)
- Data sources and sinks
- System services (runtime, middleware, container platform)
- Scope exclusions

**Key question**: What is the technical attack surface?

### Stage 3: Decomposition
**Purpose**: Understand how data flows through the system
**Inputs**: S2 output, route definitions, database operations, API calls
**Outputs**:
- Data Flow Diagram (DFD) in Mermaid format
- Trust boundaries (where security posture changes)
- Entry points (where data enters the system)
- Access control matrix (who can access what)
- Security functional analysis per trust boundary

**Key question**: Where are the trust boundaries and how does data cross them?

### Stage 4: Threat Analysis (Core)
**Purpose**: Identify and classify threats
**Inputs**: S3 output, S1 objectives, code analysis
**Outputs**:
- Threat scenarios with STRIDE classification
- MITRE ATT&CK technique mapping
- CAPEC pattern mapping
- OWASP Top 10 cross-reference
- 5-factor probabilistic assessment (VerSprite model)
- Draft attack trees
- Evidence anchors (file paths, line numbers)

**Key question**: What can go wrong and how likely is it?

### Stage 5: Vulnerability Analysis (Pro)
**Purpose**: Map threats to known vulnerabilities
**Inputs**: S4 threats, dependency manifests
**Outputs**:
- CVE/CWE correlation
- Dependency vulnerability scan
- Use/abuse case mapping
- Threat-vulnerability linking

**Key question**: Are these threats exploitable via known vulnerabilities?

### Stage 6: Attack Modeling (Pro)
**Purpose**: Simulate realistic attack scenarios
**Inputs**: S4 attack tree drafts, S5 vulnerabilities
**Outputs**:
- Complete attack trees with probability propagation
- Attack surface enumeration
- Step-by-step attack path narratives
- Detection opportunity mapping

**Key question**: What does a realistic attack look like end-to-end?

### Stage 7: Risk Management (Pro)
**Purpose**: Prioritize and plan mitigations
**Inputs**: All previous stages
**Outputs**:
- Risk scores (probability x impact)
- Existing controls effectiveness
- Residual risk assessment
- Mitigation strategies with effort estimates
- Risk treatment decisions (mitigate, transfer, accept, avoid)
- Compliance-mapped recommendations

**Key question**: What should we fix first and how?

## Stage Dependencies

Each stage requires all previous stages to be completed:
- S1 has no dependencies (entry point)
- S2 requires S1
- S3 requires S2
- S4 requires S3 (and S1 for objectives context)
- S5 requires S4
- S6 requires S4 and S5
- S7 requires all previous stages

## Free vs Pro Stages

**Community mode**: S1-S4 provide a complete foundational threat model including STRIDE analysis, ATT&CK mapping, and draft attack trees. This is sufficient for:
- Initial security assessment
- Developer awareness
- Sprint-level threat modeling
- Compliance evidence (basic)

**Pro mode**: S5-S7 add vulnerability correlation, full attack simulation, and risk management. Needed for:
- Formal compliance programs (ISO 27001, SOC 2)
- Enterprise risk management
- Executive reporting
- Audit evidence
