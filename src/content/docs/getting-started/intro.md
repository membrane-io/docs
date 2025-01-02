---
title: Intro
description: An overview of Membrane and its uses
---

<a href="https://www.membrane.io">Membrane</a> is a new and powerful way to
quickly build applications, utilities and internal tools with TypeScript, while
integrating with the apps and services you already use.

To effectively use Membrane, we recommend first playing around with the
[Hello World](/getting-started/hello-world) program and then learning the
[core concepts](/concepts/programs) that make Membrane unique and powerful.

<!-- TODO: Add a visualization that communicates what membrane is in a few seconds -->

## What's different?

Membrane has some superpowers that differentiate it from other
JavaScript/TypeScript environments, most notably:

- [Programs are durable](/concepts/programs). There's no need to store & load
  data from a database. Instead, keep everything in the `state` object.
- [Access everything via a unified graph](/concepts/the-graph). Access external
  APIs in a standard way without worrying about API quirks, SDKs or reading lots
  of docs.
- [Everything is in the logs](/concepts/observability). Our runtime uses a
  write-ahead log, so if it's not in the logs, it didn't happen. Our logs are
  also semantically rich and let you quickly rerun actions.
- **Easy [HTTP](/guides/endpoints) and [email](/guides/email)**. Every
  program comes with its own domain name and email address. Simply export an
  `endpoint` or `email` function to quickly build powerful automations.
- [Cronjobs](/guides/timers). Easily run functions on a schedule.
- **And much more!** Like visual tools to explore program state, instant
  deployments, a built-in REPL, easy SMS integration, and (coming soon) a
  fully-fledged debugger.

## When to use Membrane

Popular use cases for Membrane include

- Internal tools
- Long-lived workflows
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

If you're building an application that needs to scale horizontally to handle
very high throughput, you should **not** use Membrane. This is because Membrane
[trades off scalability for developer experience](/concepts/programs). In many
cases, you can still use Membrane for parts of your application that don't need
to handle large amounts of traffic.

## Community

Come join us on <a href="https://discord.gg/4RHyJDV8kj" target="_blank">our
Discord</a> or reach out via [contact@membrane.io](mailto:contact@membrane.io).
We'll help you get set up and and build whatever your heart desires.

By the way, these docs are open source. To contribute, click `Edit page` at the
bottom of any page, or open a PR directly on
[our GitHub repo](https://github.com/membrane-io/docs).
