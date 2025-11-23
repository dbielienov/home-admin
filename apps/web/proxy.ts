import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function proxy(request: NextRequest) {
	const sessionCookie = await auth.api.getSession({
		headers: request.headers,
	});

	// THIS IS NOT SECURE!
	// This is the recommended approach to optimistically redirect users
	// We recommend handling auth checks in each page/route
	if (!sessionCookie) {
		return NextResponse.redirect(new URL('/signin', request.url));
	}
	return NextResponse.next();
}
export const config = {
	matcher: ['/'], // Specify the routes the middleware applies to
};
