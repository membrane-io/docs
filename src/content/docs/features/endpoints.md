---
title: HTTP Endpoints
---

<!-- TODO: add how to programmatically get the endpoint -->

Every Membrane program has its own URL and can handle requests made to that URL. This provides a simple mechanism for calling into your membrane programs from the outside world.

```ts twoslash
// @module: esnext
// @filename: membrane.d.ts
declare module "membrane" {
  namespace resolvers {
    export interface Root {
      endpoint(req: {
        method:
          | "GET"
          | "POST"
          | "PUT"
          | "PATCH"
          | "DELETE"
          | "HEAD"
          | "OPTIONS";
        path: string;
        body?: string;
        query?: string;
        headers: string;
      }): string;
    }
  }
}

// ---cut---
import type { resolvers } from "membrane";

export const endpoint: resolvers.Root["endpoint"] = (req) => {
  switch (`${req.method} ${req.path}`) {
    case "GET /":
      return "hello world";
    default:
      return JSON.stringify({ status: 404 });
  }
};
```

You can copy a program's endpoint by right clicking on it in the Explorer panel. When your program endpoint receives a request it gets logged, so you can inspect it in the Logs panel.

<video src="/cloud-assets/copy-endpoint.mp4" muted autoplay loop></video>

:::note
Currently the endpoint function must return a string. We're working to improve this.
:::
