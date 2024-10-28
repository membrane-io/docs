import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightLinksValidator from "starlight-links-validator";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";
import { transformerTwoslash } from "@shikijs/twoslash";
import { addCopyButton } from "shiki-transformer-copy-button";
import { fromMarkdown } from "mdast-util-from-markdown";
import { toHast, defaultHandlers } from "mdast-util-to-hast";

import { popoverTransformer } from "./src/popover-transformer.mjs";
import cliHelpLang from "./cli-help.tmLanguage.json";

// https://astro.build/config
export default defineConfig({
  output: "hybrid", // default to static, but allow SSR opt-in per page
  adapter: vercel({
    isr: {
      // cache server rendered pages on first request and save for 1 hour
      expiration: 60 * 60,
    },
  }),
  redirects: {
    "/": "/getting-started/intro/",
  },
  image: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.r2.dev",
      },
    ],
  },
  markdown: {
    shikiConfig: {
      langs: [cliHelpLang],
      transformers: [
        transformerTwoslash({
          rendererRich: {
            jsdoc: true,
            renderMarkdown(code) {
              // Implementation from https://github.com/shikijs/shiki/blob/a46ca6b96f3e9526b967669c56e180ca21b7b9ad/packages/vitepress-twoslash/src/renderer-floating-vue.ts#L153
              const mdast = fromMarkdown(code);
              return toHast(mdast, {
                handlers: {
                  code: (state, node) => {
                    const lang = node.lang || "";
                    if (lang) {
                      return {
                        type: "element",
                        tagName: "code",
                        properties: {},
                        children: this.codeToHast(node.value, {
                          ...this.options,
                          transformers: [],
                          lang,
                          structure: "inline",
                        }).children,
                      };
                    }
                    return defaultHandlers.code(state, node);
                  },
                },
              }).children;
            },
          },
        }),
        addCopyButton({ toggle: 1000 }),
        popoverTransformer(),
      ],
    },
  },
  integrations: [
    {
      name: "shiki-popover",
      hooks: {
        "astro:config:setup": ({ config, addWatchFile }) => {
          addWatchFile(new URL("./src/popover-transformer.mjs", config.root));
          addWatchFile(new URL("./cli-help.tmLanguage.json", config.root));
        },
      },
    },
    starlight({
      title: "Membrane",
      favicon: "/favicon.png",
      editLink: {
        baseUrl: "https://github.com/membrane-io/docs/edit/main",
      },
      expressiveCode: false,
      customCss: [
        "./src/fonts/font-face.css",
        "./src/styles/base.css",
        "./src/styles/copy-button.css",
        "@shikijs/twoslash/style-rich.css",
      ],
      logo: {
        light: "./src/assets/title-dark.svg",
        dark: "./src/assets/title-light.svg",
        replacesTitle: true,
      },
      social: {
        discord: "https://discord.gg/4RHyJDV8kj",
        github: "https://github.com/withastro/starlight",
        twitter: "https://twitter.com/membraneio",
      },
      plugins: [starlightLinksValidator()],
      sidebar: [
        {
          label: "Getting Started",
          items: [
            {
              label: "Intro",
              link: "/getting-started/intro/",
            },
            {
              label: "Setup",
              link: "/getting-started/setup/",
            },
            {
              label: "Hello World",
              link: "/getting-started/hello-world/",
            },
          ],
        },
        {
          label: "Features",
          collapsed: true,
          items: [
            {
              label: "Durable state",
              link: "/features/state/",
            },
            {
              label: "Observability",
              link: "/features/observability/",
            },
            {
              label: "HTTP endpoints",
              link: "/features/endpoints/",
            },
            {
              label: "Email",
              link: "/features/email/",
            },
            {
              label: "SMS",
              link: "/features/sms/",
            },
            {
              label: "Timers",
              link: "/features/timers/",
            },
          ],
        },
        {
          label: "Membrane-isms",
          collapsed: true,
          items: [
            {
              label: "Programs",
              link: "/concepts/programs/",
            },
            {
              label: "The Graph",
              link: "/concepts/the-graph/",
            },
            {
              label: "Schema",
              link: "/concepts/schema/",
            },
            {
              label: "Drivers",
              link: "/concepts/drivers/",
            },
            {
              label: "Connections",
              link: "/concepts/connections/",
            },
            {
              label: "Packages",
              link: "/concepts/packages/",
            },
          ],
        },
        {
          label: "Reference",
          collapsed: true,
          items: [
            {
              label: "membrane module",
              link: "/reference/membrane-module/",
            },
            {
              label: "mctl (CLI)",
              link: "/reference/cli/",
            },
            {
              label: "memconfig",
              link: "/reference/memconfig/",
            },
          ],
        },
        {
          label: "Examples",
          link: "/examples/",
        },
        {
          label: "Roadmap",
          link: "/roadmap/",
        },
        {
          label: "FAQ",
          link: "/faq/",
        },
        {
          label: "membrane.io ↗",
          link: "https://membrane.io",
          attrs: { target: "_blank" },
        },
      ],
    }),
    react(),
  ],
});
