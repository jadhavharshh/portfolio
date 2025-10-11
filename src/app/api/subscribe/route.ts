import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import nodemailer from 'nodemailer';

const sql = neon(process.env.DATABASE_URL!);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Create table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS subscribers (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        subscribed_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Insert subscriber
    await sql`
      INSERT INTO subscribers (email)
      VALUES (${email})
      ON CONFLICT (email) DO NOTHING
    `;

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'harshjadhavconnect@gmail.com',
      subject: 'New Portfolio Subscriber',
      text: `${email} just subscribed to your portfolio newsletter!`,
      html: `<p><strong>${email}</strong> just subscribed to your portfolio newsletter!</p>`,
    });

    return NextResponse.json({ success: true, message: 'Subscribed successfully!' });
  } catch (error: any) {
    console.error('Subscribe error:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
