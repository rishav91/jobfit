import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

const dbPath = path.resolve("data/jobfit.sqlite");
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);
const schema = fs.readFileSync(path.resolve("scripts/schema.sql"), "utf8");
db.exec("PRAGMA foreign_keys = ON;");
db.exec(schema);

console.log(`Initialized ${dbPath}`);
