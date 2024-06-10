---
title: Installation
---

## Membrane Web IDE

Membrane's primary interface is the Membrane Web IDE (fork of VS Code). The IDE is where you deploy Membrane programs, set up cron jobs, manually run programs, inspect logs, and more.

Visit [membrane.io/ide](https://www.membrane.io/ide) to sign up and open your Membrane workspace.

<!-- TODO: add gif of web IDE startup -->

### Welcome screen

When the IDE starts up you'll see Membrane's Program Explorer and Program Logs panels and a welcome screen. The welcome screen provides a tour of the Explorer and Logs.

The welcome screen also links to an interactive `getting-started` tutorial program that comes pre-installed in every user's workspace. We highly recommend going through that hands-on tutorial as your first Membrane program!

---

## Membrane CLI

Membrane also includes a CLI tool called `mctl`. The CLI is for more advanced use cases and isn't required when first starting out. Feel free to skip ahead to the next section.

You can install `mctl` for any platform via npm:

```sh
npm install -g @membrane/mctl
```
