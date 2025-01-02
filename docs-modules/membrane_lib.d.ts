/// <reference no-default-lib="true"/>
/// <reference path="buffer.d.ts" />
/// This file contains declarations that Membrane supports from the DOM/webworker/node APIs.

type JsonObject = { [x: string]: Json };
type Json = string | number | boolean | JsonObject | Array<Json>;

/** The URL interface represents an object providing static methods used for creating object URLs. */
interface URL {
  hash: string;
  host: string;
  hostname: string;
  href: string;
  toString(): string;
  readonly origin: string;
  password: string;
  pathname: string;
  port: string;
  protocol: string;
  search: string;
  readonly searchParams: URLSearchParams;
  username: string;
  toJSON(): string;
}

declare var URL: {
  prototype: URL;
  new (url: string | URL, base?: string | URL): URL;
  createObjectURL(obj: Blob): string;
  revokeObjectURL(url: string): void;
};

interface URLSearchParams {
  /** Appends a specified key/value pair as a new search parameter. */
  append(name: string, value: string): void;
  /** Deletes the given search parameter, and its associated value, from the list of all search parameters. */
  delete(name: string): void;
  /** Returns the first value associated to the given search parameter. */
  get(name: string): string | null;
  /** Returns all the values association with a given search parameter. */
  getAll(name: string): string[];
  /** Returns a Boolean indicating if such a search parameter exists. */
  has(name: string): boolean;
  /** Sets the value associated to a given search parameter to the given value. If there were several values, delete the others. */
  set(name: string, value: string): void;
  /** Sorts all key/value pairs, if any, by their keys. */
  sort(): void;
  /** Returns a string containing a query string suitable for use in a URL. Does not include the question mark. */
  toString(): string;
  /** Returns an iterator allowing iteration through all keys of the key/value pairs contained in this object. */
  keys(): IterableIterator<string>;
  /** Returns an iterator allowing iteration through all values of the key/value pairs contained in this object. */
  values(): IterableIterator<string>;
  /** Returns an iterator allowing iteration through all key/value pairs contained in this object in the same order as they appear in the query string. */
  entries(): IterableIterator<[name: string, value: string]>;
  /** Allows iteration through all values contained in this object via a callback function. */
  forEach(
    callbackfn: (value: string, key: string, parent: URLSearchParams) => void,
    thisArg?: any,
  ): void;
}

declare var URLSearchParams: {
  prototype: URLSearchParams;
  new (
    init?: string[][] | Record<string, string> | string | URLSearchParams,
  ): URLSearchParams;
  toString(): string;
};

type BufferSource = ArrayBufferView | ArrayBuffer;

interface TextDecodeOptions {
  stream?: boolean;
}

interface TextDecoderOptions {
  fatal?: boolean;
  ignoreBOM?: boolean;
}

interface TextEncoderEncodeIntoResult {
  read?: number;
  written?: number;
}

/** A decoder for a specific method, that is a specific character encoding, like utf-8, iso-8859-2, koi8, cp1261, gbk, etc. A decoder takes a stream of bytes as input and emits a stream of code points. For a more scalable, non-native library, see StringView – a C-like representation of strings based on typed arrays. */
interface TextDecoder extends TextDecoderCommon {
  /**
   * Returns the result of running encoding's decoder. The method can be invoked zero or more times with options's stream set to true, and then once without options's stream (or set to false), to process a fragmented input. If the invocation without options's stream (or set to false) has no input, it's clearest to omit both arguments.
   *
   * ```
   * var string = "", decoder = new TextDecoder(encoding), buffer;
   * while(buffer = next_chunk()) {
   *   string += decoder.decode(buffer, {stream:true});
   * }
   * string += decoder.decode(); // end-of-queue
   * ```
   *
   * If the error mode is "fatal" and encoding's decoder returns error, throws a TypeError.
   */
  decode(input?: BufferSource, options?: TextDecodeOptions): string;
}

declare var TextDecoder: {
  prototype: TextDecoder;
  new (label?: string, options?: TextDecoderOptions): TextDecoder;
};

interface TextDecoderCommon {
  /** Returns encoding's name, lowercased. */
  readonly encoding: string;
  /** Returns true if error mode is "fatal", otherwise false. */
  readonly fatal: boolean;
  /** Returns the value of ignore BOM. */
  readonly ignoreBOM: boolean;
}

/** TextEncoder takes a stream of code points as input and emits a stream of bytes. For a more scalable, non-native library, see StringView – a C-like representation of strings based on typed arrays. */
interface TextEncoder extends TextEncoderCommon {
  /** Returns the result of running UTF-8's encoder. */
  encode(input?: string): Uint8Array;
  /** Runs the UTF-8 encoder on source, stores the result of that operation into destination, and returns the progress made as an object wherein read is the number of converted code units of source and written is the number of bytes modified in destination. */
  encodeInto(
    source: string,
    destination: Uint8Array,
  ): TextEncoderEncodeIntoResult;
}

declare var TextEncoder: {
  prototype: TextEncoder;
  new (): TextEncoder;
};

interface TextEncoderCommon {
  /** Returns "utf-8". */
  readonly encoding: string;
}

type RequestMethod =
  | "get"
  | "post"
  | "put"
  | "delete"
  | "patch"
  | "head"
  | "options"
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "HEAD"
  | "OPTIONS";

interface RequestInit {
  /** The HTTP method to use (default: "GET") */
  method?: string;
  /** The Membrane http node to use (default: `nodes.http`) */
  http?: any;
  /** HTTP headers to send in request */
  headers?: Record<string, string>;
  /** HTTP body to send in request */
  body?: string;
}

interface Headers {
  get(name: string): string;
  set(name: string, value: string): string;
  append(name: string, value: string): string;
  delete(name: string): void;
  entries(): IterableIterator<[string, string]>;
  has(name: string): boolean;
  keys(): IterableIterator<string>;
  values(): IterableIterator<string>;
  [Symbol.iterator](): IterableIterator<[string, string]>;
}

interface Response {
  json(): Promise<any>;
  text(): Promise<string>;
  bytes(): Promise<Uint8Array>;
  arrayBuffer(): Promise<ArrayBuffer>;
  readonly status: number;
  readonly statusText: string;
  readonly headers: Headers;
  readonly ok: boolean;
}

declare function fetch(url: string, options?: RequestInit): Promise<Response>;
