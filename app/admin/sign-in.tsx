'use client';
import { useState, FormEvent } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export default function SignIn() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError('');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true },
    });
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: String(data.email),
      password: String(data.password),
    });
    if (error) {
      setError(error.message);
      setBusy(false);
    } else if (authData.session) {
      document.cookie = `sb-access-token=${authData.session.access_token}; path=/; max-age=3600; SameSite=Lax`;
      window.location.reload();
    }
  }

  return (
    <form onSubmit={submit} className="contact-form">
      <span className="eyebrow">ACESSO À REDAÇÃO</span>
      <label htmlFor="email">E-mail
        <Input id="email" name="email" type="email" required autoComplete="email" placeholder="seu@email.com" />
      </label>
      <label htmlFor="password">Senha
        <Input id="password" name="password" type="password" required autoComplete="current-password" placeholder="••••••••" />
      </label>
      <Button type="submit" disabled={busy} className="send-button">
        {busy ? 'Entrando…' : 'Entrar'}
      </Button>
      {error && <p className="form-feedback error">{error}</p>}
    </form>
  );
}
