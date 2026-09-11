import { getServerSupabase } from './db';

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean);

export async function isAdmin(): Promise<boolean> {
  const supabase = await getServerSupabase();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user?.email) return false;
  if (ADMIN_EMAILS.length === 0) return true;
  return ADMIN_EMAILS.includes(session.user.email.toLowerCase());
}

export function sameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  const siteOrigin = process.env.SITE_ORIGIN || new URL(request.url).origin;
  return origin === siteOrigin;
}

export async function allowContact(request: Request): Promise<boolean> {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const salt = process.env.RATE_SALT || 'noema-contact';
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(salt + ip));
  const hash = Array.from(new Uint8Array(digest)).map(x => x.toString(16).padStart(2, '0')).join('');
  const now = Math.floor(Date.now() / 1000);
  const windowExpiry = now + 3600;

  const supabase = await getServerSupabase();
  const { data: existing } = await supabase.from('rate_limits').select('hits,expires').eq('key', hash).maybeSingle();

  let hits: number;
  if (!existing || existing.expires < now) {
    hits = 1;
    await supabase.from('rate_limits').upsert({ key: hash, hits, expires: windowExpiry });
  } else {
    hits = existing.hits + 1;
    await supabase.from('rate_limits').update({ hits, expires: existing.expires }).eq('key', hash);
  }

  await supabase.from('rate_limits').delete().lt('expires', now - 3600);
  return hits <= 5;
}
