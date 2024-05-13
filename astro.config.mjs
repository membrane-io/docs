import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightLinksValidator from "starlight-links-validator";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import { transformerTwoslash } from "@shikijs/twoslash";
import { addCopyButton } from "shiki-transformer-copy-button";
import { popoverTransformer } from "./src/popover-transformer.mjs";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
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
      transformers: [
        transformerTwoslash(),
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
              label: "Extension Tour",
              link: "/getting-started/tour/",
            },
            {
              label: "Create a Program",
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
              label: "HTTP Endpoints",
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
              label: "Drivers",
              link: "/concepts/drivers/",
            },
          ],
        },
        {
          label: "Reference",
          items: [
            {
              label: "Membrane module",
              link: "/reference/types/",
            },
            {
              label: "Mctl (CLI)",
              link: "/reference/cli/",
            },
            {
              label: "VSCode Extension",
              collapsed: true,
              items: [
                {
                  label: "Commands",
                  link: "/reference/vscode/commands/",
                },
                {
                  label: "Settings",
                  link: "/reference/vscode/settings/",
                },
              ],
            },
            {
              label: "Browser Extension",
              link: "/reference/browser/",
            },
          ],
        },
        {
          label: "FAQ",
          link: "/faq/",
        },
      ],
    }),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  adapter: vercel(),
});
