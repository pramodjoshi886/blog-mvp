import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function DELETE(request, { params }) {
    try {
        const { slug } = await params;

        const result = await db.query('DELETE FROM posts WHERE slug = $1', [slug]);

        if (result.rowCount === 0) {
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

        const result = await db.query('UPDATE posts SET likes = likes + 1 WHERE slug = $1', [slug]);

        if (result.rowCount === 0) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
