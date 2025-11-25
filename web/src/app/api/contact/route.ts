import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface FormData {
  name: string;
  businessName: string;
  email: string;
  phoneCountry: string;
  phone: string;
  message: string;
  honeypot?: string; // For spam prevention
}

// Configure the email transporter
const createTransporter = () => {
  console.log('Creating transporter with:', {
    user: process.env.EMAIL_USER,
    passLength: process.env.EMAIL_PASS?.length || 0
  });
  
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    debug: true, // Add debug logging
    logger: true, // Add logging
    tls: {
      rejectUnauthorized: false // Accept self-signed certificates
    },
    secure: true, // Use TLS
    requireTLS: true // Require TLS
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
  } else {
    // Remove spaces, hyphens, parentheses, and dots for validation
    const cleanPhone = data.phone.replace(/[\s\-\(\)\.]/g, "");
    // Phone should be 6-15 digits (international standard)
    if (!/^[0-9]{6,15}$/.test(cleanPhone)) {
      errors.push('Invalid phone number format (6-15 digits required)');
    }
  }

  if (!data.phoneCountry?.trim()) {
    errors.push('Country code is required');
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
                <p>A new potential client has submitted a request through Meridian Labs website.</p>
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
                        <a href="tel:${data.phoneCountry}${data.phone}">${data.phoneCountry} ${data.phone}</a>
                    </div>
                </div>
                
                <div class="field">
                    <div class="field-label">Business Goals:</div>
                    <div class="field-value">${data.message.replace(/\n/g, '<br>')}</div>
                </div>
                
                <div class="footer">
                    <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
                    <p><strong>Source:</strong> Meridian Labs Contact Form</p>
                </div>
            </div>
        </div>
    </body>
    </html>
  `;
};

export async function POST(request: NextRequest) {
  console.log('POST /api/contact called');
  
  try {
    const data: FormData = await request.json();
    console.log('Form data received:', { 
      name: data.name, 
      email: data.email, 
      phone: data.phone,
      businessName: data.businessName 
    });

    // Validate the form data
    const validation = validateFormData(data);
    if (!validation.isValid) {
      console.log('Validation failed:', validation.errors);
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }

    // Check if required environment variables are set
    console.log('Checking environment variables:', {
      hasEmailUser: !!process.env.EMAIL_USER,
      hasEmailPass: !!process.env.EMAIL_PASS,
      emailUser: process.env.EMAIL_USER
    });
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email configuration missing - EMAIL_USER or EMAIL_PASS not set');
      return NextResponse.json(
        { success: false, error: 'Email service temporarily unavailable' },
        { status: 500 }
      );
    }

    // Create email transporter
    const transporter = createTransporter();

    // Verify transporter configuration
    try {
      console.log('Verifying transporter...');
      await transporter.verify();
      console.log('Transporter verified successfully');
    } catch (verifyError) {
      console.error('Email transporter verification failed:', verifyError);
      console.error('Verify error details:', {
        message: verifyError instanceof Error ? verifyError.message : 'Unknown error',
        code: (verifyError as Error & { code?: string })?.code,
        response: (verifyError as Error & { response?: string })?.response,
        responseCode: (verifyError as Error & { responseCode?: string })?.responseCode
      });
      return NextResponse.json(
        { 
          success: false, 
          error: 'Email service configuration error',
          details: verifyError instanceof Error ? verifyError.message : 'Unknown verification error'
        },
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
Phone: ${data.phoneCountry} ${data.phone}

Business Goals:
${data.message}

Submitted: ${new Date().toLocaleString()}
Source: Meridian Labs Contact Form
    `;

    // Send email
    const mailOptions = {
      from: `"Meridian Labs Contact Form" <${process.env.EMAIL_USER}>`,
      to: 'hello@meridianlabsgroup.xyz',
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
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    });
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'An unexpected error occurred. Please try again or contact us directly.',
        details: error instanceof Error ? error.message : 'Unknown error'
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
