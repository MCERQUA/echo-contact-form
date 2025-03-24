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

## Security Considerations

- The Mailgun SMTP credentials are currently embedded in the serverless function code
- In a production environment, these should be moved to environment variables
- To set environment variables in Netlify:
  1. Go to Site settings > Build & deploy > Environment
  2. Add variables like MAILGUN_USER and MAILGUN_PASSWORD

## Customization

To change the recipient email address:
1. Edit the `to` field in the functions/sendmail.js file
2. Update the success message in index.html and thank-you.html

## Credits

Created by Echo AI Systems | March 24, 2025