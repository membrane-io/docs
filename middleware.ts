export default function middleware(request: Request) {
  const url = new URL(request.url);
  const accept = request.headers.get("accept") || "";

  if (
    /text\/markdown/.test(accept) &&
    !url.pathname.endsWith(".md") &&
    url.pathname !== "/"
  ) {
    url.pathname = url.pathname.replace(/\/$/, "") + ".md";

    return new Response(null, {
      status: 200,
      headers: {
        "x-middleware-rewrite": url.toString(),
      },
    });
  }

  return new Response(null, { status: 200 });
}

export const config = {
  matcher: "/:path*",
};
