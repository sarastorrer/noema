import { supabaseAdmin, getArticles } from '@/lib/db';
import { isAdmin, sameOrigin } from '@/lib/security';
import { articleInput, limitedJson } from '@/lib/validation';

export async function GET() {
  if (!(await isAdmin())) return Response.json({ error: 'Acesso restrito.' }, { status: 403 });
  try {
    return Response.json(await getArticles(true), { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return Response.json({ error: 'Não foi possível carregar os artigos.' }, { status: 503 });
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request) || !(await isAdmin())) return Response.json({ error: 'Acesso restrito.' }, { status: 403 });
  let input;
  try {
    input = articleInput.safeParse(await limitedJson(request));
  } catch {
    return Response.json({ error: 'Conteúdo inválido ou muito grande.' }, { status: 400 });
  }
  if (!input.success) return Response.json({ error: 'Confira título, endereço, resumo, texto, fontes e data.' }, { status: 400 });
  const a = input.data;
  const id = crypto.randomUUID();
  const updated_at = new Date().toISOString();
  try {
    const { data, error } = await supabaseAdmin.from('articles').insert({
      id, slug: a.slug, title: a.title, excerpt: a.excerpt, category: a.category,
      series: a.series, body: a.body, sources: a.sources, cover: a.cover,
      status: a.status, published_at: a.published_at, updated_at, version: 1,
    }).select().single();
    if (error) {
      const conflict = error.code === '23505';
      return Response.json({ error: conflict ? 'Esse endereço já pertence a outro artigo.' : 'Não foi possível salvar. Seu texto continua no editor.' }, { status: conflict ? 409 : 503 });
    }
    return Response.json({ ...a, id: data.id, version: 1, updated_at }, { status: 201 });
  } catch {
    return Response.json({ error: 'Não foi possível salvar. Seu texto continua no editor.' }, { status: 503 });
  }
}
