import { supabaseAdmin } from '@/lib/db';
import { isAdmin, sameOrigin } from '@/lib/security';
import { articleInput, limitedJson } from '@/lib/validation';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!sameOrigin(request) || !(await isAdmin())) return Response.json({ error: 'Acesso restrito.' }, { status: 403 });
  let input;
  try {
    input = articleInput.safeParse(await limitedJson(request));
  } catch {
    return Response.json({ error: 'Conteúdo inválido ou muito grande.' }, { status: 400 });
  }
  if (!input.success || !input.data.version) return Response.json({ error: 'Confira os campos do artigo.' }, { status: 400 });
  const a = input.data;
  const { id } = await params;
  const updated_at = new Date().toISOString();
  try {
    const { data, error } = await supabaseAdmin
      .from('articles')
      .update({
        slug: a.slug, title: a.title, excerpt: a.excerpt, category: a.category,
        series: a.series, body: a.body, sources: a.sources, cover: a.cover,
        status: a.status, published_at: a.published_at, updated_at,
        version: a.version + 1,
      })
      .eq('id', id)
      .eq('version', a.version)
      .select()
      .maybeSingle();
    if (error) {
      const conflict = error.code === '23505';
      return Response.json({ error: conflict ? 'Esse endereço já está em uso.' : 'Não foi possível salvar. Seu texto foi preservado.' }, { status: conflict ? 409 : 503 });
    }
    if (!data) return Response.json({ error: 'O artigo mudou em outra janela. Copie seu texto antes de recarregar.' }, { status: 409 });
    return Response.json({ ...a, id, updated_at, version: a.version + 1 });
  } catch {
    return Response.json({ error: 'Não foi possível salvar. Seu texto foi preservado.' }, { status: 503 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!sameOrigin(request) || !(await isAdmin())) return Response.json({ error: 'Acesso restrito.' }, { status: 403 });
  const { id } = await params;
  try {
    const input = await limitedJson(request, 1000);
    if (!Number.isInteger(input.version)) return Response.json({ error: 'Versão inválida.' }, { status: 400 });
    const { data, error } = await supabaseAdmin
      .from('articles')
      .delete()
      .eq('id', id)
      .eq('version', input.version)
      .select();
    if (error) return Response.json({ error: 'Não foi possível excluir.' }, { status: 503 });
    if (!data || data.length === 0) return Response.json({ error: 'O artigo mudou. Recarregue antes de excluir.' }, { status: 409 });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: 'Não foi possível excluir.' }, { status: 503 });
  }
}
