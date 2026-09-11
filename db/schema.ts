import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const articles = sqliteTable("articles", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  category: text("category").notNull(),
  series: text("series").notNull().default(""),
  body: text("body").notNull(),
  sources: text("sources").notNull().default(""),
  cover: text("cover").notNull(),
  status: text("status").notNull().default("draft"),
  published_at: text("published_at").notNull(),
  updated_at: text("updated_at").notNull(),
  version: integer("version").notNull().default(1),
});

export const settings = sqliteTable("settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
});

export const contacts = sqliteTable("contacts", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  delivery: text("delivery").notNull().default("pending"),
  created_at: text("created_at").notNull(),
});

export const rateLimits = sqliteTable("rate_limits", {
  key: text("key").primaryKey(),
  hits: integer("hits").notNull().default(0),
  expires: integer("expires").notNull(),
});
