import { supabaseAdmin, getServerSupabase } from './supabase';
import { Article, seedArticles } from './content';

export async function ensureSeed() {
  const { data: mark } = await supabaseAdmin.from('settings').select('value').eq('key', 'seed-v1').maybeSingle();
  if (mark) return;
  const rows = seedArticles.map(a => ({
    id: a.id, slug: a.slug, title: a.title, excerpt: a.excerpt, category: a.category,
    series: a.series, body: a.body, sources: a.sources, cover: a.cover, status: a.status,
    published_at: a.published_at, updated_at: a.updated_at, version: a.version,
  }));
  await supabaseAdmin.from('articles').upsert(rows, { onConflict: 'id' });
  await supabaseAdmin.from('settings').upsert({ key: 'seed-v1', value: 'done' });
}

function normalize(row: Record<string, unknown>): Article {
  return {
    ...row,
    updated_at: typeof row.updated_at === 'string' ? row.updated_at : new Date(row.updated_at as string).toISOString(),
  } as unknown as Article;
}

export async function getArticles(admin = false): Promise<Article[]> {
  await ensureSeed();
  const today = new Date().toISOString().slice(0, 10);
  const client = admin ? supabaseAdmin : await getServerSupabase();
  let query = client.from('articles').select('*');
  if (!admin) {
    query = query.eq('status', 'published').lte('published_at', today);
  }
  const { data, error } = await query.order('published_at', { ascending: false }).order('id', { ascending: true });
  if (error) throw new Error(error.message);
  return (data || []).map(normalize);
}

export async function getArticle(slug: string): Promise<Article | null> {
  await ensureSeed();
  const today = new Date().toISOString().slice(0, 10);
  const client = await getServerSupabase();
  const { data, error } = await client
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .lte('published_at', today)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data ? normalize(data as Record<string, unknown>) : null;
}

export { supabaseAdmin, getServerSupabase };
