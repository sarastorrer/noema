import { getChatGPTUser } from '@/app/chatgpt-auth';
import { isAdmin } from '@/lib/security';
import { getArticles, supabaseAdmin } from '@/lib/db';
import { mailReady, Contact } from '@/lib/mail';
import { Header, Footer, Logo } from '@/components/magazine';
import Editor from './editor';
import SignIn from './sign-in';
import SignOut from './sign-out';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Área editorial', robots: { index: false, follow: false } };

export default async function Admin() {
  const user = await getChatGPTUser();
  if (!user) return (
    <>
      <Header />
      <main className="admin-signin">
        <Logo color="blue" />
        <span className="eyebrow">ACESSO À REDAÇÃO</span>
        <h1>O próximo texto começa aqui.</h1>
        <p>Entre com a conta autorizada para criar, editar e publicar artigos.</p>
        <SignIn />
      </main>
      <Footer />
    </>
  );
  if (!(await isAdmin())) return (
    <>
      <Header />
      <main className="admin-signin">
        <h1>Acesso restrito à redação.</h1>
        <p>Esta conta não tem permissão para editar a revista.</p>
        <SignOut />
      </main>
      <Footer />
    </>
  );
  try {
    const [articles, { data: contactRows }] = await Promise.all([
      getArticles(true),
      supabaseAdmin.from('contacts').select('*').order('created_at', { ascending: false }).limit(100),
    ]);
    return (
      <>
        <Header />
        <Editor initial={articles} contacts={(contactRows || []) as unknown as Contact[]} mailReady={mailReady()} />
        <Footer />
      </>
    );
  } catch {
    return (
      <>
        <Header />
        <main className="empty-page">
          <h1>A redação está temporariamente indisponível.</h1>
          <p>Não foi possível carregar os textos. Tente novamente em instantes.</p>
        </main>
        <Footer />
      </>
    );
  }
}
