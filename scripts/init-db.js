const db = require('../src/lib/db');

try {
    console.log('Initializing database...');

    // Create Posts Table
    db.prepare(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      summary TEXT,
      content TEXT,
      published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      category TEXT,
      is_featured INTEGER DEFAULT 0,
      read_time INTEGER DEFAULT 5,
      views INTEGER DEFAULT 0,
      likes INTEGER DEFAULT 0,
      image_url TEXT
    )
  `).run();

    // Seed Data
    const seedPosts = [
        {
            title: 'The Future of AI in 2025',
            slug: 'future-of-ai-2025',
            summary: 'Exploring the transformative power of Agentic AI and what it means for developers.',
            content: '<h2>The Rise of Agents</h2><p>Artificial Intelligence is moving beyond simple chatbots...</p>',
            category: 'Tech',
            is_featured: 1,
            image_url: 'https://placehold.co/600x400/222/FFF?text=AI+Future'
        },
        {
            title: 'Healthy Habits for Remote Workers',
            slug: 'healthy-habits-remote',
            summary: 'Stay fit and productive while working from home with these simple tips.',
            content: '<h2>Sit Less, Move More</h2><p>Remote work often means long hours at the desk...</p>',
            category: 'Lifestyle',
            is_featured: 0,
            image_url: 'https://placehold.co/600x400/444/FFF?text=Remote+Work'
        },
        {
            title: 'Next.js vs Remix: A Comparison',
            slug: 'nextjs-vs-remix',
            summary: 'A deep dive into the two most popular React frameworks.',
            content: '<h2>Server Components</h2><p>Next.js introduced Server Components...',
            category: 'Tech',
            is_featured: 0,
            image_url: 'https://placehold.co/600x400/666/FFF?text=Next+vs+Remix'
        },
        {
            title: 'Top 10 Travel Destinations',
            slug: 'top-10-travel',
            summary: 'Get your passport ready for these amazing locations.',
            content: '<h2>1. Kyoto, Japan</h2><p>The cultural capital...</p>',
            category: 'Travel',
            is_featured: 1,
            image_url: 'https://placehold.co/600x400/888/FFF?text=Travel'
        }
    ];

    const insert = db.prepare(`
    INSERT OR IGNORE INTO posts (title, slug, summary, content, category, is_featured, image_url)
    VALUES (@title, @slug, @summary, @content, @category, @is_featured, @image_url)
  `);

    const insertMany = db.transaction((posts) => {
        for (const post of posts) insert.run(post);
    });

    insertMany(seedPosts);

    console.log('Database initialized successfully.');
} catch (error) {
    console.error('Error initializing database:', error);
}
