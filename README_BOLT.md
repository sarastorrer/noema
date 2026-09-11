# Revista NOEMA — pacote para Bolt.new

Código completo do site: Next/Vinext, React, TypeScript, Cloudflare D1, Drizzle, Zod e CSS da identidade NOEMA.

Rotas: `/`, `/filosofia-da-inteligencia`, `/artigos/[slug]`, `/contato`, `/admin` e APIs de artigos/contato.

Configure no Bolt/Sites: `SITE_ORIGIN`, `ADMIN_EMAILS`, `CONTACT_EMAIL`, `RATE_SALT`. Para encaminhamento externo, também `RESEND_API_KEY` e `CONTACT_FROM` (remetente verificado). Sem essas duas últimas, o contato continua salvo na caixa de entrada privada do painel.

Preserve o binding D1 `DB`, a migração em `drizzle/`, a autenticação/allowlist do painel, a validação Zod, o rate limiting e o controle de versão otimista dos artigos.
