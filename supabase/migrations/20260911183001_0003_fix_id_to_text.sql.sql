/*
# Fix articles and contacts id column from uuid to text

1. Purpose
   - The original app uses string IDs (e.g. 'desejo', 'energia') for articles.
   - The uuid column type rejects these values. Change to text.
   - Also change contacts id to text for consistency with crypto.randomUUID()
     which returns a string.

2. Changes
   - articles.id: uuid -> text (with DEFAULT gen_random_uuid()::text)
   - contacts.id: uuid -> text (with DEFAULT gen_random_uuid()::text)
   - rate_limits: no change needed (key is already text)

3. Important Notes
   - No data exists yet (table was just created), so this is safe.
   - gen_random_uuid() returns uuid; casting to text gives a valid string ID.
*/

ALTER TABLE articles ALTER COLUMN id TYPE text;
ALTER TABLE articles ALTER COLUMN id SET DEFAULT gen_random_uuid()::text;

ALTER TABLE contacts ALTER COLUMN id TYPE text;
ALTER TABLE contacts ALTER COLUMN id SET DEFAULT gen_random_uuid()::text;
