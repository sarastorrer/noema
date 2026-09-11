import { getServerSupabase } from '@/lib/db';

export type ChatGPTUser = {
  userId: string;
  displayName: string;
  email: string;
  fullName: string | null;
};

export async function getChatGPTUser(): Promise<ChatGPTUser | null> {
  const supabase = await getServerSupabase();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) return null;
  return {
    userId: session.user.id,
    displayName: session.user.email || '',
    email: session.user.email || '',
    fullName: null,
  };
}

export async function requireChatGPTUser(returnTo: string): Promise<ChatGPTUser> {
  const user = await getChatGPTUser();
  if (user) return user;
  throw new Error('redirect:/admin');
}

export function chatGPTSignInPath(returnTo: string): string {
  return '/admin';
}

export function chatGPTSignOutPath(returnTo = '/'): string {
  return '/admin';
}
