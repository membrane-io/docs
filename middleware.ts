import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accept = request.headers.get("accept") || "";
  const pathname = request.nextUrl.pathname;

  const acceptsMarkdown = /text\/markdown/.test(accept);

  if (acceptsMarkdown && !pathname.endsWith(".md") && pathname !== "/") {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/\/$/, "") + ".md";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
