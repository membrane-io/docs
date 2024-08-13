---
title: membrane module
---

Programs can access most of Membrane's functionality by importing the `"membrane"` module. It provides exports that can be used to store program state, communicate with other programs and more.

In your IDE, you can cmd+click `"membrane"` in an import statement to open the `membrane.d.ts` module for that program. You'll see the types documented on this page, plus additional types specific to that program's schema.

:::note
`membrane.d.ts` will update whenever you update your program's schema or connections.
:::

## Exports

### state

Import `state` from `"membrane"` to persist program data. Read more about [Durable state](/features/state).

```js
// membrane.d.ts
export const state: State
```

### nodes

Import `nodes` from `"membrane"` to access [connections](/features/connections) of a program. Read more about [Connections](/features/connections).

```js
// membrane.d.ts
export const nodes = {
  /* connections you add to a program will go here */
};
```

### root

Import `root` from `"membrane"` to access a reference to the program itself.

```js
// membrane.d.ts
export const root: Root
```

## Types

### Action

[Actions](/concepts/schema#actions) exported from Membrane programs can be invoked manually in the IDE Navigator or programmatically via methods defined in the `"membrane"` module.

```js
// membrane.d.ts
interface Action<V> {
  $invoke(): Promise<V>;
  $invokeAt(time: number | Date): void;
  $invokeIn(seconds: number): void;
  $cron(spec: string): void;
}
```

#### $invoke

Invoke an action immediately by chaining `.$invoke()` to it.

```js
$invoke(): Promise<V>;
```

:::tip
You can also simply `await` an action to invoke it, which is shorthand for chaining `.$invoke()` and awaiting.
E.g. `await nodes.sms.send({ message: "tacos" })` is equivalent to `await nodes.sms.send({ message: "tacos" }).$invoke()`.
:::

#### $invokeAt

Invoke an action at a specific time by chaining `.$invokeAt()` to it. `time` can be either a UNIX timestamp or a Date object.

```js
$invokeAt(time: number | Date): void;
```

#### $invokeIn

Schedule a timer to invoke the action after a specified delay by chaining `.$invokeIn()` to it.

```js
$invokeIn(seconds: number): void;
```

#### $cron

Schedule a cron-like timer to invoke an action at configured times by chaining `.$cron()` to it. `spec` is a cron-like expression with two main differences from standard cron expressions.

1. There is an additional slot for seconds, passed as the first value
2. The day of the week slot accepts 0-7 where 0 and 7 both represent Sunday

Valid values for each field are:

- second: 0-59
- minute: 0-59
- hour: 0-23
- day of month: 1-31
- month: 1-12 (or names: Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec)
- day of week: 0-7 (both 0 or 7 represent Sunday, or names: Sun, Mon, Tue, Wed, Thu, Fri, Sat)

```js
$cron(spec: string): void;
```

### Field

[Fields](/concepts/schema#fields) exported from Membrane programs can be queried using GraphQL-like syntax.

```js
// membrane.d.ts

interface Field<V> extends FieldBase {
  $query(query: string): Promise<V>;
}

interface ListField<V> extends FieldBase {
  $query: (q: string) => Promise<V[]>;
}

interface FieldBase {
  $args(): Record<string, any> | undefined;
  $argsAt(pattern: Field<unknown>): Record<string, any> | undefined;
  $pop(): Field<any>;
}

interface Scalar<V> {
  $get: () => Promise<V>;
}
```

#### $query

Chain `.$query()` onto a graph node to get fields of that node. `query` must be valid GraphQL query.

```js
$query(query: string): Promise<V>;
```

E.g.

```js
// Query the status and body of the membrane.io website
const { status, body } = await nodes.http
  .get({ url: "https://example.com" })
  .$query("{ status body }");

// Query the name and location of a github user
const { name, location } = await nodes.github.users
  .one({ name: "swyxio" })
  .$query("{ name location }");
```

#### $args

Chain `.$args()` to get the arguments of the last path element of a graph node reference (aka g-ref). Only the last element of the g-ref path is considered. Consider using `$argsAt` if you need arguments from the middle of the path.

```js
$args(): Record<string, any> | undefined;
```

E.g.

```js
const gref = root.a({ x: 1 }).b({ y: 2 });
const two = gref.$args().y;
console.assert(two === 2);
```

#### $argsAt

Chain `.$argsAt()` to get the arguments at the provided `pattern` g-ref. Useful to extract arguments from a g-ref. The provided `pattern` (also a g-ref) determines from which part to get the parameters from.

This similar to using a RegExp on a URL to extract parts of it.

```js
$argsAt(pattern: Field<unknown>): Record<string, any> | undefined;
```

E.g.

```js
const gref = root.a({ x: 1 }).b({ y: 2 });
const { x } = gref.$argsAt(root.a);
const { y } = gref.$argsAt(root.a.b);
```

#### $pop

Chain `.$pop()` to get a g-ref with the last part of the path removed. This does nothing if the path is empty.

```js
$pop(): Field<any>;
```

```js
const gref = root.a.b;
const parent = gref.$pop();
console.assert(parent === root.a);
```

#### $get

Chain `.$get()` to a scalar field to retrieve its value. This is equivalent to calling `.$query()` without arguments.

```js
$get: () => Promise<V>;
```

### NodeEvent

Membrane programs can emit and subscribe to [Events](/concepts/schema#events).

```js
// membrane.d.ts
interface NodeEvent<T> {
  $subscribe: (handler: Action<any>) => Promise<Subscription>;
  $emit(event: Partial<T>): void;
}

type Subscription = number;

declare var unsubscribe: (subscription: Subscription) => Promise<any>;
```

#### $subscribe

Call `.$subscribe()` to subscribe to an event.

```js
$subscribe: (handler: Action<any>) => Promise<Subscription>;
```

#### $emit

Call `.$emit()` to emit an event.

```js
$emit(event: Partial<T>): void;
```

#### $unsubscribe

Call `.$unsubscribe()` to unsubscribe from a previously subscribed event. The `subscription` param is a number representing the subscription and the result of a previous call to `$subscribe`.

```js
declare var unsubscribe: (subscription: Subscription) => Promise<any>;
```

### sleep

Programs in Membrane can pause execution with sleeps. Call `sleep()` to return a Promise, which resolves after a number of `seconds`.

```js
declare var sleep: (seconds: number) => Promise<any>;
```
