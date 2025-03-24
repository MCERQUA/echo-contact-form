# Echo Contact Form with Mailgun Integration

A contact form website with Mailgun SMTP integration that can be deployed to Netlify. Once configured, this form sends emails through Mailgun's SMTP service.

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

## Important Security Notice

⚠️ **BEFORE USING THIS REPOSITORY:**
1. You **MUST** set up environment variables in Netlify for your Mailgun credentials
2. The form will not function until these variables are set
3. Never commit SMTP credentials or API keys to public repositories

## Deployment Instructions

1. Log in to Netlify (https://app.netlify.com/)
2. Click "Add new site" > "Import an existing project"
3. Select your GitHub account and this repository
4. Click "Deploy site"

## Required Environment Variables

You **MUST** set up these environment variables for the form to work:

1. Deploy your site first
2. Go to Site settings > Environment > Environment variables
3. Add the following variables:
   - `MAILGUN_SMTP_HOST`: Your Mailgun SMTP host
   - `MAILGUN_SMTP_PORT`: Your Mailgun SMTP port (typically 587)
   - `MAILGUN_SMTP_USER`: Your Mailgun SMTP username
   - `MAILGUN_SMTP_PASS`: Your Mailgun SMTP password
   - `RECIPIENT_EMAIL`: Email address to receive form submissions
4. Click "Save"
5. Redeploy your site (Go to Deploys > Trigger deploy > Deploy site)

## Customization

To change the recipient email address:
1. Set the `RECIPIENT_EMAIL` environment variable in Netlify
2. Update the success message in index.html and thank-you.html

## Credits

Created by Echo AI Systems | March 24, 2025