---
title: Connections
---

## Add a Program Connection

In Membrane, [programs](/concepts/programs/) can use other programs by forming _connections_.

<video src="/cloud-assets/add-connection.mp4" muted autoplay controls></video>

Here, the `email` program is added as a connection to this example program. Once it's added, the `email` program is accessed by using the `nodes` export from the `membrane` module.

<!-- TODO: ## Add a Granular Dependency -->

## npm packages

You can also install npm packages as dependencies of a Membrane program. Just create a `package.json` file, add any packages to the `dependencies` object, and save the program.

:::note
Not all packages work yet due to runtime differences. Feel free to reach out at [contact@membrane.io](mailto:contact@membrane.io) if you run into compatibility issues.
:::
