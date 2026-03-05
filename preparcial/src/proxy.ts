// src/proxy.ts
import {NextResponse, NextRequest } from 'next/server';

const locales = ['es', 'en'] as const;
const defaultLocale = 'en';
const cookieName = 'preferred-locale';

function getLocale(request: NextRequest) {
  const saved = request.cookies.get(cookieName)?.value;
  if (saved && locales.includes(saved as (typeof locales)[number])) return saved;

  const accept = request.headers.get('accept-language')?.toLowerCase() || '';
  if (accept.startsWith('en')) return 'en';
  if (accept.startsWith('es')) return 'es';
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const {pathname} = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (hasLocale) {
    const currentLocale = pathname.split('/')[1];

    const response = NextResponse.next();
    if (currentLocale === 'es' || currentLocale === 'en') {
      response.cookies.set(cookieName, currentLocale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365
      });
    }

    return response;
  }

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`; 
  const response = NextResponse.redirect(request.nextUrl);
  response.cookies.set(cookieName, locale, { path: '/', maxAge: 60 * 60 * 24 * 365 });
  return response;
}
export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}