import { NextRequest, NextResponse } from "next/server";

import {
  parseBasicAuthCredentials,
  parseBasicAuthHeader,
} from "./auth/basicAuth";
import { defaultLangKey, langs } from "./i18n";

export function proxy(req: NextRequest) {
  if (!process.env.BASIC_AUTH_CREDENTIALS) {
    throw new Error("BASIC_AUTH_CREDENTIALS environment variable is not set");
  }

  const authHeader = req.headers.get("authorization");
  const credentials = parseBasicAuthHeader(authHeader);
  const expectedCredentials = parseBasicAuthCredentials(
    process.env.BASIC_AUTH_CREDENTIALS,
  );

  if (
    credentials &&
    expectedCredentials &&
    credentials.username === expectedCredentials.username &&
    credentials.password === expectedCredentials.password
  ) {
    return checkI18nRedirection(req);
  }

  return unauthorized();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Protected Area"',
    },
  });
}

function checkI18nRedirection(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = langs.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return NextResponse.next();

  const locale = defaultLangKey;
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}
