const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs-extra');

// Ensure the db directory exists
const dbPath = path.join(process.cwd(), 'blog.db');

const db = new Database(dbPath, { verbose: console.log });
db.pragma('journal_mode = WAL');

module.exports = db;
