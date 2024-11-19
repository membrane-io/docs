---
title: HTTP Endpoints
---

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
export const endpoint: resolvers.Root["endpoint"] = (req) => {
  switch (`${req.method} ${req.path}`) {
    case "GET /":
      return "hello world";
    default:
      return JSON.stringify({ status: 404 });
  }
};
```

When your program endpoint receives a request it will be logged, so you can inspect it in the Logs panel.

:::note
Currently the endpoint function must return a string.
:::

## Accessing an endpoint URL

To access a program's endpoint URL in your code, call:

```
await nodes.process.endpointUrl
```

To open an endpoint, click "Open Preview" above the `endpoint` function signature. You can also copy a program's endpoint by right clicking on it in the Navigator panel.

<video src="/cloud-assets/copy-endpoint.mp4" muted autoplay controls></video>

## http program

There is also an `http` program pre-installed in your workspace. When you run `fetch` in a program, Membrane uses its HTTP program behind the scenes to make network calls. Read on to learn how to add connections to programs, including `http`.
