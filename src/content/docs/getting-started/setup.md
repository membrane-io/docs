---
title: Setup
---

## Membrane Web IDE

Membrane's primary interface is the Membrane Web IDE. The IDE is where you deploy Membrane programs, set up cron jobs, inspect logs, and more.

Visit <a href="https://membrane.io/ide" target="_blank">membrane.io/ide</a> to get started.

### Orienting yourself

When the IDE starts up, you'll see the Program Navigator (sidebar), Membrane Logs (bottombar), and an open file, `hello-world/index.ts`.

![Membrane Web IDE](/cloud-assets/membrane-web-ide.png)

There are four Membrane programs pre-installed in your workspace:

1. [`http`](/features/endpoints/#http-program)
2. [`email`](/features/email)
3. [`sms`](/features/sms)
4. [`hello-world`](/getting-started/hello-world)

We'll cover each of these in subsequent sections. For now, continue to the next section to create your first program.

## Membrane CLI

Membrane also includes a CLI tool called [`mctl`](/reference/cli). The CLI is for more advanced use cases and isn't required when first starting out. Feel free to skip ahead to the next section.

You can install `mctl` for any platform via npm:

```sh
npm install -g @membrane/mctl
```
