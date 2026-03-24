---
name: MITRE ATT&CK Mapping
description: >-
  This skill should be used when mapping threats to MITRE ATT&CK techniques,
  when the user mentions "ATT&CK", "MITRE", "T-codes", "attack techniques",
  "tactics and techniques", "kill chain", or needs to reference the ATT&CK
  Enterprise framework for threat classification.
version: 1.0.0
---

# MITRE ATT&CK Enterprise Technique Reference

## Purpose

Map identified threats to MITRE ATT&CK Enterprise techniques for standardized threat classification and communication.

## When to Use

- During PASTA Stage 4 (threat analysis)
- When classifying identified vulnerabilities
- When communicating threats to security teams
- When building detection strategies

## ATT&CK Tactics (Kill Chain Phases)

| ID | Tactic | Description |
|----|--------|-------------|
| TA0001 | Initial Access | Gaining entry to the network/system |
| TA0002 | Execution | Running malicious code |
| TA0003 | Persistence | Maintaining access |
| TA0004 | Privilege Escalation | Gaining higher-level access |
| TA0005 | Defense Evasion | Avoiding detection |
| TA0006 | Credential Access | Stealing credentials |
| TA0007 | Discovery | Learning about the environment |
| TA0008 | Lateral Movement | Moving through the network |
| TA0009 | Collection | Gathering target data |
| TA0010 | Exfiltration | Stealing data |
| TA0011 | Command and Control | Communicating with compromised systems |
| TA0040 | Impact | Manipulating, disrupting, or destroying systems |

## Common Web Application Techniques

### Initial Access
| Technique | ID | STRIDE | Description |
|-----------|----|--------|-------------|
| Exploit Public-Facing App | T1190 | T, E | Exploiting vulnerabilities in internet-facing apps |
| Valid Accounts | T1078 | S | Using stolen or default credentials |
| Supply Chain Compromise | T1195 | T | Compromising software supply chain |

### Execution
| Technique | ID | STRIDE | Description |
|-----------|----|--------|-------------|
| Command and Scripting Interpreter | T1059 | T | Executing commands via injection |
| Server Software Component | T1505 | T, E | Web shells, SQL stored procedures |
| Exploitation for Client Execution | T1203 | T | XSS, browser exploitation |

### Credential Access
| Technique | ID | STRIDE | Description |
|-----------|----|--------|-------------|
| Brute Force | T1110 | S | Password guessing/spraying |
| Steal Web Session Cookie | T1539 | S | Session hijacking |
| Unsecured Credentials | T1552 | I | Credentials in files, code, env vars |
| Input Capture | T1056 | S, I | Keylogging, credential interception |

### Privilege Escalation
| Technique | ID | STRIDE | Description |
|-----------|----|--------|-------------|
| Exploitation for Privilege Escalation | T1068 | E | Exploiting software bugs |
| Abuse Elevation Control Mechanism | T1548 | E | Bypassing access controls |
| Access Token Manipulation | T1134 | S, E | Manipulating tokens/sessions |

### Discovery
| Technique | ID | STRIDE | Description |
|-----------|----|--------|-------------|
| Remote System Discovery | T1018 | I | SSRF, internal scanning |
| Network Service Discovery | T1046 | I | Port scanning |
| Application Window Discovery | T1010 | I | API enumeration |

### Exfiltration
| Technique | ID | STRIDE | Description |
|-----------|----|--------|-------------|
| Exfiltration Over Web Service | T1567 | I | Data theft via HTTP/API |
| Exfiltration Over Alternative Protocol | T1048 | I | DNS exfiltration, etc. |
| Automated Exfiltration | T1020 | I | Bulk data extraction |

### Impact
| Technique | ID | STRIDE | Description |
|-----------|----|--------|-------------|
| Data Destruction | T1485 | T | Deleting or corrupting data |
| Data Encrypted for Impact | T1486 | D | Ransomware |
| Service Stop | T1489 | D | Disrupting services |
| Defacement | T1491 | T | Modifying web content |

## STRIDE to ATT&CK Quick Reference

| STRIDE | Primary ATT&CK Techniques |
|--------|---------------------------|
| Spoofing | T1078, T1110, T1539, T1134 |
| Tampering | T1059, T1190, T1565, T1505 |
| Repudiation | T1070, T1036 |
| Information Disclosure | T1552, T1005, T1018, T1567 |
| Denial of Service | T1498, T1499, T1489 |
| Elevation of Privilege | T1068, T1548, T1134 |

## Usage in Threat Scenarios

When documenting a threat, include:

```
- **ATT&CK**: T1190 (Exploit Public-Facing Application)
  - Tactic: Initial Access (TA0001)
  - Platforms: Linux, Windows, macOS
  - Data sources: Application logs, network traffic
```
