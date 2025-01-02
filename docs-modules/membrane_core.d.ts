/// <reference no-default-lib="true"/>
/// <reference path="membrane_lib.d.ts" />
/// <reference lib="es2020" />

interface Action<V> extends Gref {
  /**
   * Invoke this action
   */
  $invoke(): Promise<V>;
  /**
   * Schedules a timer to invoke the action at a specific time
   * @param time The time to invoke the action, either a UNIX timestamp or a Date object
   */
  $invokeAt(time: number | Date): void;
  /**
   * Schedules a timer to invoke the action after a specified delay
   * @param seconds The number of seconds to wait before invoking the action
   */
  $invokeIn(seconds: number): void;
  /**
   * @deprecated Use `$cron` instead
   */
  $invokeAtCron(spec: string): void;
  /**
   * Schedules a cron-like timer that invokes the action at the specified times
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

  // This makes an action thenable so that await'ing returns the right type
  then: Promise<V>["then"];

  /**
   * Returns a JSON representation of this handle
   */
  toJSON(): string;
}

type Subscription = number;

/**
 * A Gref to an event in the Membrane graph
 */
interface NodeEvent<T> extends Gref {
  $subscribe: (handler: Action<any>) => Promise<Subscription>;
  $emit(event: Partial<T>): void;
}

interface Gref {
  /**
   * Gets the arguments at the provided `pattern` g-ref
   *
   * Useful to extract arguments from a g-ref. The provided `pattern` (also a g-ref) determines from which part to get the parameters from.
   *
   * This similar to using a RegExp on a URL to extract parts of it.
   *
   * @see {@link Gref.$args} for a simpler version extracts arguments from the last path element
   *
   * @example
   * ```
   * const gref = root.a({ x: 1 }).b({ y: 2 });
   * const { x } = gref.$argsAt(root.a);
   * const { y } = gref.$argsAt(root.a.b);
   * ```
   */
  $argsAt(pattern: Field<unknown>): Record<string, any>;
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
  $args(): Record<string, any>;
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

  /**
   * Returns a JSON representation of this handle
   */
  toJSON(): string;
}

// A handle to a field
interface Field<V> extends Gref {
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
  $query(query: string): Promise<V>;
}

interface ListField<V> extends Gref {
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

interface Scalar<V> extends Gref {
  /**
   * Gets the value of this field. This is equivalent to calling $query without arguments
   */
  $get: () => Promise<V>;

  // This a scalar field thenable so that await'ing returns the right type
  then: Promise<V>["then"];
}

interface Console {
  log(...data: any[]): void;
  error(...data: any[]): void;
  warn(...data: any[]): void;
  assert(condition: boolean, message?: string): void;
}
declare var console: Console;

interface Process {
  env: Record<string, string>;
}
declare var process: Process;

/**
 * Returns a promise that resolves after the provided number of seconds
 *
 * @param {number} seconds the number of seconds to sleep for
 * @returns a promise that resolves once the timer has been set
 */
declare var sleep: (seconds: number) => Promise<any>;

/**
 * Unsubscribes from a previously subscribed event
 *
 * @param {number} subscription the subscription to unsubscribe from. The result of a previous call to `$subscribe`
 */
declare var unsubscribe: (subscription: Subscription) => Promise<any>;

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
  action: Action<any>,
) => Promise<any>;

/**
 * In Membrane, use `$cron`, `$invokeIn` or `$invokeAt` on an action instead of `setInterval`
 * @deprecated
 */
declare var setInterval: (cb: () => any, ms: number) => number;

/**
 * Represents the Clock node in Membrane, providing time-related functionality.
 */
interface Clock {
  /**
   * Pauses execution for a specified number of seconds.
   * @param args - An object containing the number of seconds to sleep.
   */
  sleep: Action<void> & ((args: { seconds: number }) => Action<void>);

  /**
   * Sets up a timer that invokes an action periodically based on a cron-like specification.
   * @param args - An object containing the timer configuration.
   */
  timer: Action<void> &
    ((args: {
      key: string;
      spec: string;
      action: () => void | Promise<void>;
    }) => Action<void>);

  /**
   * Sets up a timer that invokes an action at a specific time.
   * @param args - An object containing the timer configuration.
   */
  timerAt: Action<void> &
    ((args: {
      key: string;
      seconds: number;
      action: () => void | Promise<void>;
    }) => Action<void>);
}

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
