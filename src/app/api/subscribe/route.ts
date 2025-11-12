import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

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

    // Send email notification via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'onboarding@resend.dev',
            to: ['harshjadhavconnect@gmail.com'],
            subject: 'New Portfolio Subscriber',
            html: `
              <div style="font-family: 'JetBrains Mono', monospace; padding: 20px; border: 1px dashed #1A1B1E; border-radius: 4px; max-width: 600px;">
                <h2 style="font-family: 'Instrument Serif', serif; font-size: 24px; margin-bottom: 16px;">New Subscriber!</h2>
                <p style="font-size: 14px; color: #858585; margin-bottom: 8px;">Someone just subscribed to your portfolio newsletter:</p>
                <p style="font-size: 16px; font-weight: 600; padding: 12px; background: #0F1011; border: 1px dashed #1A1B1E; border-radius: 4px;">
                  ${email}
                </p>
                <p style="font-size: 12px; color: #858585; margin-top: 16px;">
                  Subscribed at: ${new Date().toLocaleString()}
                </p>
              </div>
            `,
          }),
        });

        const data = await res.json();
        
        if (!res.ok) {
          console.error('Resend API error:', res.status, data);
        } else {
          console.log('Email sent successfully:', data);
        }
      } catch (emailError) {
        console.error('Email notification error:', emailError);
      }
    } else {
      console.log('RESEND_API_KEY not found, skipping email notification');
    }

    return NextResponse.json({ success: true, message: 'Subscribed successfully!' });
  } catch (error: any) {
    console.error('Subscribe error:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
