# Security Policy

## Reporting Security Issues

If you discover a security issue in this project, please report it by sending an email to mikecerqua@gmail.com. Please do not create public GitHub issues for security vulnerabilities.

## Credential Management

This project uses environment variables for managing sensitive credentials. You should **NEVER**:

- Commit credentials directly to the codebase
- Hardcode API keys, passwords, or secrets in any file
- Place `.env` files in the repository
- Share credentials in comments, issues, or pull requests

## Environment Variables

Set environment variables in your hosting platform (e.g., Netlify):

1. Log in to your hosting provider dashboard
2. Navigate to environment settings
3. Add variables there, never in code or config files
4. For local development, use `.env` files (listed in `.gitignore`)

## Required Environment Variables

This project requires the following environment variables:

```
MAILGUN_SMTP_HOST=your_mailgun_smtp_host
MAILGUN_SMTP_PORT=your_mailgun_smtp_port
MAILGUN_SMTP_USER=your_mailgun_smtp_username
MAILGUN_SMTP_PASS=your_mailgun_smtp_password
RECIPIENT_EMAIL=email_to_receive_form_submissions
```

## Best Practices

- Reset credentials if they are accidentally exposed
- Use different credentials for development and production
- Regularly rotate credentials
- Use the minimum required permissions for service accounts
- Monitor credential usage for unauthorized access
