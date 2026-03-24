---
name: pasta
description: Run a full PASTA threat modeling analysis through all available stages sequentially
argument-hint: "[path] [--stages s1,s2,s3,s4] [--format json|md|mermaid] [--output file] [--resume]"
allowed-tools:
  - Bash
  - Glob
  - Grep
  - Read
  - Write
  - Agent
  - TodoWrite
  - AskUserQuestion
---

# Full PASTA Threat Model

Run the complete PASTA (Process for Attack Simulation and Threat Analysis) methodology against a codebase.

## Flags

| Flag | Effect |
|------|--------|
| `--stages` | Run specific stages only (e.g., `s1,s2,s3,s4`). Default: all available |
| `--format` | Output format: `json`, `md`, `mermaid`, or comma-separated combination |
| `--output` | Save report to a specific file path |
| `--resume` | Resume from a previous incomplete analysis |

## Available Stages

**Community mode** (free): S1, S2, S3, S4
**Pro mode** (requires API key in `.claude/randori.local.md`): S1-S7

## Step 1: Check for prior state

```bash
ls .claude/randori-state.json 2>/dev/null || true
```

If `--resume` and state exists, load it and skip completed stages.

## Step 2: Scope the codebase

Quick language and framework detection:

```bash
ls package.json pyproject.toml requirements.txt go.mod Cargo.toml pom.xml composer.json Gemfile 2>/dev/null || true
```

```bash
find . -type f \( -name "*.ts" -o -name "*.js" -o -name "*.py" -o -name "*.java" -o -name "*.go" -o -name "*.php" -o -name "*.rb" -o -name "*.rs" -o -name "*.cs" \) -not -path "*/node_modules/*" -not -path "*/vendor/*" -not -path "*/dist/*" 2>/dev/null | wc -l
```

## Step 3: Execute stages sequentially

**CRITICAL: Write each stage output to disk IMMEDIATELY after completing it, BEFORE starting the next stage.** This ensures resume works and partial runs still produce usable artifacts. Do not batch writes at the end.

### Stage 1: Define Objectives
- Gather business requirements, security requirements, compliance context
- **IMMEDIATELY write** `.claude/pasta-s1.json` with the structured S1 output
- Then proceed to Stage 2

### Stage 2: Technical Scope
- Inventory components, actors, data sources/sinks, services
- **IMMEDIATELY write** `.claude/pasta-s2.json` with the structured S2 output
- Then proceed to Stage 3

### Stage 3: Decomposition
- Build DFD, trust boundaries, entry points, access control matrix
- **IMMEDIATELY write** `.claude/pasta-s3.json` with the structured S3 output
- **IMMEDIATELY write** `.claude/dfd.mmd` with the Mermaid DFD diagram
- Then proceed to Stage 4

### Stage 4: Threat Analysis
- STRIDE classification of threats
- ATT&CK technique mapping
- 5-factor probabilistic assessment
- Attack tree drafts
- **IMMEDIATELY write** `.claude/pasta-s4.json` with the structured S4 output
- This is the core of the threat model

### Stages 5-7 (Pro mode only)
If API key detected, continue with:
- S5: Vulnerability analysis (CVE/CWE correlation)
- S6: Attack modeling (full attack trees, simulation)
- S7: Risk management (mitigations, residual risk, prioritization)

## Step 4: Write state file

Write `.claude/randori-state.json`:

```json
{
  "target": "<project-path>",
  "started_at": "<ISO-8601>",
  "last_updated": "<ISO-8601>",
  "completed_at": "<ISO-8601 or null>",
  "stages_completed": ["s1", "s2", "s3", "s4"],
  "scope": {
    "languages": ["typescript"],
    "frameworks": ["express"],
    "source_file_count": 150
  },
  "summary": {
    "total_threats": 12,
    "critical": 2,
    "high": 4,
    "medium": 3,
    "low": 3,
    "stride_breakdown": {
      "spoofing": 2,
      "tampering": 3,
      "repudiation": 1,
      "information_disclosure": 3,
      "denial_of_service": 1,
      "elevation_of_privilege": 2
    },
    "components_identified": 8,
    "trust_boundaries": 3,
    "entry_points": 15,
    "attack_trees": 4
  }
}
```

## Step 5: Generate report

Write `.claude/threat-model.md` with the full threat model and display a summary.

## Step 6: Emit requested format

### `--format json`
Full structured threat model as JSON.

### `--format md` (default)
Human-readable threat model report.

### `--format mermaid`
DFD diagram saved to `.claude/dfd.mmd`.

## Notes

- Each stage builds on the previous — do not skip stages
- Every threat MUST have evidence anchors (file path + line number)
- STRIDE categories are required for all threat scenarios
- The threat model is advisory — it does not replace a formal threat modeling exercise with stakeholders
