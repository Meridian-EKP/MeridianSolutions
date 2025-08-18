import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    hasEmailUser: !!process.env.EMAIL_USER,
    hasEmailPass: !!process.env.EMAIL_PASS,
    emailUser: process.env.EMAIL_USER ? 'Set' : 'Not set',
    nodeEnv: process.env.NODE_ENV
  });
}
