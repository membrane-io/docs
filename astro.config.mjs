import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightLinksValidator from "starlight-links-validator";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import { transformerTwoslash } from "@shikijs/twoslash";
import { addCopyButton } from "shiki-transformer-copy-button";
import { popoverTransformer } from "./src/popover-transformer.mjs";

import { fromMarkdown } from "mdast-util-from-markdown";
import { toHast, defaultHandlers } from "mdast-util-to-hast";
import cliHelpLang from "./cli-help.tmLanguage.json";

// https://astro.build/config
export default defineConfig({
  output: "hybrid", // default to static, but allow SSR opt-in per page
  adapter: vercel({
    // isr: {
    //   // caches server rendered pages on first request and saves for 1 day
    //   expiration: 60 * 60 * 24,
    // },
  }),
  // This should be handled by a rewrite rule instead of being allowed to redirect
  redirects: {
    "/": "/getting-started/intro/",
    "/discord/": "https://discord.gg/sbRcqC7QxE",
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
        "./src/styles/base.css",
        "@shikijs/twoslash/style-rich.css",
        "./src/styles/copy-button.css",
      ],
      logo: {
        light: "./src/assets/title-dark.svg",
        dark: "./src/assets/title-light.svg",
        replacesTitle: true,
      },
      social: {
        discord: "https://discord.gg/sbRcqC7QxE",
        github: "https://github.com/withastro/starlight",
        twitter: "https://twitter.com/membraneio",
      },
      // TODO: Re-enable when this first pass is done
      // plugins: [starlightLinksValidator()],
      sidebar: [
        {
          label: "Getting Started",
          items: [
            {
              label: "Introduction",
              link: "/getting-started/intro/",
            },
            {
              label: "Installation",
              link: "/getting-started/install/",
            },
            {
              label: "Create a program",
              link: "/getting-started/first-program/",
            },
          ],
        },
        {
          label: "Features",
          items: [
            {
              label: "Durable State",
              link: "/features/state/",
            },
            {
              label: "HTTP endpoints",
              link: "/features/endpoints/",
            },
            {
              label: "Connections",
              link: "/features/connections/",
            },
            {
              label: "Email handlers",
              link: "/features/email/",
            },
            {
              label: "Timers",
              link: "/features/timers/",
            },
            {
              label: "Events",
              link: "/features/events/",
            },
          ],
        },
        {
          label: "Concepts",
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
          ],
        },
        {
          label: "Reference",
          items: [
            {
              label: "IDE",
              link: "/reference/ide/",
            },
            {
              label: "mctl (CLI)",
              link: "/reference/cli/",
            },
          ],
        },
        {
          label: "FAQ",
          link: "/faq/",
        },
        {
          label: "Public roadmap",
          link: "/roadmap/",
        },
      ],
    }),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
