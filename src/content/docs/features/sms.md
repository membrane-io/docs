---
title: Send & receive sms
---

Membrane includes an `sms` program—installed in your workspace by default—for sending and receiving text messages programmatically.

:::note
You can only configure one phone number at the moment (to send texts to yourself), but we plan to remove that limitation. [Send us a note](mailto:contact@membrane.io) if that's something you'd like asap, and/or upvote it on our [public roadmap](https://docs.membrane.io/roadmap).
:::

## Configure

To configure your `sms` program, find the `sms` program in the Membrane Navigator, click the `configure` action, type in your phone number, and hit `Invoke`.

## Send

To send yourself a text manually, click on the `sms` program in the Membrane Navigator, click the `send` action, type in a `message`, and hit `Invoke`. Check your phone! (And Membrane Logs 👀).

To send yourself a text programmatically, add the `sms` program as a [connection](/features/connections) to any program and call `nodes.sms.send({ message: "[whatever]" })`.

## Receive

Try responding to the text you sent yourself above, and check the `sms` Logs for your text.

When `sms` receives a text, it fires a `received` event that other Membrane programs can subscribe to. We created an <a href="https://www.membrane.io/share/pete/sms-subscriber" target="_blank">sms-subscriber</a> program as a minimal example of how to do this.

```js
import { state, nodes, root } from "membrane";

state.messages ??= [];

/**
 * This action subscribes to the `sms.received` event.
 * Invoke it to set up the subscription.
 */
export async function listenSms() {
  await nodes.sms.received.$subscribe(root.readSms);
}

/**
 * This action is the handler for `sms.received` events.
 * When you text Membrane, you'll see the `received` event in Logs.
 */
export async function readSms(_, { event }) {
  const received = event.message;
  state.messages.push(received);
  // TODO: do something cool!
}
```
