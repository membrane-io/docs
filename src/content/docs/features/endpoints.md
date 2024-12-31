---
title: HTTP Endpoints
---

Every Membrane program comes with its own URL. By exporting an <Action name="endpoint"/> function you can quickly handle HTTP requests.

```ts twoslash
// @filename: membrane.d.ts
declare module membrane {
  export type Root = "123";
}

// ---cut---
// @noImplicitAny: false
import Root from "membrane";
export const endpoint = (req) => {
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

```ts twoslash
// @module: esnext
// @noImplicitAny: false
// @filename: membrane.d.ts
/// <reference path="membrane_core.d.ts" />
/**
 * Represents the Process node in Membrane, providing process-related functionality.
 */
interface Process {
  /**
   * The URL of the program's HTTP endpoint.
   * `await nodes.process.endpointUrl`
   */
  endpointUrl: Scalar<string>;
}

declare module "membrane" {
  /**
   * Contains the graph references (grefs) that this program has been given access to.
   */
  export const nodes: {
    readonly clock: Clock;
    readonly process: Process;
  };
}

// @filename: index.ts
import { nodes } from "membrane";
// ---cut---
await nodes.process.endpointUrl;
```

To open an endpoint, click "Open Preview" above the `endpoint` function signature. You can also copy a program's endpoint by right clicking on it in the Navigator panel.

<video src="/cloud-assets/copy-endpoint.mp4" muted autoplay controls></video>

## http program

In Membrane all communication is done via the graph. So how can `fetch` make network requests? Via a special program called `http`.

There is a special program running on your workspace called `http`. Whenever you use `fetch`, the request will go through the `http` program which ultimately makes the actual request.
