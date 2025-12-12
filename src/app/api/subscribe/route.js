import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request) {
    try {
        const { email, name } = await request.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
        }

        try {
            const stmt = db.prepare('INSERT INTO subscribers (email, name) VALUES (?, ?)');
            stmt.run(email, name);
            return NextResponse.json({ success: true });
        } catch (err) {
            if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
                return NextResponse.json({ error: 'Email already subscribed' }, { status: 409 });
            }
            throw err;
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
