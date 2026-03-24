---
name: STRIDE Classification
description: >-
  This skill should be used when classifying threats using STRIDE methodology,
  when the user mentions "STRIDE", "spoofing threats", "tampering threats",
  "repudiation", "information disclosure", "denial of service", "elevation of
  privilege", or needs to categorize security threats by type.
version: 1.0.0
---

# STRIDE Threat Classification

## Purpose

Systematic threat categorization using the STRIDE model (Microsoft). Each category maps to a specific security property violation.

## When to Use

- During PASTA Stage 4 (threat analysis)
- When categorizing identified vulnerabilities
- When mapping threats to security controls
- When building threat scenarios

## The 6 STRIDE Categories

### S — Spoofing (Violates: Authentication)

**Definition**: Pretending to be something or someone other than yourself.

**Code patterns**:
- Missing authentication on endpoints
- Weak token validation (no algorithm check, no expiry check)
- Hardcoded credentials or API keys
- Missing mutual TLS for service-to-service communication
- Session fixation vulnerabilities

**MITRE ATT&CK**: T1078 (Valid Accounts), T1110 (Brute Force), T1539 (Steal Web Session Cookie), T1557 (Adversary-in-the-Middle)

**OWASP**: A07 (Identification and Authentication Failures)

**CWEs**: CWE-287, CWE-798, CWE-384, CWE-306

---

### T — Tampering (Violates: Integrity)

**Definition**: Modifying data or code without authorization.

**Code patterns**:
- SQL injection (string concatenation in queries)
- Cross-site scripting (unescaped output)
- Command injection (unsanitized input in system calls)
- Missing CSRF protection on state-changing endpoints
- No integrity verification on data imports
- Missing input validation

**MITRE ATT&CK**: T1059 (Command Scripting), T1190 (Exploit Public-Facing Application), T1565 (Data Manipulation)

**OWASP**: A03 (Injection), A08 (Software and Data Integrity Failures)

**CWEs**: CWE-89, CWE-79, CWE-78, CWE-352, CWE-20

---

### R — Repudiation (Violates: Non-repudiation)

**Definition**: Claiming to have not performed an action.

**Code patterns**:
- Missing audit logging for security-relevant events
- No logging of authentication events (login, logout, failed attempts)
- No logging of data modification (CRUD operations)
- Missing transaction logging
- Log entries that don't include user identity
- Logs without timestamps or with local time

**MITRE ATT&CK**: T1070 (Indicator Removal on Host), T1036 (Masquerading)

**OWASP**: A09 (Security Logging and Monitoring Failures)

**CWEs**: CWE-778, CWE-223, CWE-779

---

### I — Information Disclosure (Violates: Confidentiality)

**Definition**: Exposing information to unauthorized individuals.

**Code patterns**:
- Stack traces in production error responses
- Sensitive data in logs (passwords, tokens, PII)
- Verbose error messages revealing internal details
- Missing encryption for data at rest or in transit
- IDOR (Insecure Direct Object References)
- Directory listing enabled
- Overly permissive CORS
- Server version headers exposed

**MITRE ATT&CK**: T1552 (Unsecured Credentials), T1005 (Data from Local System), T1040 (Network Sniffing)

**OWASP**: A01 (Broken Access Control), A02 (Cryptographic Failures), A05 (Security Misconfiguration)

**CWEs**: CWE-200, CWE-209, CWE-532, CWE-311, CWE-639

---

### D — Denial of Service (Violates: Availability)

**Definition**: Making a system or resource unavailable.

**Code patterns**:
- No rate limiting on public endpoints
- Unbounded database queries (SELECT * without LIMIT)
- Missing pagination
- No request size limits
- Regex denial of service (ReDoS)
- Resource-intensive operations without timeouts
- Missing circuit breakers for external services

**MITRE ATT&CK**: T1498 (Network Denial of Service), T1499 (Endpoint Denial of Service)

**OWASP**: Typically intersects with A05 (Security Misconfiguration)

**CWEs**: CWE-400, CWE-770, CWE-1333

---

### E — Elevation of Privilege (Violates: Authorization)

**Definition**: Gaining access to resources or capabilities beyond authorization.

**Code patterns**:
- Missing authorization checks on admin endpoints
- IDOR allowing access to other users' data
- Mass assignment (unfiltered request body updates model)
- Privilege escalation via role manipulation
- Missing object-level authorization
- Path traversal

**MITRE ATT&CK**: T1068 (Exploitation for Privilege Escalation), T1548 (Abuse Elevation Control Mechanism)

**OWASP**: A01 (Broken Access Control)

**CWEs**: CWE-269, CWE-285, CWE-639, CWE-915, CWE-22

## STRIDE per Element

When analyzing a DFD, apply STRIDE selectively based on element type:

| DFD Element | S | T | R | I | D | E |
|-------------|---|---|---|---|---|---|
| External Entity | X | | | | | |
| Process | X | X | X | X | X | X |
| Data Store | | X | X | X | X | |
| Data Flow | | X | | X | X | |

- External entities can only be spoofed
- Processes are vulnerable to all 6 categories
- Data stores can be tampered, disclosed, denied, or made unavailable
- Data flows can be tampered, disclosed, or denied
