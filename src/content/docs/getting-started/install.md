---
title: Installation
---

## Prerequisites

- Git -- [How to install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- Vscode -- [Download and install VSCode](https://code.visualstudio.com/download)

## VSCode Extension

Membrane's primary interface is its VSCode extension. It handles deploying programs, listing which programs are running, displaying logs, and more.

Install the extension via [VSCode's marketplace website](https://marketplace.visualstudio.com/items?itemName=membrane.membrane) or by searching `Membrane` in the extensions market place directly in vscode.

<video src="/cloud-assets/membrane-install.mp4" muted autoplay loop></video>

### Welcome Screen

When the extension starts it displays a welcome screen. This screen aids in signing in, opening Membrane's [Program Explorer]() and [Program Logs]() panels, and giving a deeper tour of features. It also links off to an interactive tutorial program that comes pre-installed in every user's workspace.

---

# Membrane CLI

Membrane also includes a CLI tool called `mctl`. The CLI is for more advanced use-cases and isn't required when first starting out. Feel free to skip ahead to the next section.

If you're on osx you can install `mctl` via homebrew

```sh
brew tap membrane-io/mctl
brew install mctl
```

If you're on a different platform, you can find the relevant download for you platform on the [releases page](https://github.com/membrane-io/mctl-releases/releases)
