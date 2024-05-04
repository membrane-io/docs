---
title: Program Dependencies
---

Like other JavaScript runtimes, you can install a dependency from NPM via `npm`, `yarn`, etc and directly import that dependency in your program.

<!-- TODO: ## Add an NPM Dependency -->

## Add a Program Dependency

In Membrane, [programs](/concepts/programs/) can depend on other programs directly.

<video class="aspect-video !m-8" src="/cloud-assets/add-a-dependency.mp4" muted autoplay loop></video>

Here, the `email` program is added as a dependency to this example program. Once it's added, the `email` program is accessed by using the `nodes` export from the `membrane` module.

<!-- TODO: ## Add a Granular Dependency -->
