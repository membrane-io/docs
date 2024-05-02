import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightLinksValidator from "starlight-links-validator";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  // This should be handled by a rewrite rule instead of being allowed to redirect
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
  integrations: [
    starlight({
      title: "Membrane",
      customCss: ["./src/base.css"],
      logo: {
        light: "./src/assets/title-dark.svg",
        dark: "./src/assets/title-light.svg",
        replacesTitle: true,
      },
      social: {
        github: "https://github.com/withastro/starlight",
        twitter: "https://twitter.com/membraneio",
      },
      plugins: [starlightLinksValidator()],
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
              link: "/feature/state/",
            },
            {
              label: "HTTP Endpoints",
              link: "/feature/endpoints/",
            },
            {
              label: "Email handlers",
              link: "/feature/email/",
            },
            {
              label: "Timers",
              link: "/feature/timers/",
            },
            {
              label: "Events",
              link: "/feature/events/",
            },
          ],
        },
        {
          label: "Concepts",
          items: [
            {
              label: "Mental model",
              link: "/concept/mental-model/",
            },
            {
              label: "Programs",
              link: "/concept/programs/",
            },
            {
              label: "The Graph",
              link: "/concept/the-graph/",
            },
            {
              label: "Drivers",
              link: "/concept/drivers/",
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
    preact(),
  ],
  adapter: vercel(),
});
