---
name: threat-report
description: Generate a threat model report from completed PASTA stages
argument-hint: "[--format json|md|mermaid|all] [--output file]"
allowed-tools:
  - Read
  - Write
  - TodoWrite
---

# Threat Report

Generate a consolidated threat model report from completed PASTA stages.

## Flags

| Flag | Effect |
|------|--------|
| `--format` | Output format: `json`, `md`, `mermaid`, or `all` (default: `md`) |
| `--output` | Save report to a specific file path |

## Step 1: Load completed stages

Read all available stage outputs:

```bash
ls .claude/pasta-s1.json .claude/pasta-s2.json .claude/pasta-s3.json .claude/pasta-s4.json .claude/pasta-s5.json .claude/pasta-s6.json .claude/pasta-s7.json 2>/dev/null || true
```

If no stage outputs exist, suggest running `/randori:pasta` first.

## Step 2: Generate report

### Markdown report (`.claude/threat-model.md`)

```markdown
# PASTA Threat Model Report

**Target**: <project-path>
**Date**: <ISO-8601>
**Stages Completed**: S1-S4 (Community) or S1-S7 (Pro)

## Executive Summary
<3-5 sentences summarizing the threat landscape, top risks, and recommended actions>

## Stage 1: Business Objectives
<Summary from S1>

## Stage 2: Technical Scope
<Component inventory from S2>

## Stage 3: Application Decomposition

### Data Flow Diagram
<Mermaid DFD from S3>

### Trust Boundaries
<Table from S3>

### Entry Points
<Table from S3>

## Stage 4: Threat Analysis

### Threat Scenarios (by severity)

#### Critical Threats
<Detailed threat scenarios with evidence anchors>

#### High Threats
<Detailed threat scenarios>

#### Medium Threats
<Detailed threat scenarios>

### STRIDE Distribution
<Breakdown chart>

### Attack Trees
<Mermaid attack tree diagrams>

### ATT&CK Technique Coverage
<Table of mapped techniques>

## [Pro] Stages 5-7
<If Pro stages completed, include vulnerability analysis, attack modeling, risk management>

## Recommendations (Prioritized)
1. <Highest priority recommendation with effort/impact>
2. <Next priority>
3. ...

## Appendix
- Threat scenario IDs and full details
- MITRE ATT&CK technique references
- OWASP Top 10 mapping
```

### JSON report
Full structured threat model as JSON matching `references/threat-model.schema.json`.

### Mermaid output
Save DFD to `.claude/dfd.mmd` and attack trees to `.claude/attack-trees.mmd`.

## Step 3: Display summary

Show a concise summary in the conversation:

```
## Threat Model Complete

- **Threats identified**: X (Y critical, Z high)
- **STRIDE breakdown**: S:X T:X R:X I:X D:X E:X
- **Trust boundaries**: X
- **Entry points**: X
- **Attack trees**: X

**Top 3 Risks**:
1. [CRITICAL] <threat title> — <one-line description>
2. [HIGH] <threat title> — <one-line description>
3. [HIGH] <threat title> — <one-line description>

Full report: `.claude/threat-model.md`
DFD diagram: `.claude/dfd.mmd`
```
