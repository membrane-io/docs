---
title: Email Handlers
---

Membrane programs are capable of sending and receiving emails. Recieving an email works similarly to how [HTTP endpoints](/features/endpoints/) are handled. All you need to do is export an `email` function from the root of your program and use the program's unique email address.

<!-- TODO: create reference section for `sms` and link to that instead -->

:::note
Membrane also supports sms! To send yourself a text programmatically, add the `sms` program—installed in your workspace by default—as a connection and call `nodes.sms.send({ message: "hi from Membrane" })`.
:::

## Basic Example

This program receives an email and uses the `email` program to forward the email to the currently signed in user's inbox. In order to run this program make sure you [add `email` as a dependency](/features/connections/#add-a-program-connection)

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
     * program is [added as a connection](/features/connections/).
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

// Handler to receive a emails
export const email: resolvers.Root["email"] = (args) => {
  const { to, from, subject, text } = args;

  // Send yourself an email
  await nodes.email.send({
    //        ^^^^^
    subject: "Received a new email from Membrane!",
    body: `
      Program ${to} recieved an email from ${from} titled ${subject}
      
      Contents below
      ---
      ${text}
    `,
  });
};
```
