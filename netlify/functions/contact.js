// netlify/functions/send-email.js
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const data = JSON.parse(event.body);

  const { name, email, mobile, message } = data;

  try {
    const result = await resend.emails.send({
      from: 'Website Contact <azneducation.com>', // or your verified domain
      to: ['educationazn@gmail.com'], // your Gmail
      subject: `New Contact from ${name}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, id: result.data.id }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
