---
title: Managing State
---

One fundamental feature that separates Membrane from other serverless runtimes is that it is _stateful_.

You don't need to store data in a database or file to persist it. Instead, the state of your program (the entire JS heap) is transparently and efficiently persisted every time it changes.

## The state object

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

// Initialize a value
state.count ??= 0;

export function count() {
  return ++state.count;
}
```

Note that the entire JS heap is persistent, not just `state`. The reason we use `state` is because each deploy (i.e.
code change) creates a new ES Module, so this object serves as a convenient way to pass data from one version to the
next. Technically you could use `globalThis`, but this is not recommended since it's also accesible by NPM dependencies
and our IDE provides tooling to conveniently inspect `state`

In most cases Membrane will generate typing information for `state` based on usage. For example, from the code above, we
will automatically infer the type of `state` to be:

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

Membrane's memory-based durability means the data you put in `state` doesn't need to be JSON-serializable. It's useful
to use JavaScript `Map`s or `Set`s to store data that can be efficiently read or written to.
