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

  // Create Nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'postmaster@sandbox206b88d8d50946179b90938caabb2124.mailgun.org',
      pass: 'cae3446a94fc51f8d106d5c1da0be463-3af52e3b-37d182ef'
    }
  });

  // Email content
  const mailOptions = {
    from: `"${data.name}" <${data.email}>`,
    to: 'mikecerqua@gmail.com',
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
      body: JSON.stringify({ message: 'Error sending email', error: error.message })
    };
  }
};