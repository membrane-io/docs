---
title: Membrane Control CLI (mctl)
---

Nearly any operation that can be performed in the Membrane Web IDE can also be completed in the CLI.

See the [installation page](/getting-started/install/#membrane-cli) for setup instructions.

<!-- USAGE -->

## Usage

```cli-help
mctl 1.9.1
Membrane Control CLI: mctl

USAGE:
    mctl [OPTIONS] <SUBCOMMAND>

OPTIONS:
    -h, --host <HOST>              API hostname to use [default: api.membrane.io]
        --help                     Print help information
    -p, --port <PORT>              API port to use [default: 443]
        --rpc                      Whether to output machine-readable JSON instead of text
    -V, --version                  Print version information
    -w, --workspace <WORKSPACE>    Path to Membrane workspace to use [default:
                                   /Users/just-be/membrane]

SUBCOMMANDS:
    action                   Invokes an action on a node
    assign                   Assigns a program to a particular mnode (admin only)
    auth-token               Prints the auth token from the config file
    clone                    Clones an existing program creating a brand new one in your
                                 workspace and updates it
    create                   Create a new program
    details                  Fetches the detail of an item by its "seq" number
    exit-node                Starts an HTTP exit node. Outgoing traffic from all programs will
                                 be routed through this computer
    get-transpiled-source    Downloads the transpiled source code of a running program
    git-clone                Clones a program from a github repo to your workspace
    help                     Print this message or the help of the given subcommand(s)
    ide                      Opens your Membrane workspace in Visual Studio Code ensuring the
                                 extension is installed
    kill                     Kill a running program
    login                    Log into your account
    logs                     Stream the logs of a program
    ps                       List running programs
    query                    Queries a program
    repl                     Enter into a program's REPL mode
    resolve-types            Updates memconfig.lock with the most recent types
    tag                      Tags a gref so it can be used like `#tag:`
    test                     Runs all tests actions in a program
    update                   Update a new program
    workspace-init           Initializes a directory to be a Membrane workspace
    workspace-path           Prints the path to the workspace
```

<!-- SUBCOMMANDS -->

## Subcommands

### action

```cli-help
mctl-action
Invokes an action on a node

USAGE:
    mctl action <GREF>

ARGS:
    <GREF>    Gref to invoke action on (TODO: this should include the action and args)

OPTIONS:
    -h, --help    Print help information
```

### assign

```cli-help
mctl-assign
Assigns a program to a particular mnode (admin only)

USAGE:
    mctl assign <PID> [MNODE]

ARGS:
    <PID>      Program name or id. [default: containing directory name]
    <MNODE>    The mnode to assign to, or empty if unassigning

OPTIONS:
    -h, --help    Print help information
```

### auth-token

```cli-help
mctl-auth-token
Prints the auth token from the config file

USAGE:
    mctl auth-token

OPTIONS:
    -h, --help    Print help information
```

### clone

```cli-help
mctl-clone
Clones an existing program creating a brand new one in your workspace and updates it

USAGE:
    mctl clone <PID> <NAME>

ARGS:
    <PID>     Program name or id to clone
    <NAME>    Name of program to create

OPTIONS:
    -h, --help    Print help information
```

### create

```cli-help
mctl-create
Create a new program

USAGE:
    mctl create [PIDS]...

ARGS:
    <PIDS>...    Program ids to create

OPTIONS:
    -h, --help    Print help information
```

### details

```cli-help
mctl-details
Fetches the detail of an item by its "seq" number

USAGE:
    mctl details <PID> <SEQ>

ARGS:
    <PID>    Program id to stream the logs of
    <SEQ>

OPTIONS:
    -h, --help    Print help information
```

### exit-node

```cli-help
mctl-exit-node
Starts an HTTP exit node. Outgoing traffic from all programs will be routed through this computer

USAGE:
    mctl exit-node [OPTIONS]

OPTIONS:
    -h, --help                         Print help information
    -t, --transformer <TRANSFORMER>    A script invoked for every request. It can, for example, add
                                       auth headers
```

### get-transpiled-source

```cli-help
mctl-get-transpiled-source
Downloads the transpiled source code of a running program

USAGE:
    mctl get-transpiled-source <PID> <OUTPUT_PATH>

ARGS:
    <PID>            Program id to get the source code of
    <OUTPUT_PATH>    Path to store the source code

OPTIONS:
    -h, --help    Print help information
```

### git-clone

```cli-help
mctl-git-clone
Clones a program from a github repo to your workspace

USAGE:
    mctl git-clone <REPO> [NAME]

ARGS:
    <REPO>    URL of git repo to use or "<user>/<repo>" if using GitHub
    <NAME>    Name of program to create (defaults to name of repo)

OPTIONS:
    -h, --help    Print help information
```

### ide

```cli-help
mctl-ide
Opens your Membrane workspace in Visual Studio Code ensuring the extension is installed

USAGE:
    mctl ide

OPTIONS:
    -h, --help    Print help information
```

### kill

```cli-help
mctl-kill
Kill a running program

USAGE:
    mctl kill [PIDS]...

ARGS:
    <PIDS>...    Program ids to kill

OPTIONS:
    -h, --help    Print help information
```

### login

```cli-help
mctl-login
Log into your account

USAGE:
    mctl login

OPTIONS:
    -h, --help    Print help information
```

### logs

```cli-help
mctl-logs
Stream the logs of a program

USAGE:
    mctl logs <PID>

ARGS:
    <PID>    Program id to stream the logs of

OPTIONS:
    -h, --help    Print help information
```

### ps

```cli-help
mctl-ps
List running programs

USAGE:
    mctl ps [OPTIONS]

OPTIONS:
        --all           Don't filter out dependency aux programs
    -h, --help          Print help information
        --names-only    Only print program names
```

### query

```cli-help
mctl-query
Queries a program

USAGE:
    mctl query <GREF> [QUERY]

ARGS:
    <GREF>     Gref to query
    <QUERY>    Query to perform or empty if gref points to scalar

OPTIONS:
    -h, --help    Print help information
```

### repl

```cli-help
mctl-repl
Enter into a program's REPL mode

USAGE:
    mctl repl [OPTIONS] <PID>

ARGS:
    <PID>    Program name or id to enter the REPL. [default: containing directory name]

OPTIONS:
    -e, --expression <EXPRESSION>    Optional expression to evaluate
    -h, --help                       Print help information
```

### resolve-types

```cli-help
mctl-resolve-types
Updates memconfig.lock with the most recent types

USAGE:
    mctl resolve-types [PATH]

ARGS:
    <PATH>    Path to the program directory [default: .]

OPTIONS:
    -h, --help    Print help information
```

### tag

```cli-help
mctl-tag
Tags a gref so it can be used like `#tag:`

USAGE:
    mctl tag <GREF> <NAME>

ARGS:
    <GREF>    Gref to query
    <NAME>    Name of tag

OPTIONS:
    -h, --help    Print help information
```

### test

```cli-help
mctl-test
Runs all tests actions in a program

USAGE:
    mctl test <PID>

ARGS:
    <PID>    Program id to test

OPTIONS:
    -h, --help    Print help information
```

### update

```cli-help
mctl-update
Update a new program

USAGE:
    mctl update [OPTIONS] <PID>

ARGS:
    <PID>    Program name or id. [default: containing directory name]

OPTIONS:
    -h, --help                       Print help information
        --no-restore <NO_RESTORE>
```

### workspace-init

```cli-help
mctl-workspace-init
Initializes a directory to be a Membrane workspace

USAGE:
    mctl workspace-init

OPTIONS:
    -h, --help    Print help information
```

### workspace-path

```cli-help
mctl-workspace-path
Prints the path to the workspace

USAGE:
    mctl workspace-path

OPTIONS:
    -h, --help    Print help information
```

<!-- END -->
