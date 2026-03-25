---
name: s5
description: "PASTA Stage 5: Vulnerability analysis — CVE/CWE correlation, weak patterns, use/abuse case mapping (Pro)"
argument-hint: "[path]"
allowed-tools:
  - Glob
  - Grep
  - Read
  - TodoWrite
  - AskUserQuestion
---

# Stage 5: Vulnerability Analysis (Pro)

Map threat scenarios to known vulnerabilities (CVE/CWE), identify weak patterns, and build use/abuse case mappings.

## Pro Mode Required

This stage requires a Randori API key. Check `randori-output/randori.local.md` for configuration.

If no API key is found, display:

```
Stage 5 (Vulnerability Analysis) requires Pro mode.

In community mode, you can:
- Review threat scenarios from Stage 4
- Manually search for CVEs related to your dependencies
- Use `/shinsa:compliance-scan` for code-level vulnerability assessment

To enable Pro mode, add your API key to `randori-output/randori.local.md`:
---
randori_api_key: your-api-key-here
---
```

## What Pro Mode Provides

When API key is available, Stage 5 calls the Randori API to:

1. **CVE/CWE Correlation** — Match threats from S4 to known CVEs in your dependencies
   - NVD (National Vulnerability Database) search
   - OSV (Open Source Vulnerabilities) query by package
   - EPSS (Exploit Prediction Scoring System) probability scores
   - CISA KEV (Known Exploited Vulnerabilities) cross-reference

2. **Weak Pattern Analysis** — Identify code patterns known to be vulnerable
   - CWE-specific pattern matching
   - Framework-specific anti-patterns

3. **Use/Abuse Case Mapping** — For each use case from S3, define:
   - Normal use case (expected behavior)
   - Abuse case (how an attacker exploits it)
   - Misuse case (unintended but harmful usage)

4. **Vulnerability-Threat Linking** — Map S4 threat scenarios to specific vulnerabilities:
   - Threat → CWE → CVE chain
   - Evidence-anchored vulnerability instances

## Output

Structured vulnerability analysis saved to `randori-output/pasta-s5.json`.
