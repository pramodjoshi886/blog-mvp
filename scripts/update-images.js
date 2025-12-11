const db = require('../src/lib/db');

const updates = [
    {
        slug: 'future-of-ai-2025',
        image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200'
    },
    {
        slug: 'healthy-habits-remote',
        image_url: 'https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&q=80&w=1200'
    },
    {
        slug: 'nextjs-vs-remix',
        image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1200'
    },
    {
        slug: 'top-10-travel',
        image_url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1200'
    }
];

try {
    const stmt = db.prepare('UPDATE posts SET image_url = ? WHERE slug = ?');

    db.transaction(() => {
        for (const update of updates) {
            stmt.run(update.image_url, update.slug);
            console.log(`Updated image for ${update.slug}`);
        }
    })();

    console.log('Images updated successfully.');
} catch (error) {
    console.error('Error updating images:', error);
}
