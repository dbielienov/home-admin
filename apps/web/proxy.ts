import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { rateLimit } from '@/lib/rate-limitter';


export async function proxy(request: NextRequest) {
	const sessionCookie = await auth.api.getSession({
		headers: request.headers,
	});

	if (!sessionCookie) {
		return NextResponse.redirect(new URL('/signin', request.url));
	}

	return await rateLimit(request);

}
export const config = {
	matcher: ['/'],
};
