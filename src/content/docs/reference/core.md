---
title: Membrane core library
---

Programs written in Membrane are mostly just vanilla TypeScript/JavaScript, but there are a handful of patterns to get familiar with.

## Action

[Actions](/concepts/schema#actions) exported from Membrane programs can be invoked manually in the IDE Navigator or programmatically with the core lib.

:::tip
You can also simply `await` an action to invoke it, which is shorthand for chaining `.$invoke()` and awaiting.
E.g. `await nodes.sms.send({ message: "Bienvenidos a Membrane" })`
:::

````ts
interface Action<V> {
  /**
   * Invoke this action
   */
  $invoke(): Promise<V>;
  /**
   * Schedules a timer to invoke the action at a specific time.
   * @param time The time to invoke the action, either a UNIX timestamp or a Date object.
   */
  $invokeAt(time: number | Date): void;
  /**
   * Schedules a timer to invoke the action after a specified delay.
   * @param seconds The number of seconds to wait before invoking the action.
   */
  $invokeIn(seconds: number): void;
  /**
   * Schedules a cron-like timer that invokes the action at the specified times.
   *
   * @param spec A cron-like expression that determines when this timer fires. Unlike traditional cron, this parameter has
   * seconds-level accuracy, so a cron expression must specify 6 values (instead of 5):
   *
   * Examples:
   *  - `* * * * * *`   - Every second
   *  - `0 * * * * *`   - Every minute (at the :00 second mark)
   *  - `0 3 * * * 4`   - At 3:00 AM every Thursday (4 = Thursday)
   *  - `0 45 19 * Mar *` - Every year at 7:45 PM on the first of March
   *
   * Valid values for each field are:
   * ```
   * second        0-59
   * minute        0-59
   * hour          0-23
   * day of month  1-31
   * month         1-12 (or names: Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec)
   * day of week   0-7 (both 0 or 7 represent Sunday, or names: Sun, Mon, Tue, Wed, Thu, Fri, Sat)
   * ```
   */
  $cron(spec: string): void;
}
````

## Field

[Fields](/concepts/schema#fields) exported from Membrane programs can be queried using GraphQL-like syntax.

````ts
interface Field<V> extends FieldBase {
  /**
   * Queries the graph starting at node referenced by this g-ref.
   *
   * @param query The query to perform. Must be valid GraphQL query
   * @returns The result of the query. An object with the same shape as the query
   *
   * @example
   * Query the status and body of the membrane.io website:
   * ```
   * const { status, body } = await nodes.http.get({ url: "https://example.com" }).$query("{ status body }");
   * ```
   *
   * @example
   * Query the name and location of a github user:
   * ```
   * const { name, location } = await nodes.github.users.one({ name: "swyxio" }).$query("{ name location }");
   * ```
   */
  $query(query: string): Promise<V>;
}

interface FieldBase {
  /**
   * Gets the arguments of the last path element of this g-ref.
   *
   * Only the last element of the g-ref path is considered. Consider using `$argsAt` if you need arguments
   * from the middle of the path.
   *
   * @example
   * ```
   * const gref = root.a({ x: 1 }).b({ y: 2 });
   * const two = gref.$args().y;
   * console.assert(two === 2);
   * ```
   */
  $args(): Record<string, any> | undefined;
  /**
   * Gets the arguments at the provided `pattern` g-ref.
   *
   * Useful to extract arguments from a g-ref. The provided `pattern` (also a g-ref) determines from which part to get the parameters from.
   *
   * This similar to using a RegExp on a URL to extract parts of it.
   *
   * @see {@link Gref.$args} for a simpler version extracts arguments from the last path element.
   *
   * @example
   * ```
   * const gref = root.a({ x: 1 }).b({ y: 2 });
   * const { x } = gref.$argsAt(root.a);
   * const { y } = gref.$argsAt(root.a.b);
   * ```
   */
  $argsAt(pattern: Field<unknown>): Record<string, any> | undefined;
  /**
   * Returns a gref with the last part of the path removed.
   * It does nothing if the path is empty.
   *
   * @example
   * ```
   * const gref = root.a.b;
   * const parent = gref.$pop();
   * console.assert(parent === root.a);
   */
  $pop(): Field<any>;
}

interface ListField<V> extends FieldBase {
  /**
   * Queries the graph starting at node referenced by this g-ref.
   *
   * @param query The query to perform. Must be valid GraphQL query
   * @returns The result of the query. An object with the same shape as the query
   *
   * @example
   * This example queries the status and body of the membrane.io website:
   * ```
   * const { status, body } = await nodes.http.get({ url: "https://example.com" }).$query("{ status body }")
   * ```
   */
  $query: (q: string) => Promise<V[]>;
}

interface Scalar<V> {
  /**
   * Gets the value of this field. This is equivalent to calling $query without arguments
   */
  $get: () => Promise<V>;
}
````

## NodeEvent

Membrane programs can emit and subscribe to [Events](/concepts/schema#events).

```js
/**
 * A Gref to an event in the Membrane graph
 */
interface NodeEvent<T> {
  $subscribe: (handler: Action<any>) => Promise<Subscription>;
  $emit(event: Partial<T>): void;
}

type Subscription = number;

/**
 * Unsubscribes from a previously subscribed event
 *
 * @param {number} subscription the subscription to unsubscribe from. The result of a previous call to `$subscribe`
 */
declare var unsubscribe: (subscription: Subscription) => Promise<any>;
```

## sleep

Programs in Membrane can pause execution with sleeps.

```js
/**
 * Returns a promise that resolves after the provided number of seconds
 *
 * @param {number} seconds the number of seconds to sleep for
 * @returns a promise that resolves once the timer has been set
 */
declare var sleep: (seconds: number) => Promise<any>;
```

## setTimer

Due to runtime differences with Node.js, the shape of `setTimer` is customized in Membrane.

```tjs
/**
 * Starts a timer that periodically invokes `action` as indicated by the cron-like expression `spec`.
 * If a timer with the same `key` already exists, it will be reconfigured.
 *
 * @param key a name to identify this timer
 * @param spec a cron-like expression that determines when this timer fires. Unlike traditional cron, this parameter has
 * seconds-level accuracy, so a cron expression must specify 6 values (instead of 5):
 *
 * field         allowed values
 * -----         --------------
 * second        0-59
 * minute        0-59
 * hour          0-23
 * day of month  1-31
 * month         1-12 (or names, see below)
 * day of week   0-7 (0 or 7 is Sun, or use names)
 *
 * @param action the action to be invoked every time the timer fires.
 * @returns a promise that resolves once the timer has been set
 */
declare var setTimer: (
  key: string,
  spec: string,
  action: Action<any>
) => Promise<any>;
```
