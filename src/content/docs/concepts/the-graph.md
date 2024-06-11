---
title: The Graph
---

Each Membrane program is its own _graph_, with data and functionality represented by nodes in the graph.

<!-- TODO: visualization -->

As a mental model, you can think of all your different Membrane programs as nodes in your overall Membrane graph, with each program node as its own subgraph. Your programs connect to one another—or even subnodes of another program—in this larger graph. For example, the `email` program that comes pre-installed might connect to many other programs that use it.

## Benefits

The Membrane Graph is a powerful abstraction that:

- Unifies how data is read regardless of its source, be it an API or your own data
- Abstracts away particularities of individual APIs like pagination, data formats, headers, webhook models, URL encoding, etc.
- Provides a way to declaratively reference data in a fine-grained way
- Allows for easy understanding of the flow of events and data
- Serves as an access-control mechanism. Programs can only access what you allow and nothing else

The graph guarantees that programs—especially ones you didn't write—can do what they say they do, and nothing
else. It also enables visibility into everything a program has done. Nothing is opaque in Membrane.

Membrane programs can't directly make network requests. Instead, they interact with the world via graph nodes. Even `fetch` uses the graph behind the scene by using the `http` program.
