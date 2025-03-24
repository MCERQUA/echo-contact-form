const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' })
    };
  }

  // Parse the request body
  let data;
  try {
    data = JSON.parse(event.body);
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid request body' })
    };
  }

  // Check for required fields
  if (!data.name || !data.email || !data.message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Required fields missing' })
    };
  }

  // Configure mailgun settings
  // First check for environment variables, then fall back to hardcoded values
  const mailgunHost = process.env.MAILGUN_SMTP_HOST || 'smtp.mailgun.org';
  const mailgunPort = process.env.MAILGUN_SMTP_PORT || 587;
  const mailgunUser = process.env.MAILGUN_SMTP_USER || 'postmaster@sandbox206b88d8d50946179b90938caabb2124.mailgun.org';
  const mailgunPass = process.env.MAILGUN_SMTP_PASS || 'cae3446a94fc51f8d106d5c1da0be463-3af52e3b-37d182ef';
  const recipientEmail = process.env.RECIPIENT_EMAIL || 'mikecerqua@gmail.com';

  // Log which configuration is being used (environment or fallback)
  console.log(`Using SMTP host: ${mailgunHost}`);
  console.log(`Using SMTP port: ${mailgunPort}`);
  console.log(`Using SMTP user: ${mailgunUser}`);
  console.log(`Using recipient email: ${recipientEmail}`);
  console.log(`Using environment variables: ${!!process.env.MAILGUN_SMTP_HOST}`);

  // Create Nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: mailgunHost,
    port: mailgunPort,
    secure: false, // true for 465, false for other ports
    auth: {
      user: mailgunUser,
      pass: mailgunPass
    }
  });

  // Email content
  const mailOptions = {
    from: `"${data.name}" <${data.email}>`,
    to: recipientEmail,
    subject: `Contact Form: ${data.subject || 'New Message'}`,
    text: `
      Name: ${data.name}
      Email: ${data.email}
      Phone: ${data.phone || 'Not provided'}
      Subject: ${data.subject || 'General Inquiry'}
      
      Message:
      ${data.message}
    `,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
      <p><strong>Subject:</strong> ${data.subject || 'General Inquiry'}</p>
      <h4>Message:</h4>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
    `
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Email sent successfully',
        recipient: recipientEmail,
        using_env_vars: !!process.env.MAILGUN_SMTP_HOST
      })
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Error sending email', 
        error: error.message,
        using_env_vars: !!process.env.MAILGUN_SMTP_HOST
      })
    };
  }
};