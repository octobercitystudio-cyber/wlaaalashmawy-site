import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAuth } from './lib/auth';

export async function proxy(req: NextRequest) {
  const url = req.url;
  const { pathname } = req.nextUrl;

  const token = req.cookies.get('admin-token')?.value;

  // Protect /admin/dashboard routes
  if (pathname.startsWith('/admin/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/admin', url));
    }
    try {
      await verifyAuth(token);
    } catch (err) {
      return NextResponse.redirect(new URL('/admin', url));
    }
  }

  // Redirect /admin to dashboard if already logged in
  if (pathname === '/admin') {
    if (token) {
      try {
        await verifyAuth(token);
        return NextResponse.redirect(new URL('/admin/dashboard', url));
      } catch (err) {
        // Token invalid, continue to login page
      }
    }
  }

  // Protect API routes
  if (pathname.startsWith('/api/admin')) {
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
      await verifyAuth(token);
    } catch (err) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/admin'],
};
