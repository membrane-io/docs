---
title: Durable State
---

One fundamental feature that separates Membrane from other serverless runtimes is that it is _stateful_.

You don't need to store data in a database or file to persist it. Instead, the state of your program (the entire JS heap) is transparently and efficiently persisted every time it changes.

## Managing state

To keep data around, put it in the `state` object, and that's it.

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

state.count ??= 0;

export function count() {
  state.count++;
}
```

Note that the entire JS heap is persistent, not just `state`. So technically, you could use module-level variables to store
state. However, since each update (i.e. code change) creates a new ES Module, prior module-level variables are not accessible from newer modules, hence the need
for a `state` object shared across all versions of the program's code.

In most cases Membrane will generate typing information for `state` based on usage. For example, from the code above, we will automatically infer the type of `state` to be:

```ts twoslash
type State = {
  count: number;
};
```

As an alternative, you can also provide typing information for `state` by exporting a `State` type or interface from `index.ts`:

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
export interface State {
  //             ^^^^^
  count: number;
}
```

## JavaScript objects as the database

Membrane's durability means you can treat your JavaScript objects as a database. For example, you can store some data in one call and use it again in subsequent calls.

This persistence model enables behavior that wouldn't be possible in most serverless runtimes. For example, Promises can be `await`'ed indefinitely without worrying about execution timeouts. You might use an indefinite `await` to wait for an [email handler](/features/email).
