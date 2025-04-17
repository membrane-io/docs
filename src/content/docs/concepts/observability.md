---
title: Observability
---

Membrane Logs are semantically rich, so every action, query, or event can be
inspected with a click.

![membrane logs](@assets/observability.png)

## Perfect observability

Everything that happens in Membrane gets written to the program's log first
(SQLite file in the backend). The log is the source of truth. For something to
happen, it must first go in the log before being processed.

Having a write-ahead log means that Membrane has _perfect observability._ If
it's not in the log, it didn't happen. And since the database records all
communication between programs, you can trace events from end to end. When using
Membrane you can always understand what happened.
