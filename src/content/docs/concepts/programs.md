---
title: Programs
---

A _program_ is TypeScript or JavaScript code that runs in Membrane's serverless cloud runtime. Unlike traditional serverless runtimes, it is [stateful](/features/state/) and includes multiple handlers instead of a single function.

A Membrane program consists of:

- **Code**: TypeScript/JavaScript handlers for fields, actions and events
- **Schema**: nodes exposed in [the graph](/concepts/the-graph)—the program's own API
- **Dependencies**: nodes used by the program
- **Implicit Handlers**: optional functions that recieve HTTP requests, emails, etc.

## Graph and Schema

Programs that expose data and functionality do so by exposing a _graph_ of nodes.

To expose a graph, programs declare a _schema_ that determines the shape of its nodes and how they relate to each other. A schema is composed of types, and each type is composed of _fields_, _actions_ and _events_.

- **Fields**: queryable nodes and values
- **Actions**: invocable functions on a node
- **Events**: subscribable notifications

A program's schema must always define a type named `Root` which serves as the entry point into the rest of its graph. You can add types to a program's schema through the Explorer panel.

<!-- TODO: video of adding a type -->

## Code

Core program logic lives in a `your-program/index.ts` or `your-program/index.js` file that exports resolver functions.

## Dependencies

Programs declare ahead of time the nodes needed from the graph.

These handles are then available as variables in the `nodes` object from the `membrane` module. To add a dependency to a program, drag it from the Explorer panel into the schema viewer.

<!-- TODO: video of adding a dependency -->

## State object

Programs have a `state` object that persists state between updates (i.e. deploying your program on save) and invocations (i.e. running your program manually or on a timer). `state` is imported from the `membrane` module.

:::note
Technically, since the entire JS heap is continually persisted, you could just use module-level variables to store
state. But since each update creates a new ES Module, prior values are not accessible from newer modules, hence the need
for `state` to share state across different version of the program's code (i.e. different ESM modules).
:::

## Endpoint

Each Membrane program has its own publicly available domain name which they can use to respond to HTTP requests.

To access a program's endpoint URL, right click on the program in the Explorer panel.

<!-- TODO: video of accessing the endpoint URL -->

<!-- TODO: uncomment and expand section when Chrome extension is re-deployed -->
<!-- ## Expressions

Programs can declare that they recognize certain text expressions and are able to turn them into corresponding node
handles.

This is what allows the browser plugin to scan a web page and find the corresponding handles. -->
