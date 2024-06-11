---
title: Schema
---

A Membrane program's graph is defined by its _schema_, autogenerated in `<your-program>/memconfig.json` based on the schema you configure in the Explorer panel.

The schema is a set of types that represent nodes in the program's graph. Nodes can be _fields_, _actions_, or _events_.

- **Fields**: queryable nodes and values
- **Actions**: invocable functions on a node
- **Events**: subscribable notifications

<video src="/cloud-assets/schema.mp4" muted autoplay loop></video>

## Root Type

Schemas must include a `Root` type which defines the type of the program's _root
node_. This node serves as the entry point into the program—all references are relative to the root node.

Nodes are referred to by the program's name followed by a colon and then a path to the node from the `Root` type. For example:

- `github:` refers to the root node of the [github driver](https://github.com/membrane-io/membrane-driver-github)
- `twitter:` refers to the root node of the [twitter driver](https://github.com/membrane-io/membrane-driver-twitter)
- `github:users.one(name:"membrane-io")` refers to a Github `User`
- `github:users.one(name:"membrane-io").repos.one(name:"directory")` refers to a `Repository`

## Fields

Fields are queryable nodes that hold values you can read. From the [github driver](https://github.com/membrane-io/membrane-driver-github):

- `github:status` is a field of type `String` via the `status` field on the `Root` type
- `github:users` is a field of type `UserCollection` via the `users` field on the `Root` type
- `github:users.one(name:"membrane-io")` refers to a node of type `User`
- `github:users.one(name:"juancampa")` refers to _another_ node of type `User`

The two last examples show that parameters can be passed to fields where each combination of parameters
represent a different node in the graph.

We call these references _handles_ or _grefs_ (short for graph reference).

## Actions

Actions are functions that can be invoked in the context of a graph node. Note that since actions are graph nodes too, they can be passed around and referenced just like fields.

## Events

Events are members on a type which can be "emitted" by programs when something of interest happens on one of its nodes. Other programs can subscribe to get notified.

Programs can subscribe an action to handle an event. When an event is emitted, the action will be invoked with an additional parameter called `event`.