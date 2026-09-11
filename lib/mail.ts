import { supabaseAdmin } from './db';

export type Contact = { id: string; name: string; email: string; subject: string; message: string; delivery: string; created_at: string };

export function mailReady(): boolean {
  return !!(process.env.CONTACT_EMAIL && process.env.RESEND_API_KEY && process.env.CONTACT_FROM);
}

export async function deliver(contact: Contact): Promise<boolean> {
  if (!mailReady()) return false;
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `noema-${contact.id}`,
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM,
        to: [process.env.CONTACT_EMAIL],
        reply_to: contact.email,
        subject: `[NOEMA] ${contact.subject.replace(/[\r\n]/g, ' ')}`,
        text: `Nome: ${contact.name}\nE-mail: ${contact.email}\n\n${contact.message}`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return false;
    await supabaseAdmin.from('contacts').update({ delivery: 'forwarded' }).eq('id', contact.id);
    return true;
  } catch {
    return false;
  }
}
