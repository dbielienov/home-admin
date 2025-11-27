'use server';
import env from '@/env';
import { Resend } from 'resend';

const resend = new Resend(env.RESEND_API_KEY);

export const sendWelcomeEmail = async (email: string, name: string) => {
	try {
		const { render } = await import('@react-email/render');
		const { WelcomeEmail } = await import('./templates/welcome-email');

		const html = await render(WelcomeEmail({ username: name }));

		await resend.emails.send({
			from: 'onboarding@resend.dev',
			to: email,
			subject: 'Welcome to Home App!',
			html,
		});
	} catch (e) {
		console.error('Failed to send welcome email:', e);
		throw e;
	}
};