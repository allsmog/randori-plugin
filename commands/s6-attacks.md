---
name: s6
description: "PASTA Stage 6: Attack modeling — full attack trees, attack surface analysis, simulation results (Pro)"
argument-hint: "[path]"
allowed-tools:
  - Glob
  - Grep
  - Read
  - Write
  - TodoWrite
  - AskUserQuestion
---

# Stage 6: Attack Modeling (Pro)

Build complete attack trees, analyze the full attack surface, and simulate attack scenarios.

## Pro Mode Required

This stage requires a Randori API key. Check `randori-output/randori.local.md` for configuration.

If no API key is found, display:

```
Stage 6 (Attack Modeling) requires Pro mode.

In community mode, you have draft attack trees from Stage 4.
Pro mode provides:
- Full multi-level attack trees with probability propagation
- Complete attack surface enumeration
- Simulated attack scenarios with step-by-step paths
- ATT&CK kill chain mapping

To enable Pro mode, add your API key to `randori-output/randori.local.md`.
```

## What Pro Mode Provides

1. **Complete Attack Trees** — Expand S4 drafts into full trees:
   - AND/OR node decomposition to LEAF level
   - Probability propagation (AND = product, OR = max)
   - ATT&CK technique at every LEAF node
   - CAPEC pattern at attack-pattern nodes
   - Mermaid diagram generation

2. **Attack Surface Analysis** — Comprehensive enumeration:
   - All entry points with trust level assessment
   - Exposed API surface area
   - Third-party integration risk
   - Configuration surface (env vars, secrets)

3. **Attack Simulation** — For each high/critical attack tree:
   - Step-by-step attack path walkthrough
   - Required attacker capabilities
   - Detection opportunities at each step
   - Time-to-exploit estimation

## Output

Structured attack modeling saved to `randori-output/pasta-s6.json`.
