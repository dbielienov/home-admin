'use server';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const signIn = async ({ email, password }: { email: string; password: string }) => {
	await auth.api.signInEmail({
		body: {
			email,
			password,
		},
	});
};

export const signUp = async ({ name, email, password }: { name: string; email: string; password: string }) => {
	await auth.api.signUpEmail({
		body: {
			name,
			email,
			password,
		},
	});
};

export async function signOut() {
	await auth.api.signOut({
		headers: await headers(),
	});
	redirect('/signin');
}
