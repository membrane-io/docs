---
title: Send & receive email
---

All Membrane programs are capable of sending and receiving emails. Receiving an email works similarly to how [HTTP endpoints](/features/endpoints/) are handled. All you need to do is export an `email` function from the root of your program and use the program's unique email address.

To get a program's email address, click "Copy Email Address" above the `email` function signature. Or right-click the program name in the Navigator and select "Copy Email Address".

## Basic Example

This program receives an email and uses the `email` program to forward the email to the currently signed in user's inbox. In order to run this program make sure you [add `email` as a dependency](/concepts/connections/#add-a-program-connection).

```ts twoslash
// @module: esnext
// @filename: membrane.d.ts
declare namespace email {
  namespace values {
    interface Root {
      gref?: handles.Root;
    }
  }
  namespace handles {
    interface Root extends Field<values.Root> {
      gref: Scalar<Root> & (() => Scalar<Root>);
      send: (args: { subject: string; body: string }) => Promise<void>;
      endpoint: Action<string> &
        ((args: {
          method: string;
          path: string;
          body?: string;
          query?: string;
          headers: string;
        }) => Action<string>);
      email: Action<string> &
        ((args: {
          replyTo?: string;
          text: string;
          from: string;
          to: string;
          cc?: string;
          subject: string;
          html: string;
          id: string;
          inReplyTo?: string;
          replyText?: string;
          attachments?: Json;
        }) => Action<string>);
    }
  }

  type Root = handles.Root;
}
declare module "membrane" {
  export const nodes: {
    /**
     * Note that this node will only be present if the email
     * program is [added as a connection](/concepts/connections/).
     */
    readonly email: email.Root;
  };
  namespace resolvers {
    export interface Root {
      email(args: {
        id: string;
        to: string;
        from?: string;
        cc?: string;
        subject: string;
        html: string;
        text: string;
        replyText?: string;
        replyTo?: string;
        inReplyTo?: string;
        attachments?: Json;
      }): void;
    }
  }
}

import type { resolvers } from "membrane";
// ---cut---
import { nodes } from "membrane";

// Handler to receive emails
export async function email({ to, from, subject, text, ...rest }) {
  // Send yourself an email
  await nodes.email.send({
    //        ^^^^^
    subject: "Received a new email from Membrane!",
    body: `
      Program ${to} received an email from ${from} titled ${subject}
      
      Contents below
      ---
      ${text}
    `,
  });
}
```

## Attachments

Email handlers support receiving attachments via the `attachments` property on the object passed to the function. `attachments` is an array of attachment objects with a `downloadUrl` and `name`. Attachments are automatically deleted from our backend after 30 minutes of being received. Please reach out to [contact@membrane.io](mailto:contact@membrane.io) if you need more time.

You can access attachment data by `fetch`'ing from the `downloadUrl` and parsing like so:

```js
const { name, downloadUrl } = attachments[0];
const data = await fetch(downloadUrl);
const buffer = await data.bytes(); // OR: await data.arrayBuffer()
```
