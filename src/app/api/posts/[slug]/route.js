import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function DELETE(request, { params }) {
    try {
        const { slug } = await params;

        // SQLite DELETE
        const stmt = db.prepare('DELETE FROM posts WHERE slug = ?');
        const result = stmt.run(slug);

        if (result.changes === 0) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(request, { params }) {
    try {
        const { slug } = await params;

        const stmt = db.prepare('UPDATE posts SET likes = likes + 1 WHERE slug = ?');
        const result = stmt.run(slug);

        if (result.changes === 0) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
