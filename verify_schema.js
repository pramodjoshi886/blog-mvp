const db = require('./src/lib/db');
try {
    const info = db.prepare('PRAGMA table_info(subscribers)').all();
    console.log(JSON.stringify(info, null, 2));
} catch (error) {
    console.error('Verification failed:', error);
}
