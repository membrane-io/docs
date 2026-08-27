---
title: The IDE
---

Membrane's primary interface is the Membrane Web IDE. The IDE is where you write
and deploy programs, set up cron jobs, inspect logs, and more. We built our own
IDE to tightly integrate all our features and provide a great developer
experience.

Visit <a href="https://ide.membrane.io" target="_blank">ide.membrane.io</a> to
get started.

:::tip

You can open these docs as a webview in the IDE. Open the command palette
(`cmd/ctrl+shift+p`) and type `Open docs`.

:::

## Troubleshooting

### "IndexedDB database 'vscode-web-db' is closed"

The IDE stores its local state (logs, editor state, unsaved changes) in your
browser's IndexedDB. If that database connection is closed while the IDE is
still running, you may see errors such as
`Unable to write file 'vscode-log:/…/window.log' (Error: IndexedDB database 'vscode-web-db' is closed.)`.

This usually happens when:

- The IDE is open in more than one tab and one of them loads a new version,
  which closes the database in the other tabs.
- Browser site data for `ide.membrane.io` was cleared (manually or by the
  browser evicting storage) while the IDE was open.
- The browser is in private/incognito mode, where storage can be discarded at
  any time.

Reloading the tab reconnects to the database and resolves the error. To avoid
it, keep a single IDE tab open per browser profile and reload after clearing
site data.
