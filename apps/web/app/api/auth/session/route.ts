import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function GET() {
	const sessionResult = await auth.api.getSession({
		headers: await headers(),
		asResponse: false,
	});

	return Response.json(sessionResult);
}
