---
title: Timers
---

Membrane actions can be invoked manually or automatically, on a timer. Membrane supports three types of timers:

1. Delays
2. Scheduled
3. Crons

To set up a timer, navigate to the Explorer panel, click on any program, find the [action](/concepts/the-graph#actions) you want to run, and click the clock icon to configure when the program should run.

<!-- TODO: add video of creating a timer from the explorer -->

## Setting up timers programmatically

You can also set up timers in a Membrane program's code. These three commands correspond to the three types of timers listed above:

1. `.$invokeIn()`
2. `.$invokeAt()`
3. `.$cron()`
