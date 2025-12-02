# Security Policy

## Supported Versions

We currently provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security issue, please follow these guidelines:

### How to Report

1. **Do not** open a public GitHub issue for security vulnerabilities
2. Email security concerns to the repository maintainers directly
3. Include as much detail as possible:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- **Initial Response**: We aim to acknowledge your report within 48 hours
- **Investigation**: We will investigate and keep you informed of our progress
- **Resolution**: Once resolved, we will notify you and credit you (if desired) in our release notes

### Security Best Practices

When contributing to this project, please ensure:

- No secrets, API keys, or credentials are committed to the repository
- All user inputs are properly sanitized
- Dependencies are kept up to date
- Content Security Policy headers are properly configured in the Electron app
- The principle of least privilege is followed for permissions

### Dependency Security

We use:
- `npm audit` to check for known vulnerabilities in dependencies
- GitHub Dependabot for automated security updates
- Regular dependency reviews

## Security Features

This Electron application includes the following security measures:

1. **Content Security Policy (CSP)**: Restricts resource loading to prevent XSS attacks
2. **Context Isolation**: Enabled to prevent prototype pollution
3. **Node Integration**: Disabled in renderer process for security
4. **Secure IPC**: Uses contextBridge for safe main-renderer communication
5. **Input Sanitization**: User inputs are escaped before rendering

## Resources

- [Electron Security Best Practices](https://www.electronjs.org/docs/latest/tutorial/security)
- [OWASP Desktop App Security](https://owasp.org/www-project-desktop-app-security-top-10/)
