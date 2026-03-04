// src/proxy.ts
import {NextResponse, type NextRequest} from 'next/server';

const locales = ['es', 'en'] as const;
const defaultLocale = 'en';
const cookieName = 'preferred-locale';

function getLocale(request: NextRequest) {
  const saved = request.cookies.get(cookieName)?.value;
  if (saved && locales.includes(saved as (typeof locales)[number])) return saved;

  const accept = request.headers.get('accept-language')?.toLowerCase() || '';
  if (accept.startsWith('en')) return 'en';

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const {pathname} = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (hasLocale)  return;
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`; 
  return NextResponse.redirect(request.nextUrl);
}
export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}