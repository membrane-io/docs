---
title: Durable State
---

One of the fundamental features that separates Membrane from other serverless runtimes is that it's _stateful_. That means you can store state in one call to a program and use it again in a subsequent call.

## Basic Example

```typescript
// @module: esnext
// @filename: membrane.d.ts
declare module "membrane" {
  export const state: state;
}

// @filename: index.ts
// ---cut---
import { state } from "membrane";

export interface State {
  count: number;
}

state.count ??= 0;

export function count() {
  state.count++;
}
```
