'use server';
import env from '@/env';
import { Resend } from 'resend';

const resend = new Resend(env.RESEND_API_KEY);

export const sendEmail = async () => {
	try {
		await resend.emails.send({
			from: 'onboarding@resend.dev',
			to: '3n16m4.r4y@gmail.com',
			subject: 'Hello World',
			html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
		});
	} catch (e) {
		console.error(e);
	}
};