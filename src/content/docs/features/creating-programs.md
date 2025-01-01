---
title: Creating Programs
---

To create a program, click the `+ NEW` button (top-left) and choose a template. You can also install
[packages](/concepts/packages) which are program bundles published by other users.

## Code organization

A Membrane program contains at least two files:

{/_ prettier-ignore _/}

1. **`memconfig.json`** describes the program's schema, i.e. its API.
1. **`index.ts`:** exports functions that will be called to handle queries, actions, events, etc.

Our IDE provides a schema editor so you rarely need to modify `memconfig.json` by hand, but you can if convenient.

Programs using NPM packages will also include a **`package.json`** file.

There's also **`memconfig.lock`:**, which tracks versions of graph connections. It's automatically generated when
connections are modified. This file is hidden by default, and you rarely have to worry about it.

## Stopping and deleting programs

In Membrane you rarely need to stop a program because you can modify its code. However, if you need to stop a program
for any reason, you can do so by right clicking on its name in the Navigator and selecting `Stop`. A program must be
stopped in order to delete it.

Currently, when a program is stopped and started again **its state will be lost**. Membrane can resume stopped programs, but
this functionality is currently not exposed in the IDE. Let us know if you need to restore the state of a stopped
program and we'll do it for you. Keep in mind that this might not be possible if a program has been stopped for too long.

Once a program is stopped, its files will remain in the Navigator under the `NOT RUNNING` section. From there you can redeploy it
if you want.

You can permanently delete these files from the right-click context menu.

:::danger
When you stop a running program, its state will be lost. Let us know if you need to restore.
:::
