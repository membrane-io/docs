---
title: Timers
---

Membrane actions can be invoked manually or automatically, on a timer. Membrane supports three types of timers:

1. Delays
2. Scheduled
3. Crons

To set up a timer, navigate to the Explorer panel, click on any program, find the [action](/concepts/schema#actions) you want to run, and click the clock icon to configure when the program should run.

<!-- TODO: add video of creating a timer from the explorer -->

## Setting up timers in code

You can also set up timers programmatically in Membrane. These three methods can be chained to actions, corresponding to the three types of timers listed above:

1. `.$invokeIn()`
2. `.$invokeAt()`
3. `.$cron()`
