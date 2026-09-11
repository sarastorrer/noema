import { getServerSupabase } from '@/lib/db';
import { sameOrigin, allowContact } from '@/lib/security';
import { contactInput, limitedJson } from '@/lib/validation';
import { deliver } from '@/lib/mail';

export async function POST(request: Request) {
  if (!sameOrigin(request)) return Response.json({ error: 'Envie a mensagem pelo formulário da revista.' }, { status: 403 });
  let result;
  try {
    result = contactInput.safeParse(await limitedJson(request, 20000));
  } catch {
    return Response.json({ error: 'Mensagem inválida ou muito longa.' }, { status: 400 });
  }
  if (!result.success) return Response.json({ error: 'Confira os campos e escreva uma mensagem com pelo menos 10 caracteres.' }, { status: 400 });
  if (result.data.website) return Response.json({ error: 'Não foi possível validar o envio.' }, { status: 400 });
  try {
    if (!(await allowContact(request))) return Response.json({ error: 'Limite de mensagens atingido. Tente novamente em uma hora.' }, { status: 429 });
    const { website, ...data } = result.data;
    const id = crypto.randomUUID();
    const created_at = new Date().toISOString();
    const supabase = await getServerSupabase();
    const { error } = await supabase.from('contacts').insert({
      id, name: data.name, email: data.email, subject: data.subject,
      message: data.message, delivery: 'pending', created_at,
    });
    if (error) return Response.json({ error: 'Não foi possível registrar sua mensagem. Tente novamente em instantes.' }, { status: 503 });
    await deliver({ id, ...data, delivery: 'pending', created_at });
    return Response.json({ message: 'Mensagem registrada na redação. Obrigado por escrever à NOEMA.' }, { status: 201 });
  } catch {
    return Response.json({ error: 'Não foi possível registrar sua mensagem. Tente novamente em instantes.' }, { status: 503 });
  }
}
