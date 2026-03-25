---
name: session-init
description: Initialize threat modeling session and check for previous state
event: SessionStart
---

# Threat Modeling Session Initialization

On session start, check for existing threat model state and provide context.

## State Detection

Check for existing threat model state:

```bash
ls randori-output/randori-state.json randori-output/threat-model.md randori-output/dfd.mmd 2>/dev/null || true
```

### If state file exists:

Read `randori-output/randori-state.json` and display:

```
**Randori Threat Model Resumed**

Previous threat model detected:
- **Target**: [From state file]
- **Stages Completed**: [list, e.g., S1, S2, S3, S4]
- **Threats Identified**: [total] ([critical] critical, [high] high)
- **Trust Boundaries**: [count]
- **Entry Points**: [count]
- **Last Updated**: [timestamp]

**Quick Actions:**
- `/randori:pasta --resume` - Continue from where you left off
- `/randori:threat-report` - Generate report from completed stages
- `/randori:s4` - Re-run threat analysis
- Type "reset threat model" to start fresh

**Top Threats:**
[List top 3 threats by severity]
```

### If no state file exists:

Display welcome:

```
**Randori Threat Modeling Plugin Ready**

PASTA (Process for Attack Simulation and Threat Analysis) methodology
with STRIDE classification and MITRE ATT&CK mapping.

**Available Commands:**
- `/randori:pasta` - Full PASTA run (Stages 1-4)
- `/randori:s1` - Stage 1: Define business objectives
- `/randori:s2` - Stage 2: Technical scope
- `/randori:s3` - Stage 3: Application decomposition + DFD
- `/randori:s4` - Stage 4: Threat analysis (STRIDE + ATT&CK)

**What You Get:**
- STRIDE-classified threat scenarios with evidence
- MITRE ATT&CK technique mapping
- Data flow diagrams (Mermaid)
- Attack tree drafts
- 5-factor probabilistic risk assessment

Type `/randori:pasta` to begin a full threat model.
```

## Pro Mode Detection

Check for API key:

```bash
cat randori-output/randori.local.md 2>/dev/null | head -5
```

If the file contains `randori_api_key` in YAML frontmatter:

```
**Pro Mode Active** — Stages 5-7 available: Vulnerability Analysis, Attack Modeling, Risk Management
```

If no API key, this is community mode (S1-S4 only). Do not mention Pro mode unless the user asks about stages 5-7.
