import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface FormData {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  message: string;
  honeypot?: string; // For spam prevention
}

// Configure the email transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Validate form data
const validateFormData = (data: FormData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.name?.trim()) {
    errors.push('Name is required');
  }

  if (!data.businessName?.trim()) {
    errors.push('Business name is required');
  }

  if (!data.email?.trim()) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Invalid email format');
  }

  if (!data.phone?.trim()) {
    errors.push('Phone number is required');
  } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(data.phone.replace(/[\s\-\(\)]/g, ""))) {
    errors.push('Invalid phone number format');
  }

  if (!data.message?.trim()) {
    errors.push('Business goals are required');
  }

  // Check honeypot for spam prevention
  if (data.honeypot && data.honeypot.trim() !== '') {
    errors.push('Spam detected');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Create HTML email template
const createEmailHTML = (data: FormData): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .field-label { font-weight: bold; color: #555; }
            .field-value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border-left: 4px solid #667eea; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>New Digital Health Check Request</h2>
                <p>A new potential client has submitted a request through MeridianDigital website.</p>
            </div>
            <div class="content">
                <div class="field">
                    <div class="field-label">Full Name:</div>
                    <div class="field-value">${data.name}</div>
                </div>
                
                <div class="field">
                    <div class="field-label">Business Name:</div>
                    <div class="field-value">${data.businessName}</div>
                </div>
                
                <div class="field">
                    <div class="field-label">Email Address:</div>
                    <div class="field-value">
                        <a href="mailto:${data.email}">${data.email}</a>
                    </div>
                </div>
                
                <div class="field">
                    <div class="field-label">Phone Number:</div>
                    <div class="field-value">
                        <a href="tel:${data.phone}">${data.phone}</a>
                    </div>
                </div>
                
                <div class="field">
                    <div class="field-label">Business Goals:</div>
                    <div class="field-value">${data.message.replace(/\n/g, '<br>')}</div>
                </div>
                
                <div class="footer">
                    <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
                    <p><strong>Source:</strong> MeridianDigital Contact Form</p>
                </div>
            </div>
        </div>
    </body>
    </html>
  `;
};

export async function POST(request: NextRequest) {
  try {
    const data: FormData = await request.json();

    // Validate the form data
    const validation = validateFormData(data);
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }

    // Check if required environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email configuration missing');
      return NextResponse.json(
        { success: false, error: 'Email service temporarily unavailable' },
        { status: 500 }
      );
    }

    // Create email transporter
    const transporter = createTransporter();

    // Verify transporter configuration
    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error('Email transporter verification failed:', verifyError);
      return NextResponse.json(
        { success: false, error: 'Email service configuration error' },
        { status: 500 }
      );
    }

    // Prepare email content
    const emailHTML = createEmailHTML(data);
    const emailText = `
New Digital Health Check Request

Full Name: ${data.name}
Business Name: ${data.businessName}
Email: ${data.email}
Phone: ${data.phone}

Business Goals:
${data.message}

Submitted: ${new Date().toLocaleString()}
Source: MeridianDigital Contact Form
    `;

    // Send email
    const mailOptions = {
      from: `"MeridianDigital Contact Form" <${process.env.EMAIL_USER}>`,
      to: 'edkemppotter@gmail.com',
      subject: 'New Digital Health Check Request',
      text: emailText,
      html: emailHTML,
      replyTo: data.email,
    };

    await transporter.sendMail(mailOptions);

    // Log successful submission (for monitoring)
    console.log(`Form submission successful: ${data.name} (${data.email})`);

    return NextResponse.json({
      success: true,
      message: 'Your request has been received successfully!'
    });

  } catch (error) {
    console.error('Form submission error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'An unexpected error occurred. Please try again or contact us directly.' 
      },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
