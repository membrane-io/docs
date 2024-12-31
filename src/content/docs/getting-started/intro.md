---
title: Intro
description: An overview of Membrane and its uses
---

<a href="https://www.membrane.io">Membrane</a> is a new and powerful way to quickly build applications, utilities
and internal tools with TypeScript, while integrating with the apps and services you already use.

To effectively use Membrane, we recommend playing around with the [Hello World](/getting-started/hello-world) program and then learning
the [core concepts](/concepts/programs) that make Membrane unique and powerful.

<!-- TODO: Add a visualization that communicates what membrane is in a few seconds -->

## What's different?

Membrane has some superpowers that differentiate it from other JavaScript/TypeScript environments, most notably:

- **Programs are durable** There's no need to store & load data from a database. Instead, keep everything in the `state` object.
- **Access everything via a unified graph** Use external APIs in a standard way without worrying about API quirks and reading lots of docs.
- **Everything is in the logs** Our runtime uses a write-ahead log, so if it's not in the logs, it didn't happen.
- **Built-in email** Every program comes with an email address. Simply export an `email` function to programmatically handle incoming email.

Start learning more in the [Durable Programs](/concepts/programs) section.

## When to use Membrane

Popular use cases for Membrane include

- Internal tools
- Long lived workflows
- Email or SMS automation
- Slack/Discord/Telegram bots
- LLM-powered AI agents
- Webhook handlers
- Cron jobs
- Simple HTTP APIs
- Simple server-side rendered websites
- Personal utilities
- Prototypes

## When not to use Membrane

If you're building an application that needs to scale horizontally to handle very high throughput, you should **not** use
Membrane. This is because Membrane [trades off scalability for developer experience](/concepts/programs). In many cases,
you can still use Membrane for parts of your application that don't need to handle large amounts of traffic.

## Community

Come join us on <a href="https://discord.gg/4RHyJDV8kj" target="_blank">our Discord</a> or reach out via
`contact@membrane.io`. We'll help you get set up and show you around.

These docs are open source. To contribute, click `Edit page` at the bottom of any page, or open a PR directly on <a
href="https://github.com/membrane-io/docs" target="_blank">our GitHub repo</a>.
