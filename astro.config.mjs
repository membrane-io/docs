import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightLinksValidator from "starlight-links-validator";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";
import ecTwoSlash from "expressive-code-twoslash";
import cliHelpLang from "./cli-help.tmLanguage.json";

// https://astro.build/config
export default defineConfig({
  site: "https://docs.membrane.io",
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
  markdown: {},
  integrations: [
    starlight({
      title: "Membrane",
      favicon: "/favicon.png",
      components: {
        Head: "./src/components/Head.astro",
        Search: "./src/components/Search.astro",
      },
      editLink: {
        baseUrl: "https://github.com/membrane-io/docs/edit/main",
      },
      expressiveCode: {
        plugins: [ecTwoSlash({})],
        frames: {
          extractFileNameFromCode: false,
        },
        shiki: {
          langs: [
            // Custom language for mctl help
            cliHelpLang,
          ],
        },
      },
      customCss: [
        "./src/fonts/font-face.css",
        "./src/styles/base.css",
        "./src/styles/copy-button.css",
      ],
      logo: {
        light: "./src/assets/title-dark.svg",
        dark: "./src/assets/title-light.svg",
        replacesTitle: true,
      },
      social: {
        discord: "https://discord.gg/4RHyJDV8kj",
        github: "https://github.com/membrane-io/docs",
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
              label: "Hello World",
              link: "/getting-started/hello-world/",
            },
          ],
        },
        {
          label: "Concepts",
          collapsed: false,
          items: [
            {
              label: "Durable Programs",
              link: "/concepts/programs/",
            },
            {
              label: "The Graph",
              link: "/concepts/the-graph/",
            },
            {
              label: "Observability",
              link: "/concepts/observability/",
            },
            {
              label: "Schema",
              link: "/concepts/schema/",
            },
            {
              label: "Queries (Fields)",
              link: "/concepts/queries/",
            },
            {
              label: "Actions",
              link: "/concepts/actions/",
            },
            {
              label: "Events",
              link: "/concepts/events/",
            },
            {
              label: "Connections",
              link: "/concepts/connections/",
            },
            {
              label: "API Drivers",
              link: "/concepts/drivers/",
            },
            {
              label: "Packages",
              link: "/concepts/packages/",
            },
          ],
        },
        {
          label: "Guides",
          collapsed: false,
          items: [
            {
              label: "The IDE",
              link: "/guides/ide/",
            },
            {
              label: "Creating programs",
              link: "/guides/creating-programs/",
            },
            {
              label: "Managing state",
              link: "/guides/state/",
            },
            {
              label: "HTTP endpoints",
              link: "/guides/endpoints/",
            },
            {
              label: "Email",
              link: "/guides/email/",
            },
            {
              label: "SMS",
              link: "/guides/sms/",
            },
            {
              label: "Timers and Cronjobs",
              link: "/guides/timers/",
            },
            {
              label: "Pagination",
              link: "/guides/pagination/",
            },
            {
              label: "API drivers",
              link: "/guides/driver-guide/",
            },
          ],
        },
        {
          label: "Reference",
          collapsed: false,
          items: [
            {
              label: "Typescript API",
              link: "/reference/typescript-api/",
            },
            {
              label: "CLI (mctl)",
              link: "/reference/cli/",
            },
            {
              label: "memconfig.json",
              link: "/reference/memconfig/",
            },
          ],
        },
        // {
        //   label: "Examples",
        //   link: "/examples/",
        // },
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
