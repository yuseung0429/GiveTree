import { NextRequest, NextResponse } from 'next/server';

import { getSession } from '@/lib/session';

const publicRoutes = ['/signin', '/foundation-signin', '/foundation-signup'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);

  const session = await getSession();

  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL('/signin', req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
