import { NextRequest, NextResponse } from 'next/server';

const LOCALE_COOKIE = 'NEXT_LOCALE';
const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  // Skip for public files like images, fonts, etc
  if (PUBLIC_FILE.test(request.nextUrl.pathname)) {
    return;
  }

  // Get locale from cookie or default to 'en'
  const locale = request.cookies.get(LOCALE_COOKIE)?.value || 'en';
  
  // If pathname doesn't start with locale, redirect
  if (
    !request.nextUrl.pathname.startsWith('/en') &&
    !request.nextUrl.pathname.startsWith('/fr')
  ) {
    return NextResponse.redirect(
      new URL(`/${locale}${request.nextUrl.pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico).*)'],
};