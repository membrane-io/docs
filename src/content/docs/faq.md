---
title: Frequently Asked Questions
---

## Differences from Node.js

Even though Membrane programs are written in TypeScript/JavaScript, they work
differently from typical Node.js or browser programs in a few fundamental ways:

1. _Membrane programs are [durable](/guides/state)_. There's no need to store
   data in external databases or files—use the `state` object instead. Actions
   can run indefinitely (e.g. `await`'ing an email reply).
1. _Membrane programs are event-sourced_. Each program has a write-ahead log
   that records all effects, which are then processed by membrane separately.
   That means all actions taken by a program are _guaranteed_ to be in the
   logs—if it's not in the logs, it didn't happen.
1. _All communication happens through the graph_. Even `fetch` is implemented
   using graph nodes.

## Do npm modules work?

In many cases, yes. To use an npm package:

1. Create a `package.json` file
1. Add any packages to `dependencies`
1. Save the program

Not all npm modules can be used in Membrane, especially if they depend on
specific Node.js APIs that we don't yet support.

:::note

Please reach out to [contact@membrane.io](mailto:contact@membrane.io) if you
find a package that fails to load due to missing functionality—we're working on
closing runtime support gaps and would be happy to implement your request.

:::
