const db = require('../src/lib/db');

try {
  console.log('Running migration: Create subscribers table...');

  db.prepare(`
    CREATE TABLE IF NOT EXISTS subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  console.log('Migration successful.');
} catch (error) {
  console.error('Migration failed:', error);
}
