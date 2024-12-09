---
title: Membrane Driver Guide
---

## 1. Understanding the Driver's Role

A driver serves as a bridge between Membrane and external APIs. Drivers expose API functionality as nodes in your Membrane graph, making it easy for other programs to interact with external services.

We have drivers for popular APIs like [GitHub](https://www.membrane.io/share/membrane/github) and [Slack](https://www.membrane.io/share/membrane/slack). Check out the [full list here](https://www.membrane.io/share/membrane). Drivers are open source and anyone can create and publish one. Once you get the hang of it, you won’t have to worry much about the quirks of individual APIs since all drivers follow the same structure.

Drivers are regular Membrane programs so if you’ve written some code on Membrane you’re already half way there!

For this guide, we'll walk through the [Resend  driver](https://www.membrane.io/share/membrane/resend). Resend provides a modern email API for developers. For more details about their API, check out their [docs](https://resend.com/docs/introduction).

We'll demonstrate how to:

- Create an interface for the API that uses Membrane state to store the API key
- Structure your code using common Membrane patterns (Collections, Resources, grefs)
- Follow consistent driver design principles and best practices
## 2. Core Components

<br/>

### File Organization

A typical Membrane driver should have this structure:

```
resend/
├── index.ts        # Main driver code and exports
├── helpers.ts      # API helper and utilities
├── tests.ts        # Test cases
├── memconfig.json  # Driver schema
└── README.md       # Documentation
```

### Configuration

Every driver needs basic configuration and status checks. We add those in the `helpers.ts` file. Here's how we implement this for Resend:

```js
// helpers.ts
import { state } from "membrane";

// We use Membrane's state to persist the API key between program runs.
export function status() {
// The [text](:action) syntax makes the action invocable in the Membrane Navigator
// The [text](url) markdown syntax creates clickable links in the Navigator
  return state.API_KEY
    ? "Configured"
    : "Please [configure](:configure) your [API key](https://resend.com/api-keys)";
}

export async function configure({ apiKey }: { apiKey: string }) {
  if (!apiKey) {
    throw new Error("Please provide a valid API key");
  }
  state.API_KEY = apiKey;
}

```

### `helper.ts`

The API helper is a utility function that handles all HTTP communication with the external API, it also lives in `helpers.ts`.

For Resend, this means adding the API key to requests, constructing URLs with query parameters, and handling both JSON and text responses. This helper will look a bit different for each API.

Here's a commonly used implementation:

```js
// helpers.ts
const BASE_URL = "https://api.resend.com";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export async function api(
  method: Method,
  path: string,
  query?: Record<string, any>,
  body?: any
) {
  const url = new URL(`${BASE_URL}/${path}`);

  // Add query parameters if they exist
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const headers = {
    Authorization: `Bearer ${state.API_KEY}`,
    "Content-Type": "application/json",
  };

  const response = await fetch(url.toString(), {
    method,
    headers,
    body,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  // Note: Response handling varies by API. Some APIs:
  // - Always return JSON
  // - Mix JSON and non-JSON responses
  // - Return different content types for errors vs success
  // Adjust this logic based on your API's behavior
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  } else {
    return response.text();
  }
}

```

### Root Object

In all programs (drivers included) the `Root` object serves as the entry point to all of its functionality. Every program has a `Root` type in its schema which defines the top-level structure of the program's graph.

Resend's API exposes two types of resources through their `/emails` and `/domains` endpoints.

To expose that functionality via the Membrane graph, the driver's `Root` type provide corresponding field resolvers:

```js
// index.ts
import { root } from "membrane";
import { status, configure, api } from "./helpers";
import { emailTests, domainTests } from "./tests";

export const Root = {
  // Status check for configuration
  status,

  // Configuration action
  configure,

  // Collection fields
  emails: () => ({}),    // EmailCollection
  domains: () => ({}),   // DomainCollection

  // Test fields
  tests: () => ({}),
};
```

### Resources, Collections, and Pages

In Membrane drivers, we organize our code around key resources.

The pattern is to create pairs of Collection and Resource objects in the `index.ts` file, where collections handle operations like listing and creation, while resources handle item-specific operations.

This Resource-Collection-Page pattern in Membrane provides a consistent interface where:

- Collections handle `one()` for getting single resources, `page()` for listing resources, and other collection-level operations like `create()` or `search()`
- Resources implement [`gref`](#graph-references-grefs) for referencing and item-specific operations like `update()` and `delete()`
- Collection operations go on collections (listing, creating)
- Resource-specific operations go on the resource object (updating, deleting)

Let's look at this pattern using Resend's Emails and Domains as examples.

### Email Collection

Collections typically implement `one()` for getting single resources and methods for creating new resources:

```js
// index.ts
export const EmailCollection = {
  // Get a single email by ID
  async one({ id }: { id: string }) {
    const data = await api("GET", `emails/${id}`);
    return { ...data };
  },

  // Send a new email
  async send(args: {
    from: string;
    to: string[];
    subject: string;
    html?: string;
    text?: string;
  }) {
    const data = await api("POST", "emails", undefined, args);
    return { ...data };
  }
};

```

### Email Resource

Resources handle operations specific to a single item and must implement a `gref`  for referencing:

```js
// index.ts
export const Email = {
  // Create a reference to this email
  gref: function (_, { obj }) {
    return root.emails.one({ id: obj.id });
  },

  // Update email (e.g., reschedule)
  async update(args: { scheduled_at: string }, { self }) {
    const { id } = self.$argsAt(root.emails.one);
    return api("PATCH", `emails/${id}`, undefined, args);
  },

  // Cancel a scheduled email
  async cancel(_, { self }) {
    const { id } = self.$argsAt(root.emails.one);
    return api("POST", `emails/${id}/cancel`);
  }
};

```

### Domain Collection (Pagination Example)

For resources that support listing, collections should implement a `page()` function for pagination:

```js
// index.ts
export const DomainCollection = {
  // Get a single domain
  async one({ id }: { id: string }) {
    return await api("GET", `domains/${id}`);
  },

  // List domains with pagination
  async page() {
    const result = await api("GET", "domains");
    return {
      items: result.data
    };
  },

  // Create a new domain
  async create(args: { name: string; region?: string }) {
    return await api("POST", "domains", undefined, args);
  }
};
```

### Graph References (grefs)

In Membrane, grefs (graph references) create a way to reference and track specific resources across your graph. Every resource should implement a `gref` function that returns a unique, consistent path to that resource.

Think of a gref like a URL - it's a way to point to a specific resource that can be stored, passed around, and used later. For example:

```js
// In Email resource
gref: function (_, { obj }) {
  return root.emails.one({ id: obj.id });
}

// This creates references like:
// resend:emails.one(id:"12345")
```

Grefs serve several important purposes:

1. **Resource Identity**: They provide a standardized way to reference specific resources
2. **Resource Lookups**: Programs can use grefs to consistently find and access resources
3. **Cross-Program Communication**: Programs can pass grefs to each other to reference the same resource
4. **Action Context**: When performing actions on a resource, the gref provides context about which resource to act on using `self.$argsAt()`

### Testing Your Driver

Create a separate `tests.ts` file to organize your tests. Here's an example from the Resend driver:

```js
// tests.ts
// Tests should cover not just single actions, but flows that combine multiple actions
// This test demonstrates sending an email then checking its delivery status
export const emailTests = {
  async testEmailDelivered() {
    const { id } = await root.emails.send({
      from: "onboarding@resend.dev",
      to: ["delivered@resend.dev"],
      subject: "Test delivered email",
      html: "<p>This is a test email.</p>",
    });

    await sleep(2); // wait for delivery

    const { last_event } = await root.emails
      .one({ id: String(id) })
      .$query("{ last_event }");

    if (last_event !== "delivered") {
      throw new Error("Expected email to deliver");
    }
  }
};

export const domainTests = {
  async testDomainList() {
    const domains = await root.domains.page().items.$query("{ name }");
    if (!domains.some((d) => d.name === "membrane.io")) {
      throw new Error("Expected membrane.io in list of domains");
    }
  }
};
```

These tests are then imported and exposed in your graph through the Root object in `index.ts`, making them invoke-able in the Membrane Navigator:

```js
// index.ts
import { emailTests, domainTests } from "./tests";

export const Root = {
  // ... other fields
  // Expose tests in the graph
  tests: () => Tests,
};

export const Tests = {
  ...emailTests,
  ...domainTests,
};
```

### A Note on Types in Membrane

Driver types are defined using the [Schema Editor](https://docs.membrane.io/concepts/schema/#_top). There you'll define:

- Fields on the Root type (like `domains: DomainCollection`)
- Collection types with their operations (`one`, `page`, `create`)
- Resource types with their fields
- Page types for pagination results

For example, the Resend driver's types are defined in the Schema Editor to establish:

- Collection type `DomainCollection` with:
    - `one`: returns type `Domain`
    - `page`: returns type `DomainPage`
    - `create`: returns type `Domain`
- `DomainPage` type with field `items` of type `List<Domain>`
- Resource type `Domain` with its fields

The Schema Editor generates your `memconfig.json` based on these type definitions.

## 3. Best Practices

<br />

### Collection Methods

Always implement these core methods on collections:

```js
export const SomeCollection = {
  // Get single resource - required for grefs
  async one({ id }: { id: string }) {
    return api("GET", `resource/${id}`);
  },

  // List resources with pagination when supported
  async page({ cursor } = {}) {
    const data = await api("GET", "resources", { page: cursor });
    return {
      items: data.items.map((item) => ({ ...item, ...Resource })),
      next: data.hasNextPage ? { cursor: data.nextPage } : null
    };
  }
};
```

### Error Handling

Provide clear, actionable error messages:

```js
// Configuration errors
if (!state.API_KEY) {
  throw new Error("API key not configured");
}

// API errors
if (!response.ok) {
  throw new Error(`API error: ${response.status} ${response.statusText}`);
}
```

### Resource References

Every resource must implement `gref` for consistent referencing:

```js
export const Resource = {
  gref: function (_, { obj }) {
    return root.resources.one({ id: obj.id });
  }
};
```

### Testing

- Write tests that combine multiple actions (like sending an email then checking its status)
- Test all exposed operations

### Code Organization

- Keep collection operations on collections (listing, creating, searching)
- Keep resource operations on resources (updating, deleting)
- Use descriptive names for actions
- Consider adding JSDoc comments for complex operations

## 4. Publishing Your Driver

1. Include a README.md with:
    - Configuration steps
    - Basic usage examples
    - Available methods
2. Test before publishing:

    ```js
    // Run all tests
    await root.tests.testEmailDelivered();
    await root.tests.testDomainList();
    ```

3. Share your driver in [discord](https://discord.gg/gBK9xP3z)!

Remember: The best drivers make complex APIs feel simple and intuitive to use within the Membrane ecosystem.

As you build more drivers and connect more services, you'll unlock increasingly powerful automation and integration possibilities.

## 5. Troubleshooting

Get started with our [driver-template]

<aside>
💡

We are working on a way to speed up the driver development process by generating drivers using LLM’s and API specs. You can install the driver-generator program [here].

</aside>

## 6. Missing a Driver?

Missing a driver for one of your favorite APIs?

- Request it in the [community](https://discord.gg/gBK9xP3z)
- Contribute it! You can get started with our [template] or try out the [driver-generator].
