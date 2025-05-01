---
title: Query external databases
---

Membrane provides `sys-db`, a system program for querying PostgreSQL, MySQL, and Microsoft SQL Server databases.

:::note
Transactions, among other advanced features, aren't yet available.
[Send us a note](mailto:contact@membrane.io) if there's something you'd like
asap.
:::

## Basic example

Add the `sys-db` program as a [connection](/concepts/connections) to any program.

```js
import { state, nodes, root } from "membrane"

export async function run() {
  // Create a reference to a database by its connection string:
  const database = nodes.db.database({
    connection: "postgres://user:password@localhost:5432/database",
  })

  // Query your database, returning a list of rows:
  const rows = await database.execute({
    sql: "SELECT username FROM your_table",
  })

  // Iterate over the rows, each a list of values:
  for (let { username } of rows) {
    console.log("username", username)
  }
}
```

## Binding query parameters

You can bind parameters to your query by passing a list to `execute`'s `params`. The query syntax varies by database engine:

```js
// PostgreSQL
const users = await database.execute({
  sql: "SELECT * FROM users WHERE id = $1",
  params: [1],
})

// MySQL
const users = await database.execute({
  sql: "SELECT * FROM users WHERE id = ?",
  params: [1],
})

// Microsoft SQL Server
const users = await database.execute({
  sql: "SELECT * FROM users WHERE id = @P1",
  params: [1],
})
```

## Querying a single row

To query a single row, you can simply destructure the query result:

```js
const [user] = await database.execute({
  sql: "SELECT * FROM users WHERE id = 1",
})
```

Similarly, you can go even further to get one or more values from the row:

```js
// Single column
const [{ name }] = await database.execute({
  sql: "SELECT name FROM users WHERE id = 1",
})

// Multiple columns
const [{ name, created_at }] = await database.execute({
  sql: "SELECT name, created_at FROM users WHERE id = 1",
})
```

## Configuring database credentials

Instead of keeping the connection string (which includes credentials) in plain text in your program, you might want to configure your database once and store it in state for later use, so that the connection string is kept in your program's memory.

```js
import { state, nodes, sys_db } from "membrane";

// (optional) define types for state for type checking
export interface State {
  database?: sys_db.Database;
}

// (optional) show a status message under your program's name in the IDE
export function status() {
  if (!state.database) {
    return "Run [configure](:configure) to set up your database";
  }
}

export async function configure({ connectionString }) {
  state.database = nodes.db.database({ connection: connectionString });
}

export async function run() {
  if (!state.database) {
    throw new Error("Database not configured");
  }

  const rows = await state.database.execute({
    sql: "SELECT username FROM your_table"
  });

  for (let {username} of rows) {
    console.log("username", username);
  }
}
```

## Database providers

### Supabase

If you have a [Supabase](https://supabase.com/database) PostgreSQL database, configure `sys-db` with the _session pooler_ connection string. As of May 2025, you can find this connection string in the Supabase dashboard by clicking "Connect" in the navigation bar and locating session pooler at the bottom of the modal.

<video src="/videos/supabase-connection-string.mp4" muted controls></video>
