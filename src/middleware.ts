import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('auth-storage');

  let isAuthenticated = false;
  if (authCookie) {
    const authState = JSON.parse(authCookie.value);
    isAuthenticated = authState?.state?.isAuthenticated;
  }

  if (!isAuthenticated && request.nextUrl.pathname.startsWith('/products/')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/products/:path*',
};