import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (!process.env.BASIC_AUTH_CREDENTIALS) {
    throw new Error("BASIC_AUTH_CREDENTIALS environment variable is not set");
  }

  const authHeader = req.headers.get("authorization");

  if (authHeader) {
    const base64Credentials = authHeader.split(" ")[1];
    const credentials = atob(base64Credentials);
    const [username, password] = credentials.split(":");

    const [basicAuthUsername, basicAuthPassword] =
      process.env.BASIC_AUTH_CREDENTIALS.split(":");

    if (username === basicAuthUsername && password === basicAuthPassword) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Protected Area"',
    },
  });
}
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
