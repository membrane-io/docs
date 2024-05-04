---
title: Frequently Asked Questions
---

## Differences with Node.js

Even though Membrane programs are written in TypeScript/JavaScript, they work differently from a typical Node.js
or browser programs in a couple of fundamental ways:

1. Membrane programs are durable
   - There's no need to store data in external databases or files. Use the `state` object instead
   - Actions can run indefinitely (e.g. `await`'ing an email reply)
1. Membrane programs are event-sourced
   - each program has a log that it writes all effects to which are then processed by membrane separately. That means all actions taken by a program are _guaranteed_ to be in the logs. If it's not logged, it didn't happen.
1. All communication happens through the graph
   - Even `fetch` is implemented using graph nodes

## Do NPM modules work?

Many NPM modules can be used in membrane but not all of them, especially if they depend on specific Node.js APIs. We strive to provide a compatibility layer but it's still work-in-progress.
