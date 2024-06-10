---
title: Durable State
---

One fundamental feature that separates Membrane from other serverless runtimes is that it is _stateful_. That means you can store state in one call to a Membrane [program](/concepts/programs/) and use it again in a subsequent call.

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
