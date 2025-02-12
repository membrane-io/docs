---
title: Timers
---

Membrane actions can be invoked manually or automatically, on a timer. We
support three types of timers:

1. Delays
2. Scheduled
3. Crons

To set up a timer, navigate to the Navigator panel, click on any program, find
the [action](/concepts/schema#actions) you want to run, and click the clock icon
to configure when the program should run. Right click a timer to delete.

Example: add a cron, delete it, then add a delay and observe it firing.
<video src="/videos/timers.mp4" muted autoplay controls></video>

## Delay Timer Options

When using "Invoke after delay...", you can specify durations using these time units:

- `s` - seconds (e.g. "10s")
- `m` - minutes (e.g. "5m")
- `h` - hours (e.g. "12h")
- `d` - days (e.g. "7d")
- `w` - weeks (e.g. "2w")
- `ms` - milliseconds (e.g. "500ms")
- `ns` - nanoseconds (e.g. "100ns")

## Setting timers in code

You can also set up timers programmatically in Membrane. These three methods can
be chained to actions, corresponding to the three types of timers listed above:

1. `.$invokeIn()`
2. `.$invokeAt()`
3. `.$cron()`
