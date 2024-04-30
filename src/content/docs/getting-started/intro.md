---
title: Introduction to Membrane
description: An overview of Membrane and its uses
---

Membrane is a serverless TypeScript runtime for building automations and integrations that are deployed and managed directly in your IDE.

Cron-jobs, workflows, Discord bots, polling websites, handling webhooks, are perfect use-cases for Membrane.

## Features

- Durable JavaScript/TypeScript engine. Membrane programs can run forever and the program state is transparently persisted between runs.
- Data Graph. A powerful abstraction that's used for communication between programs and the outside world.
- Capability-based access control. Programs can only access what you allow and nothing else.
- Support for many NPM packages.

## Programs

Membrane is similar to an operating system; you deploy programs to it and it takes care of communication, logging, resources, etc.

In Membrane, you build custom functionality (bots, workflows, etc) by writing programs. Programs can reference each other's nodes to create powerful abstractions.

As a starting user, you'll first install drivers to talk to APIs you care about, then write programs using the nodes exposed by those drivers to build something useful to you or your team. You can always use `fetch` and/or build your own drivers if you want.

Check out [The Program Directory](https://github.com/membrane-io/directory) for many drivers and examples, anyone is welcome to contribute new drivers or improve existing ones.

More information in the [programs]() section.

## The Membrane Graph

As mentioned above, each running program exposes a graph. The combination of these graphs is what we call the user's Membrane Graph.

The Membrane Graph is a powerful abstraction with many benefits:

- Unifies how data is read, regardless of its source.
- Abstracts away many particularities of individual APIs like pagination, data formats, headers, webhooks models, URL encoding, etc.
- Provides a way to declaratively reference data in a fine-grained way.
- Allows for easy understanding of the flow of events and data.
- Serves as a access-control mechanism.

The graph guarantees that programs (especially ones you didn't write) can do what they say they do, and nothing
else. It also enables visibility into everything a program has done. Nothing is opaque in Membrane.

Membrane programs can't directly make network requests. Instead, they interact with the world via graph nodes. Even `fetch` uses the graph behind the scene.

## Durable Programs

Membrane programs are durable. This means you don't need to store data in a database or file to make it persist, the state of your program (the JS heap) is transparently and efficiently persisted every time it changes.

To keep data around, put it in the [`state`]() object and that's it.

Promises can be `await`'ed indefinitely without worrying about execution timeouts.
