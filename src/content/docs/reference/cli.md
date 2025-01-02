---
title: CLI (mctl)
---

Many operations that can be performed in the Membrane Web IDE can also be done
from the command line using `mctl`.

## Installation

You can install `mctl` for any platform via npm:

```sh
npm install -g @membrane/mctl
```

<!-- USAGE -->

## Usage

```cli-help
mctl 1.9.1

USAGE:
    mctl [OPTIONS] <SUBCOMMAND>

OPTIONS:
    -h, --host <HOST>              API hostname to use
        --help                     Print help information
    -p, --port <PORT>              API port to use [default: 443]
        --rpc                      Whether to output machine-readable
                                   JSON instead of text
    -V, --version                  Print version information
    -w, --workspace <WORKSPACE>    Path to Membrane workspace to use

SUBCOMMANDS:
    action                   Invokes an action on a node
    auth-token               Prints the auth token from the config
                             file
    details                  Fetches the detail of an item by its
                             "seq" number
    exit-node                Starts an HTTP exit node. Outgoing
                             traffic from all programs will
                             be routed through this computer
    get-transpiled-source    Downloads the transpiled source code of
    help                     Print this message or the help of the
                             given subcommand(s)
    kill                     Kill a running program
    login                    Log into your account
    logs                     Stream the logs of a program
    ps                       List running programs
    query                    Queries a program
    repl                     Enter into a program's REPL mode
    test                     Runs all tests actions in a program

```

<!-- SUBCOMMANDS -->

## Subcommands

### action

Invokes an action on a node

```cli-help
USAGE:
    mctl action <GREF>

ARGS:
    <GREF>    Gref to invoke action on

OPTIONS:
    -h, --help    Print help information
```

### auth-token

Prints the auth token from the config file

```cli-help
USAGE:
    mctl auth-token

OPTIONS:
    -h, --help    Print help information
```

### details

Fetches the detail of an item by its "seq" number

```cli-help
USAGE:
    mctl details <PID> <SEQ>

ARGS:
    <PID>    Program id to stream the logs of
    <SEQ>

OPTIONS:
    -h, --help    Print help information
```

### exit-node

Starts an HTTP exit node. Outgoing traffic from all programs will be routed
through this computer

```cli-help
USAGE:
    mctl exit-node [OPTIONS]

OPTIONS:
    -h, --help                         Print help information
    -t, --transformer <TRANSFORMER>    A script invoked for every
                                       request. It can, for example, add
                                       auth headers
```

### get-transpiled-source

Downloads the transpiled source code of a running program

```cli-help
USAGE:
    mctl get-transpiled-source <PID> <OUTPUT_PATH>

ARGS:
    <PID>            Program id to get the source code of
    <OUTPUT_PATH>    Path to store the source code

OPTIONS:
    -h, --help    Print help information
```

### kill

Kill a running program

```cli-help
USAGE:
    mctl kill [PIDS]...

ARGS:
    <PIDS>...    Program ids to kill

OPTIONS:
    -h, --help    Print help information
```

### login

Log into your account

```cli-help
USAGE:
    mctl login

OPTIONS:
    -h, --help    Print help information
```

### logs

Stream the logs of a program

```cli-help
USAGE:
    mctl logs <PID>

ARGS:
    <PID>    Program id to stream the logs of

OPTIONS:
    -h, --help    Print help information
```

### ps

List running programs

```cli-help
USAGE:
    mctl ps [OPTIONS]

OPTIONS:
        --all           Don't filter out dependency aux programs
    -h, --help          Print help information
        --names-only    Only print program names
```

### query

Queries a program

```cli-help
USAGE:
    mctl query <GREF> [QUERY]

ARGS:
    <GREF>     Gref to query
    <QUERY>    Query to perform or empty if gref points to scalar

OPTIONS:
    -h, --help    Print help information
```

### repl

Enter into a program's REPL mode

```cli-help
USAGE:
    mctl repl [OPTIONS] <PID>

ARGS:
    <PID>    Program name or id to enter the REPL.

OPTIONS:
    -e, --expression <EXPRESSION>    Optional expression to evaluate
    -h, --help                       Print help information
```

### test

Runs all tests actions in a program

```cli-help
USAGE:
    mctl test <PID>

ARGS:
    <PID>    Program id to test

OPTIONS:
    -h, --help    Print help information
```

<!-- END -->
