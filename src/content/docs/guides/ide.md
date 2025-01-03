---
title: The IDE
---

Membrane's primary interface is the Membrane Web IDE. The IDE is where you write
and deploy programs, set up cron jobs, inspect logs, and more. We built our own
IDE to tightly integrate all our features and provide a great developer
experience.

Visit <a href="https://membrane.io/ide" target="_blank">membrane.io/ide</a> to
get started.

:::tip

You can open these docs as a webview in the IDE. Open the command palette
(`cmd/ctrl+shift+p`) and type `Open docs`.

:::

### Orienting yourself

When the IDE starts up, you'll see:

1. Program Navigator (left sidebar)
2. Membrane Logs (bottom bar)
3. Program Details (right sidebar)
4. Welcome instructions & open program file, `hello-world/index.ts`

![Membrane Web IDE](@assets/ide-orientation.png)

There are four Membrane programs pre-installed in your workspace:

1. [`http`](/guides/endpoints/#http-program)
2. [`email`](/guides/email)
3. [`sms`](/guides/sms)
4. [`hello-world`](/getting-started/hello-world)

We'll cover each of these in subsequent sections. For now, continue to the next
section to create your first program.
