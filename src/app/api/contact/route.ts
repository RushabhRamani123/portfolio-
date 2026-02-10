import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, body } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !body) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Create transporter using Gmail SMTP
    // You'll need to use an App Password if you have 2FA enabled
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your Gmail App Password
      },
    });

    // Email options
    const mailOptions = {
      from: email, // Sender's email
      to: process.env.EMAIL_USER, // Your email where you want to receive messages
      replyTo: email, // Sender's email for easy reply
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 10px;">
          <h2 style="color: #0050FF; border-bottom: 2px solid #0050FF; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 10px 0;"><strong style="color: #333;">Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong style="color: #333;">Email:</strong> <a href="mailto:${email}" style="color: #0050FF;">${email}</a></p>
            <p style="margin: 10px 0;"><strong style="color: #333;">Subject:</strong> ${subject}</p>
            
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
              <strong style="color: #333;">Message:</strong>
              <p style="color: #555; line-height: 1.6; white-space: pre-wrap;">${body}</p>
            </div>
          </div>
          
          <p style="color: #888; font-size: 12px; margin-top: 20px; text-align: center;">
            This email was sent from your portfolio contact form.
          </p>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${body}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}
