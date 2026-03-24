# Randori - PASTA Threat Modeling Plugin

An AI-powered threat modeling plugin implementing the PASTA (Process for Attack Simulation and Threat Analysis) methodology with STRIDE classification, MITRE ATT&CK mapping, and evidence-anchored threat scenarios.

## Project Structure

```
randori-plugin/
├── .claude-plugin/plugin.json   # Plugin manifest
├── CLAUDE.md                    # This file
├── commands/                    # PASTA stage commands
│   ├── pasta.md                 # /randori:pasta — full 7-stage run
│   ├── s1-objectives.md         # /randori:s1 — define business objectives
│   ├── s2-scope.md              # /randori:s2 — technical scope
│   ├── s3-decompose.md          # /randori:s3 — app decomposition + DFD
│   ├── s4-threats.md            # /randori:s4 — threat analysis (STRIDE)
│   ├── s5-vulns.md              # /randori:s5 — vulnerability analysis
│   ├── s6-attacks.md            # /randori:s6 — attack modeling
│   ├── s7-risk.md               # /randori:s7 — risk management
│   └── threat-report.md         # /randori:threat-report — generate report
├── agents/                      # Specialized threat modeling agents
│   ├── threat-analyst.md        # STRIDE threats + ATT&CK mapping
│   ├── attack-modeler.md        # Attack trees + attack surface
│   ├── risk-assessor.md         # Probabilistic risk scoring
│   └── vuln-correlator.md       # CVE/CWE correlation
├── skills/                      # Threat modeling knowledge
│   ├── stride-classification/   # STRIDE threat categorization
│   ├── pasta-methodology/       # PASTA stage knowledge
│   ├── mitre-attack-mapping/    # ATT&CK technique reference
│   ├── attack-tree-generation/  # Attack tree construction
│   └── dfd-generation/          # Data flow diagram creation
├── hooks/
│   └── session-start.md         # Session initialization
└── references/
    └── threat-model.schema.json # Threat model output contract
```

## Key Commands

- `/randori:pasta` — Full PASTA run (all stages sequentially)
- `/randori:s1` through `/randori:s4` — Individual free-tier stages
- `/randori:s5` through `/randori:s7` — Pro-tier stages (requires API key)
- `/randori:threat-report` — Generate report from completed stages

## PASTA Methodology

7-stage process, each building on the previous:

| Stage | Name | Free | Output |
|-------|------|------|--------|
| S1 | Define Objectives | Yes | Business/security/compliance requirements |
| S2 | Technical Scope | Yes | Software components, actors, services |
| S3 | Decomposition | Yes | DFD, use cases, trust boundaries, entry points |
| S4 | Threat Analysis | Yes | STRIDE threats, ATT&CK mapping, attack trees |
| S5 | Vulnerability Analysis | Pro | CVE/CWE correlation, weak patterns |
| S6 | Attack Modeling | Pro | Full attack trees, simulation results |
| S7 | Risk Management | Pro | Residual risk, mitigations, prioritization |

## Threat Classification

- **STRIDE**: Spoofing, Tampering, Repudiation, Information Disclosure, DoS, Elevation of Privilege
- **MITRE ATT&CK**: Enterprise technique mapping (T-codes)
- **CAPEC**: Common Attack Pattern Enumeration
- **OWASP Top 10 (2021)**: Web application risk mapping

## Evidence Anchoring

Every threat scenario MUST include evidence anchors linking to specific code:
- File path (relative to repo root)
- Line number
- Description of why this code is relevant to the threat

## State Files

- `.claude/randori-state.json` — Machine-readable threat model state
- `.claude/threat-model.md` — Human-readable threat model report
- `.claude/dfd.mmd` — Mermaid DFD diagram
