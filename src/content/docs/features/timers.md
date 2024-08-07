---
title: Timers
---

Membrane actions can be invoked manually or automatically, on a timer. We support three types of timers:

1. Delays
2. Scheduled
3. Crons

To set up a timer, navigate to the Navigator panel, click on any program, find the [action](/concepts/schema#actions) you want to run, and click the clock icon to configure when the program should run. Right click a timer to delete.

In this video, we add a cron timer, delete it, then add a delay and observe it firing.

<video src="/cloud-assets/timers.mp4" muted autoplay loop></video>

## Setting timers in code

You can also set up timers programmatically in Membrane. These three methods can be chained to actions, corresponding to the three types of timers listed above:

1. `.$invokeIn()`
2. `.$invokeAt()`
3. `.$cron()`
