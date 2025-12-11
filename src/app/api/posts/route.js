import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');

        let query = 'SELECT * FROM posts ORDER BY published_at DESC';
        const params = [];

        if (category) {
            query = 'SELECT * FROM posts WHERE category = ? ORDER BY published_at DESC';
            params.push(category);
        }

        const posts = db.prepare(query).all(...params);
        return NextResponse.json({ posts });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const formData = await request.formData();
        const title = formData.get('title');
        const slug = formData.get('slug');
        const summary = formData.get('summary');
        const content = formData.get('content');
        const category = formData.get('category');
        const isFeatured = formData.get('is_featured') === 'true';
        const readTime = formData.get('read_time');
        const imageFile = formData.get('image_file');

        if (!title || !slug) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        let imageUrl = '';
        if (imageFile && imageFile.name) {
            const buffer = Buffer.from(await imageFile.arrayBuffer());
            const filename = Date.now() + '_' + imageFile.name.replace(/\s/g, '_');
            const uploadPath = path.join(process.cwd(), 'public/uploads', filename);

            await writeFile(uploadPath, buffer);
            imageUrl = `/uploads/${filename}`;
        }

        const stmt = db.prepare(`
      INSERT INTO posts (title, slug, summary, content, category, is_featured, image_url, read_time)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

        const result = stmt.run(
            title,
            slug,
            summary,
            content,
            category,
            isFeatured ? 1 : 0,
            imageUrl,
            readTime || 5
        );

        return NextResponse.json({ success: true, id: result.lastInsertRowid });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
