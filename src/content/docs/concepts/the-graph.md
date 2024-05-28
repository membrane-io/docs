---
title: The Graph
---

Each program has a graph which is how you interact with it.

A program's graph is defined by a schema defined in `memconfig.json`.

The schema is a set of types, each of which define fields, actions, and events.

## Root Type

Schemas are required to have a `Root` type which defines the type of the program's "root
node". This node serves as the entry point into the program, all references are relative to the root node.

Nodes are referred to by the program's name followed by a colon and then a path to the node from the `Root` type. For example:

- `github:` refers to the root node of the [github driver](https://github.com/membrane-io/membrane-driver-github)
- `twitter:` refers to the root node of the [twitter driver](https://github.com/membrane-io/membrane-driver-twitter)
- `github:users.one(name:"membrane-io")` referes to a Github `User`
- `github:users.one(name:"membrane-io").repos.one(name:"directory")` referes to a Github `Repository`
- and so on...

## Fields

Types can define fields, which represent values which can be read from it. Continuing with more examples from the [github driver](https://github.com/membrane-io/membrane-driver-github):

- `github:status` field of type `String` via the `status` field of the `Root` type.
- `github:users` field of type `UserCollection` via the `users` field of the `Root` type.
- `github:users.one(name:"membrane-io")` refers to a node of type `User`.
- `github:users.one(name:"juancampa")` refers to _another_ node of type `User`.

From the two last examples, you can see that parameters can be passed to fields, and each combination of parameters
represent a different graph node.

We call these references "handles" or "grefs" (short for graph reference).

## Actions

Types can also define actions. Which are essentially functions that can be invoked in the context of a graph node. Importantly, actions are graph nodes as well so they can be passed around and referenced just like fields.

## Events

Programs can subscribe an action to handle an event. When an event is emitted, the action will be invoked with an additional parameter called `event`.
