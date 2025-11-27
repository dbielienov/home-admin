import { NextResponse } from 'next/server';
import { sendWelcomeEmail } from '@/server/email/email.service';

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { email, name } = body;

		if (!email || !name) {
			return NextResponse.json({ error: 'Email and name are required' }, { status: 400 });
		}

		await sendWelcomeEmail(email, name);
		return NextResponse.json({ ok: true });
	} catch (e) {
		console.error(e);
		return NextResponse.json({ error: true }, { status: 500 });
	}
}
