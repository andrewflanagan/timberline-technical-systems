export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const TO_EMAIL = 'hello@timberlinetechnicalsystems.com';
const FROM_EMAIL = 'Timberline Contact <hello@timberlinecodeforge.com>';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error('Missing RESEND_API_KEY');
    return json({ error: 'Email service is not configured.' }, 500);
  }

  const formData = await request.formData();

  const name = clean(formData.get('name'));
  const email = clean(formData.get('email'));
  const organization = clean(formData.get('organization'));
  const message = clean(formData.get('message'));

  if (!name || !email || !message) {
    return json({ error: 'Please fill out name, email, and message.' }, 400);
  }

  if (!emailPattern.test(email)) {
    return json({ error: 'Please enter a valid email address.' }, 400);
  }

  const subject = `New Timberline Technical Systems inquiry from ${name}${organization ? ` @ ${organization}` : ''}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Organization: ${organization || 'Not provided'}`,
    '',
    'Message:',
    message,
  ].join('\n');

  try {
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email,
      subject,
      text,
    });

    return json({ ok: true });
  } catch (error) {
    console.error('Error sending contact email', error);
    return json({ error: 'Failed to send email.' }, 500);
  }
};

function clean(value: FormDataEntryValue | null) {
  return value?.toString().trim() ?? '';
}

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
