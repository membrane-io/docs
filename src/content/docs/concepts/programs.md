---
title: Programs
---

A `program` is TypeScript or JavaScript code that runs in Membrane's serverless cloud runtime. Unlike traditional serverless runtimes, it's [stateful](/features/state/) and consists of multiple handlers instead of a single function.

A Membrane program consists of:

- **Code**: TypeScript/JavaScript handlers for fields, actions and events.
- **Schema**: nodes exposed in the graph. The program's own API.
- **Dependencies**: nodes used by the program.
- **Implicit Handlers**: optional functions that recieve HTTP requests, emails, etc.

## Graph and Schema

Programs that expose data and functionality do so by exposing a graph of nodes.

To expose a graph, programs declare a schema that determines the shape of its nodes and how they related to each other.

A schema is composed of types, and each type is composed of fields, actions and events (collectively refered to as members).

- **fields**: queriable nodes and values.
- **actions**: invocable functions on a node.
- **events**: subscribable notifications.

A program's schema must always define a type named `Root` which serves as the entry point into the rest of its graph.

## Code

Programs must have an `index.ts` or `index.js` exporting resolver functions.

## Dependencies

Programs declare ahead of time the nodes needed from the graph.

These handles are then available as variables in the `nodes` object from the `membrane` module.

## State object

Programs have a `state` object that can be used to persist state between updates. This object can be accessed from the
`membrane` module.

Technically, since the entire JS heap is continually persisted, you could just use module-level variables to store
state. But since each update creates a new ES Module, prior values are not accessible from newer modules, hence the need
for `state` to share state across different version of the program's code (i.e. different ESM modules).

## Endpoint

Each Membrane program has its own publicly available domain name which they can use to respond to HTTP requests.

## Expressions

Programs can declare that they recognize certain text expressions and are able to turn them into corresponding node
handles.

This is what allows the browser plugin to scan a web page and find the corresponding handles.
