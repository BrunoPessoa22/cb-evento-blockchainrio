import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

const DB_PATH = process.env.DB_PATH ?? "./data/registrations.db";

export type Registration = {
  id: number;
  nome: string;
  email: string;
  empresa: string;
  cargo: string;
  created_at: string;
};

function init(): Database.Database {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("busy_timeout = 5000");
  db.exec(`
    CREATE TABLE IF NOT EXISTS registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      empresa TEXT NOT NULL,
      cargo TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);
  return db;
}

// Cached on globalThis so dev hot-reload doesn't stack file handles.
const g = globalThis as unknown as { __cbEventDb?: Database.Database };

export function getDb(): Database.Database {
  return (g.__cbEventDb ??= init());
}
