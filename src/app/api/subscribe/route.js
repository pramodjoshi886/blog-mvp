import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request) {
    try {
        const { email } = await request.json();

        // Basic regex for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
        }

        try {
            await db.query('INSERT INTO subscribers (email) VALUES ($1)', [email]);
            return NextResponse.json({ success: true });
        } catch (err) {
            // Postgres error code for unique_violation
            if (err.code === '23505') {
                return NextResponse.json({ error: 'Email already subscribed' }, { status: 409 });
            }
            throw err;
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
