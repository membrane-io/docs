---
title: Programs that send and receive email
---

Membrane programs can receive emails similarly to how they handle [HTTP endpoints](/features/endpoints/). All you need to do is export an `email` function from the root of your program and use its the program's unique email address.

## Basic Example

This program receives an email and uses the `email` program to forward the email to the currently signed in user's inbox. In order to run this program make sure you [add `email` as a dependency](/features/dependencies/#add-a-program-dependency)

```ts twoslash
// @module: esnext
// @filename: membrane.d.ts
declare module "membrane" {
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

// ---cut---
import type { resolvers } from "membrane";

// Handler to receive a emails
export const email: resolvers.Root["email"] = (args) => {
  const { to, from, subject, text } = args;

  // Send yourself an email
  await nodes.email.send({
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
