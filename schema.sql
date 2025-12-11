-- Run these commands in the Vercel Storage Console (Query Editor)

-- 1. Create Posts Table
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  summary TEXT,
  content TEXT,
  published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  category TEXT,
  is_featured INTEGER DEFAULT 0,
  read_time INTEGER DEFAULT 5,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  image_url TEXT
);

-- 2. Create Subscribers Table
CREATE TABLE IF NOT EXISTS subscribers (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Seed Data (Optional)
INSERT INTO posts (title, slug, summary, content, category, is_featured, image_url, read_time)
VALUES 
(
  'The Future of AI in 2025', 
  'future-of-ai-2025',
  'Exploring the transformative power of Agentic AI.', 
  '<h2>The Rise of Agents</h2><p>AI is evolving...</p>',
  'Tech', 
  1, 
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
  5
),
(
  'Healthy Habits for Remote Workers', 
  'healthy-habits-remote',
  'Stay fit and productive while working from home.', 
  '<h2>Sit Less, Move More</h2><p>Remote work tips...</p>',
  'Lifestyle', 
  0, 
  'https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&q=80&w=1200',
  4
)
ON CONFLICT (slug) DO NOTHING;
