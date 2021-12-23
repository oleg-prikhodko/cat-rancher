import sqlite from "better-sqlite3";
import path from "path";

export const db = sqlite(path.resolve(__dirname, "../", process.env.DB_NAME!));
db.prepare(
  "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, name TEXT)"
).run();
db.prepare(
  "CREATE TABLE IF NOT EXISTS cats (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, size TEXT, age INTEGER, owner INTEGER)"
).run();
