---
title: Durable State
---

One fundamental feature that separates Membrane from other serverless runtimes is that it is _stateful_.

Programs have a `state` object that persists state between updates (i.e. deploying your program on save) and invocations (i.e. running your program manually or on a timer). To keep data around, put it in the `state` object, and that's it.

You can think of it as: JavaScript objects as the database.

## Basic Example

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

// @filename: index.ts
// ---cut---
import { state } from "membrane";
//       ^^^^^

export interface State {
  count: number;
}

state.count ??= 0;

export function count() {
  state.count++;
}
```

## What durable state unlocks

Persistent `state` means you can store state in one call to a Membrane program and use it again in a subsequent call. You don't need to store data in a database or file to persist it—instead, the state of your program (the JS heap) is transparently and efficiently persisted every time it changes.

:::note
Technically, since the entire JS heap is continually persisted, you could just use module-level variables to store
state. But since each update creates a new ES Module, prior values are not accessible from newer modules, hence the need
for `state` to share state across different version of the program's code (i.e. different ESM modules).
:::

This persistence model also enables behavior that wouldn't be possible in most serverless runtimes. For example, Promises can be `await`'ed indefinitely without worrying about execution timeouts. You might use an indefinite `await` to wait for an [email handler](/features/email).
