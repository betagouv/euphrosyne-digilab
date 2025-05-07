// middleware.ts
import { NextRequest, NextResponse } from "next/server";

import { defaultLangKey } from "./i18n";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLangKey}`;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
