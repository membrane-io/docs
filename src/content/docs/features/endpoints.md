---
title: HTTP Endpoints
---

<!--
TODO: Show the following:

- Copying the endpoint URL from gaze
- How to programmatically get the endpoint
- An example of the request logs
 -->

Every program has its own URL and can handle requests made to that URL. This provides a simple mechanism for calling into your membrane programs from the outside world.

```ts twoslash
interface SimpleRequest {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";
  path: string;
  body?: string;
  query?: string;
  headers: string;
}
// ---cut---
export async function endpoint({ method, path }: SimpleRequest) {
  switch (`${method} ${path}`) {
    case "GET /":
      return "hello world";
    default:
      return JSON.stringify({ status: 404 });
  }
}
```

:::note
Currently the endpoint function must return a string. We're working to improve this.
:::
