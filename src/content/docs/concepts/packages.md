---
title: Packages
---

Code sharing in Membrane happens through our package registry. You might've
already used the registry to install an [API driver](/concepts/drivers) or
[share your first program](/getting-started/hello-world/#sharing-your-code).

:::tip

We're excited to see what you build! Post your share link on
[Discord](https://discord.gg/4RHyJDV8kj), or
[send us an email](mailto:contact@membrane.io). We'll share our favorites in the
changelog.

:::

## Installing

To install a package, select `🔎 SEARCH` in Navigator (top left), find the
package you want to install, and click `INSTALL`.

## Publishing

To share your code, you publish it as a package. Right-click a program and
select "Publish Package". If the program you want to share relies on other programs as
[connections](/concepts/connections), you'll have to publish those first.

:::note

_This only shares your code—not your program state nor logs._

:::

## Unpublishing

To unpublish a package, right-click the program to select "Publish Package..." (same as publishing), click the triple dots menu, and select `UNPUBLISH`.

If other packages point to the package you want to unpublish as a dependency, you'll have to unpublish those first, or re-publish them using a different connection.
