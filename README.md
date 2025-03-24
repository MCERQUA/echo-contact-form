# Echo Contact Form with Mailgun Integration

A contact form website with Mailgun SMTP integration that can be deployed to Netlify. This form sends emails directly to mikecerqua@gmail.com through Mailgun's SMTP service.

## Features

- Clean, responsive design
- Form validation
- Email submissions using Mailgun SMTP
- Serverless function for email processing
- Ready to deploy to Netlify

## How It Works

This contact form uses Netlify Functions (AWS Lambda) to handle form submissions and send them to your email address using Mailgun SMTP. When a user submits the form, the following happens:

1. JavaScript intercepts the form submission
2. Form data is validated on the client side
3. Data is sent to a serverless function hosted on Netlify
4. The function uses Nodemailer to send the email via Mailgun SMTP
5. A success or error message is displayed to the user

## Deployment Instructions

1. Log in to Netlify (https://app.netlify.com/)
2. Click "Add new site" > "Import an existing project"
3. Select your GitHub account and this repository
4. Click "Deploy site"

Netlify will automatically detect the netlify.toml configuration and deploy the site with the serverless function.

## Environment Variables

The serverless function is configured to work without any setup, but it's recommended to set up environment variables for better security. To set up environment variables in Netlify:

1. Deploy your site first
2. Go to Site settings > Environment > Environment variables
3. Add the following variables:
   - `MAILGUN_SMTP_HOST`: smtp.mailgun.org
   - `MAILGUN_SMTP_PORT`: 587
   - `MAILGUN_SMTP_USER`: postmaster@sandbox206b88d8d50946179b90938caabb2124.mailgun.org
   - `MAILGUN_SMTP_PASS`: cae3446a94fc51f8d106d5c1da0be463-3af52e3b-37d182ef
   - `RECIPIENT_EMAIL`: mikecerqua@gmail.com
4. Click "Save"
5. Redeploy your site (Go to Deploys > Trigger deploy > Deploy site)

If you don't set these variables, the function will fallback to the hardcoded values.

## Site ID Information

- **Site name:** echo-contact-form
- **Owner:** MikeCerqua
- **Site ID:** 51d84a2f-68c1-4149-abb3-4d5be35fb0d9

## Customization

To change the recipient email address:
1. Set the `RECIPIENT_EMAIL` environment variable in Netlify
2. Or edit the `recipientEmail` variable in functions/sendmail.js
3. Update the success message in index.html and thank-you.html

## Credits

Created by Echo AI Systems | March 24, 2025