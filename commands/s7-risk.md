---
name: s7
description: "PASTA Stage 7: Risk management — residual risk analysis, mitigation strategies, prioritized recommendations (Pro)"
argument-hint: "[path]"
allowed-tools:
  - Glob
  - Grep
  - Read
  - Write
  - TodoWrite
  - AskUserQuestion
---

# Stage 7: Risk Management (Pro)

Assess residual risk, define mitigation strategies, and produce prioritized recommendations.

> **Tool argument schema (CRITICAL):** When you invoke the `Write` tool, use
> `file_path` + `content` (snake_case), not `filePath`/`text`. Same for
> `Edit` and `Read`. camelCase belongs only inside the JSON payload.

## Pro Mode Required

This stage requires a Randori API key. Check `randori-output/randori.local.md` for configuration.

If no API key is found, display:

```
Stage 7 (Risk Management) requires Pro mode.

In community mode, you can use the threat scenarios from Stage 4
to manually prioritize mitigations based on probability and impact.

Pro mode provides:
- Formal residual risk calculations
- Mitigation strategy recommendations with effort estimates
- Risk acceptance/transfer/avoid/mitigate decision framework
- Compliance-mapped recommendations (ISO 27001, SOC 2, NIST)
- Executive summary for stakeholders

To enable Pro mode, add your API key to `randori-output/randori.local.md`.
```

## What Pro Mode Provides

1. **Residual Risk Analysis** — After existing controls:
   - Current controls effectiveness assessment
   - Residual risk per threat scenario
   - Risk heat map (likelihood x impact)

2. **Mitigation Strategies** — For each unacceptable risk:
   - Risk treatment option: mitigate | transfer | accept | avoid
   - Specific countermeasures with implementation guidance
   - Effort estimate: low | medium | high
   - Priority ranking by risk reduction per effort

3. **Compliance Mapping** — Recommendations mapped to standards:
   - ISO 27001 controls addressed by each mitigation
   - SOC 2 trust criteria coverage
   - NIST 800-53 control implementation

4. **Executive Summary** — Stakeholder-ready output:
   - Risk posture overview
   - Top 5 risks requiring immediate action
   - Investment recommendations
   - Timeline for risk reduction

## Output

Structured risk management saved to `randori-output/pasta-s7.json`.
Complete threat model report generated.
