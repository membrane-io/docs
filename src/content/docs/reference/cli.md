---
title: Membrane Control CLI (mctl)
---

Nearly any operation that can be performed in the vscode extension can also be completed in the CLI.

## Usage

```cli-help
Membrane Control CLI: mctl

USAGE:
  mctl [OPTIONS] <SUBCOMMAND>

OPTIONS:
  -h, --host <HOST>
  API hostname to use [default: api.membrane.io]

  --help
  Print help information

  -p, --port <PORT>
  API port to use [default: 443]

  --rpc
  Whether to output machine-readable JSON instead of text

  -V, --version
  Print version information

  -w, --workspace <WORKSPACE>
  Path to Membrane workspace to use [default: ~/membrane]

SUBCOMMANDS:
  action
  Invokes an action on a node

  assign
  Assigns a program to a particular mnode (admin only)

  auth-token
  Prints the auth token from the config file

  clone
  Clones an existing program creating a brand new one in your workspace and updates it

  create
  Create a new program

  details
  Fetches the detail of an item by its "seq" number

  exit-node
  Starts an HTTP exit node. Outgoing traffic from all programs will be routed through this computer

  get-transpiled-source
  Downloads the transpiled source code of a running program

  git-clone
  Clones a program from a github repo to your workspace

  help
  Print this message or the help of the given subcommand(s)

  ide
  Opens your Membrane workspace in Visual Studio Code ensuring the extension is installed

  kill
  Kill a running program

  login
  Log into your account

  logs
  Stream the logs of a program

  ps
  List running programs

  query
  Queries a program

  repl
  Enter into a program's REPL mode

  resolve-types
  Updates memconfig.lock with the most recent types

  tag
  Tags a gref so it can be used like `#tag:`

  test
  Runs all tests actions in a program

  update
  Update a new program

  workspace-init
  Initializes a directory to be a Membrane workspace

  workspace-path
  Prints the path to the workspace
```
