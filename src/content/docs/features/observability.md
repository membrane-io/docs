---
title: Observability
---

Everything that happens in Membrane gets written to the program's log first (SQLite file in the backend). _The log is the source of truth._ For something to happen, it must first go in the log and then be processed.

In the screen recording below, we take a look at Membrane Logs for invoking actions, sending email, and receiving an HTTP GET request.

<video src="/cloud-assets/observability.mp4" muted autoplay loop></video>

## Perfect observability

Having a write-ahead log means that Membrane has _perfect observability._ If it's not in the log, it didn't happen.

Logs are semantically rich, so every action, query, or event can be inspected with a click. And since the database records all communication between programs, you can trace events from end to end. When using Membrane you can always understand what happened.
