import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  const accept = context.request.headers.get("accept") || "";
  const pathname = context.url.pathname;

  // Check if client accepts markdown
  const acceptsMarkdown = /text\/markdown/.test(accept);

  // Only rewrite doc routes (not root, not already .md files)
  if (acceptsMarkdown && !pathname.endsWith(".md") && pathname !== "/") {
    // Convert /getting-started/intro/ to /getting-started/intro.md
    const mdPath = pathname.replace(/\/$/, "") + ".md";

    // Pass the new path to next() to rewrite without re-executing middleware
    return next(mdPath);
  }

  return next();
});
