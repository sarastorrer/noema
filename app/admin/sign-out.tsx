'use client';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string || '';

export default function SignOut() {
  const [busy, setBusy] = useState(false);
  async function signOut() {
    setBusy(true);
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: true },
    });
    await supabase.auth.signOut();
    document.cookie = 'sb-access-token=; path=/; max-age=0';
    window.location.reload();
  }
  return <Button variant="outline" disabled={busy} onClick={signOut}>{busy ? 'Saindo…' : 'Trocar de conta'}</Button>;
}
