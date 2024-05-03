---
title: HTTP Endpoints
---

Every program has its own URL and can handle requests made to that URL.

```ts twoslash
interface SimpleRequest {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";
  path: string;
  body?: string;
  query?: string;
  headers: string;
}
// ---cut---
export async function endpoint(req: SimpleRequest) {
  if (req.method === "GET") {
    return "hello world";
  }
}
```

:::caution[TODO]
Show the following:

- Copying the endpoint URL from gaze
- How to programmatically get the endpoint
- An example of the request logs
  :::
