import { supabaseAdmin } from '@/lib/db';
import { isAdmin, sameOrigin } from '@/lib/security';
import { deliver, mailReady, Contact } from '@/lib/mail';

export async function POST(request: Request) {
  if (!sameOrigin(request) || !(await isAdmin())) return Response.json({ error: 'Acesso restrito.' }, { status: 403 });
  if (!mailReady()) return Response.json({ error: 'O serviço de e-mail ainda não foi conectado.' }, { status: 503 });
  try {
    const { data, error } = await supabaseAdmin
      .from('contacts')
      .select('*')
      .eq('delivery', 'pending')
      .order('created_at')
      .limit(10);
    if (error) throw new Error(error.message);
    const rows = (data || []) as unknown as Contact[];
    let sent = 0;
    for (const c of rows) {
      if (await deliver(c)) sent++;
    }
    return Response.json({ sent, total: rows.length });
  } catch {
    return Response.json({ error: 'Não foi possível encaminhar as mensagens.' }, { status: 503 });
  }
}
