---
title: Events
---

Any Membrane program can emit events and subscribe to events.

For example, if you have a program that handles GitHub webhooks, your program could emit a `ghWebhookReceived` event, and another program that forwards GitHub notifications to Slack could subscribe to that event.

## Emitting an event

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
  /**
   * A gref to the root of this program.
   */
  export const root: Root;
}

// ---cut---
import type { root } from "membrane";

export const endpoint: resolvers.Root["endpoint"] = (req) => {
  switch (`${req.method} ${req.path}`) {
    case "POST /gh-webhook-path":
      root.ghWebhookReceived.$emit();
    //                      ^^^^^^^^
    /* ... */
  }
};
```

## Subscribing to an event

```ts twoslash
// @module: esnext
// @filename: membrane.d.ts
type State = import("./index").State;
declare module "membrane" {
  /**
   * This object is automatically persisted by Membrane.
   * Its type is defined by the exported `State` interface
   * below.
   */
  export const state: State;
}

// ---cut---
import type { nodes } from "membrane";

export async function sendToSlack(_, { event }) {
  await nodes.slack.channel(/* ... */).sendMessage(/* ... */);
}

export async function configure() {
  nodes.ghWebhookReceived.$subscribe(sendToSlack);
  //                     ^^^^^^^^^^^^^^^^^^^^^^^^
}
```
