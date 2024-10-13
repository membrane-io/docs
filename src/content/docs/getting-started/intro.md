---
title: Introduction to Membrane
description: An overview of Membrane and its uses
---

:::note
These docs are open source. Feel free to open a PR <a href="https://github.com/membrane-io/docs" target="_blank">on GitHub</a> for fixes/improvements. If you have any questions, please <a href="https://discord.gg/4RHyJDV8kj" target="_blank">reach out to us on Discord</a>.
:::

Membrane is a service that greatly simplify the process of building and deploying small applications using TypeScript.
Some use cases for Membrane are automation using APIs, email, text messages, long-lived workflows, cronjobs, webhook
handlers, scraping, chat bots, and many more.

## What's different?

Membrane's super powers come from a few features that makes it different to other JavaScript/TypeScript environments, most notably:

 - Programs are durable: there's no need to store/load data from a database, just keep your normal variables in the `state` object.
 - Access APIs via a unified graph: use external APIs with ease.
 - Everything is in the logs: Our runtime uses a write-ahead log so if it's not in the logs, it didn't happen.
 - Built-in email: every program comes with an email address. Just export an `email` function.

Check out our <a href="https://www.membrane.io">home page</a> for an overview of the main features and examples.

<!-- TODO: Add a visualization that communicates what membrane is in a few seconds -->

