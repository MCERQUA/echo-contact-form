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

  // Check for required environment variables
  if (!process.env.MAILGUN_SMTP_HOST || 
      !process.env.MAILGUN_SMTP_PORT || 
      !process.env.MAILGUN_SMTP_USER || 
      !process.env.MAILGUN_SMTP_PASS) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Server configuration error - missing environment variables',
        details: 'Please set up the required environment variables in Netlify'
      })
    };
  }

  // Create Nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: process.env.MAILGUN_SMTP_HOST,
    port: process.env.MAILGUN_SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.MAILGUN_SMTP_USER,
      pass: process.env.MAILGUN_SMTP_PASS
    }
  });

  // Email content
  const mailOptions = {
    from: `"${data.name}" <${data.email}>`,
    to: process.env.RECIPIENT_EMAIL || 'mikecerqua@gmail.com',
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
      body: JSON.stringify({ message: 'Email sent successfully' })
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Error sending email', 
        error: error.message
      })
    };
  }
};