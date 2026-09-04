import { NextRequest, NextResponse } from 'next/server';

import { contactSchema } from '@/lib/validations/contact';

/**
 * POST /api/contact — handles a contact form submission.
 *
 * Parsed with the same schema the form uses, so the browser and the server
 * agree on what a valid message is, and a rejection comes back as per-field
 * `details` the form can display beside the offending input.
 */
export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Expected a JSON body' }, { status: 400 });
  }

  const validated = contactSchema.safeParse(body);
  if (!validated.success) {
    return NextResponse.json(
      {
        error: 'Validation failed',
        details: validated.error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      },
      { status: 400 }
    );
  }

  const { name, email, subject } = validated.data;

  try {
    // The message body is deliberately not logged: it is someone's private
    // enquiry, and logs are the wrong place for it.
    console.log('Contact form submission:', {
      name,
      email,
      subject,
      timestamp: new Date().toISOString(),
    });

    // TODO: send the notification email (Resend / Nodemailer). Until then the
    // submission is acknowledged and recorded in the application log only.

    return NextResponse.json(
      {
        message: 'Message sent successfully! I will get back to you soon.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
