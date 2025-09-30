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
      headers: {
        "x-middleware-rewrite": url.toString(),
      },
    });
  }
}

export const config = {
  matcher: "/:path*",
};
