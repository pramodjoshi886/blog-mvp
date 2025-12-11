import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
        }

        try {
            const stmt = db.prepare('INSERT INTO subscribers (email) VALUES (?)');
            stmt.run(email);
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
