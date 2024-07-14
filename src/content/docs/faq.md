---
title: Frequently Asked Questions
---

## Differences from Node.js

Even though Membrane programs are written in TypeScript/JavaScript, they work differently from typical Node.js
or browser programs in a couple of fundamental ways:

1. Membrane programs are [durable](/features/state)
   - There's no need to store data in external databases or files—use the `state` object instead
   - Actions can run indefinitely (e.g. `await`'ing an email reply)
1. Membrane programs are event-sourced
   - Each program has a write-ahead log that records all effects, which are then processed by membrane separately
   - That means all actions taken by a program are _guaranteed_ to be in the logs—if it's not in the logs, it didn't happen
1. All communication happens through the graph
   - Even `fetch` is implemented using graph nodes

## Do NPM modules work?

Many NPM modules can be used in Membrane, but not all of them, especially if they depend on specific Node.js APIs. We strive to provide a compatibility layer, but it's still work-in-progress.
