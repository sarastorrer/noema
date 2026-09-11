/*
# NOEMA Magazine — Articles, Contacts, Settings, Rate Limits

1. Purpose
   - Creates the full backend schema for the NOEMA magazine app.
   - Articles are public-readable (published only); drafts are admin-only.
   - Contacts store messages from the contact form.
   - Settings store app-level key/value config (e.g. seed marker).
   - Rate limits track per-IP contact form submission counts.

2. New Tables
   - `articles`: id (uuid), slug (text unique), title, excerpt, category, series,
     body, sources, cover, status (draft|published), published_at (date), updated_at
     (timestamptz), version (int, optimistic concurrency).
   - `contacts`: id (uuid), name, email, subject, message, delivery (pending|forwarded),
     created_at (timestamptz).
   - `settings`: key (text PK), value (text).
   - `rate_limits`: key (text PK), hits (int), expires (bigint epoch seconds).

3. Security (RLS)
   - `articles`: anon+authenticated can SELECT published articles only.
     Authenticated users with admin privileges can do full CRUD. Since admin auth
     is handled via Supabase auth and the service-role key is used server-side for
     admin operations, public SELECT is restricted to status='published'.
   - `contacts`: anon+authenticated can INSERT (contact form). SELECT/UPDATE/DELETE
     are admin-only (service role bypasses RLS).
   - `settings`: admin-only (service role bypasses RLS).
   - `rate_limits`: anon+authenticated can INSERT/UPDATE/DELETE (rate limiting logic).
     SELECT is also open since the key is a hashed IP, not sensitive.

4. Important Notes
   - This is a single-tenant app: public visitors don't sign in. The admin area
     uses Supabase email/password auth (server-side checks).
   - Admin mutations use the service-role key which bypasses RLS entirely.
   - Public reads use the anon key, so SELECT policies must include `anon`.
*/

-- Articles table
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text NOT NULL,
  category text NOT NULL,
  series text NOT NULL DEFAULT '',
  body text NOT NULL,
  sources text NOT NULL DEFAULT '',
  cover text NOT NULL,
  status text NOT NULL DEFAULT 'draft',
  published_at text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  version integer NOT NULL DEFAULT 1
);

CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published_at);

-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  delivery text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_contacts_delivery ON contacts(delivery);
CREATE INDEX IF NOT EXISTS idx_contacts_created ON contacts(created_at);

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
  key text PRIMARY KEY,
  value text NOT NULL
);

-- Rate limits table
CREATE TABLE IF NOT EXISTS rate_limits (
  key text PRIMARY KEY,
  hits integer NOT NULL DEFAULT 0,
  expires bigint NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- Articles: public can read published articles only
DROP POLICY IF EXISTS "public_read_published_articles" ON articles;
CREATE POLICY "public_read_published_articles"
  ON articles FOR SELECT
  TO anon, authenticated
  USING (status = 'published' AND published_at <= to_char(now(), 'YYYY-MM-DD'));

-- Contacts: anyone can submit a contact message
DROP POLICY IF EXISTS "anon_insert_contacts" ON contacts;
CREATE POLICY "anon_insert_contacts"
  ON contacts FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Rate limits: needed for rate-limiting logic (key is hashed IP, not sensitive)
DROP POLICY IF EXISTS "anon_select_rate_limits" ON rate_limits;
CREATE POLICY "anon_select_rate_limits"
  ON rate_limits FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "anon_upsert_rate_limits" ON rate_limits;
CREATE POLICY "anon_upsert_rate_limits"
  ON rate_limits FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_rate_limits" ON rate_limits;
CREATE POLICY "anon_update_rate_limits"
  ON rate_limits FOR UPDATE
  TO anon, authenticated
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_rate_limits" ON rate_limits;
CREATE POLICY "anon_delete_rate_limits"
  ON rate_limits FOR DELETE
  TO anon, authenticated
  USING (true);
