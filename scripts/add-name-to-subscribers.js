const db = require('../src/lib/db');

try {
    console.log('Running migration: Add name column to subscribers table...');

    db.prepare('ALTER TABLE subscribers ADD COLUMN name TEXT').run();
    console.log('Added name column to subscribers table.');
} catch (error) {
    if (error.message.includes('duplicate column name')) {
        console.log('Column name already exists.');
    } else {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}
