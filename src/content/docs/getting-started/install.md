---
title: Installation
---

## Membrane Web IDE

Membrane's primary interface is the Membrane Web IDE (fork of VS Code). The IDE is where you deploy Membrane programs, set up cron jobs, manually run programs, inspect logs, and more.

Visit <a href="https://membrane.io/ide" target="_blank">membrane.io/ide</a> to sign up and open your Membrane workspace.

### Orienting yourself in the IDE

When the IDE starts up, you'll see Membrane's Program Navigator (sidebar), Program Logs (bottombar), and a welcome/start screen (active tab). The welcome tab provides a quick tour of the Navigator and Logs.

The welcome tab also links to an interactive `getting-started` tutorial that comes pre-installed in your workspace. We recorded a <a href="https://share.descript.com/view/Smb0rEUzMkk" target="_blank">video walk-through of the tutorial</a> if you'd like to follow along with each step.

<video src="/cloud-assets/getting-started.mp4" muted autoplay loop></video>

:::tip
We recommend going through the `getting-started` tutorial as your first Membrane program (with our <a href="https://share.descript.com/view/Smb0rEUzMkk" target="_blank">video recording</a>, if you'd like). It's a hands-on way to learn core features and concepts by doing.
:::

---

## Membrane CLI

Membrane also includes a CLI tool called `mctl`. The CLI is for more advanced use cases and isn't required when first starting out. Feel free to skip ahead to the next section.

You can install `mctl` for any platform via npm:

```sh
npm install -g @membrane/mctl
```
