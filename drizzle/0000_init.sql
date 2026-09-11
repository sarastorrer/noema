CREATE TABLE IF NOT EXISTS articles (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  category TEXT NOT NULL,
  series TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL,
  sources TEXT NOT NULL DEFAULT '',
  cover TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  published_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  version INTEGER NOT NULL DEFAULT 1
);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published_at);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS contacts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  delivery TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_contacts_delivery ON contacts(delivery);
CREATE INDEX IF NOT EXISTS idx_contacts_created ON contacts(created_at);

CREATE TABLE IF NOT EXISTS rate_limits (
  key TEXT PRIMARY KEY,
  hits INTEGER NOT NULL DEFAULT 0,
  expires INTEGER NOT NULL
);
