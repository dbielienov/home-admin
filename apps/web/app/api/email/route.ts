import { NextResponse } from 'next/server';
import { sendEmail } from '@/server/email/email.service';

export async function POST() {
	try {
		await sendEmail()
		return NextResponse.json({ ok: true });
	} catch (e) {
		console.error(e);
		return NextResponse.json({ error: true }, { status: 500 });
	}
}
