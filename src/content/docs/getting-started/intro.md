---
title: Intro
description: An overview of Membrane and its uses
---

<a href="https://www.membrane.io">Membrane</a> is a fast, powerful way to write internal tools in TypeScript, connecting the apps you already use at work.

Popular use cases for Membrane include automations using APIs, email, text messages, long-lived workflows, cron jobs, webhook handlers, web scraping, chat bots, and many more.

<!-- TODO: Add a visualization that communicates what membrane is in a few seconds -->

## What's different?

Membrane has some superpowers that differentiate it from other JavaScript/TypeScript environments, most notably:

- _Programs are durable_: there's no need to store & load data from a database—just keep data you want to save in the `state` object.
- _Access APIs via a unified graph_: use external APIs in a standard way without worrying about API quirks and reading lots of docs.
- _Everything is in the logs_: Our runtime uses a write-ahead log, so if it's not in the logs, it didn't happen.
- _Programmable email_: every program comes with an email address. Simply export an `email` function to programmatically handle incoming email.

Check out our <a href="https://www.membrane.io">homepage</a> for a full showcase of features & examples.

## Community

Come join us on <a href="https://discord.gg/4RHyJDV8kj" target="_blank">Membrane's Discord</a> or reach out via `contact@membrane.io`. We'll help you get set up and show you around.

:::note
These docs are open source. To contribute, click `Edit page` at the bottom of any page, or open a PR directly on <a href="https://github.com/membrane-io/docs" target="_blank">our GitHub repo</a>.
:::
