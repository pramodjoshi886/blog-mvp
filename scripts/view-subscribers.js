const db = require('../src/lib/db');
try {
    const subscribers = db.prepare('SELECT * FROM subscribers').all();
    console.log('--- Subscribers ---');
    console.table(subscribers);
} catch (error) {
    console.error('Error fetching data:', error);
}
