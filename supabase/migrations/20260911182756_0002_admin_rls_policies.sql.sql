/*
# Add admin RLS policies for authenticated users

1. Purpose
   - Authenticated users (admins who sign in via Supabase auth) need full CRUD
     on articles and contacts to manage the magazine.
   - Public (anon) users can only read published articles and submit contacts.

2. Policy Changes
   - articles: Add SELECT (all), INSERT, UPDATE, DELETE for authenticated users
   - contacts: Add SELECT, UPDATE, DELETE for authenticated users
   - settings: Add SELECT, INSERT, UPDATE for authenticated users

3. Important Notes
   - Public sign-ups should be disabled in Supabase dashboard so only authorized
     admins can create accounts.
   - The app also checks the user's email against an admin allowlist.
   - Service role key bypasses all RLS, so edge functions/server code using it
     are unaffected.
*/

-- Articles: authenticated users can read all articles (including drafts)
DROP POLICY IF EXISTS "admin_select_articles" ON articles;
CREATE POLICY "admin_select_articles"
  ON articles FOR SELECT
  TO authenticated
  USING (true);

-- Articles: authenticated users can insert
DROP POLICY IF EXISTS "admin_insert_articles" ON articles;
CREATE POLICY "admin_insert_articles"
  ON articles FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Articles: authenticated users can update
DROP POLICY IF EXISTS "admin_update_articles" ON articles;
CREATE POLICY "admin_update_articles"
  ON articles FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

-- Articles: authenticated users can delete
DROP POLICY IF EXISTS "admin_delete_articles" ON articles;
CREATE POLICY "admin_delete_articles"
  ON articles FOR DELETE
  TO authenticated
  USING (true);

-- Contacts: authenticated users can read
DROP POLICY IF EXISTS "admin_select_contacts" ON contacts;
CREATE POLICY "admin_select_contacts"
  ON contacts FOR SELECT
  TO authenticated
  USING (true);

-- Contacts: authenticated users can update (e.g. delivery status)
DROP POLICY IF EXISTS "admin_update_contacts" ON contacts;
CREATE POLICY "admin_update_contacts"
  ON contacts FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

-- Contacts: authenticated users can delete
DROP POLICY IF EXISTS "admin_delete_contacts" ON contacts;
CREATE POLICY "admin_delete_contacts"
  ON contacts FOR DELETE
  TO authenticated
  USING (true);

-- Settings: authenticated users can read
DROP POLICY IF EXISTS "admin_select_settings" ON settings;
CREATE POLICY "admin_select_settings"
  ON settings FOR SELECT
  TO authenticated
  USING (true);

-- Settings: authenticated users can insert
DROP POLICY IF EXISTS "admin_insert_settings" ON settings;
CREATE POLICY "admin_insert_settings"
  ON settings FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Settings: authenticated users can update
DROP POLICY IF EXISTS "admin_update_settings" ON settings;
CREATE POLICY "admin_update_settings"
  ON settings FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);
