import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightLinksValidator from "starlight-links-validator";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  // This should be handled by a rewrite rule instead of being allowed to redirect
  redirects: {
    "/": "/getting-started/intro-to-membrane/",
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
    starlightLinksValidator(),
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
      sidebar: [
        {
          label: "Getting Started",
          items: [
            {
              label: "Introduction to Membrane",
              link: "/getting-started/intro-to-membrane/",
            },
            {
              label: "Installation",
              link: "/getting-started/install/",
            },
          ],
        },
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            {
              label: "State",
              link: "/guides/state/",
            },
            {
              label: "HTTP Endpoints",
              link: "/guides/endpoints/",
            },
            {
              label: "Email handlers",
              link: "/guides/email/",
            },
            {
              label: "Timers",
              link: "/guides/timers/",
            },
            {
              label: "Events",
              link: "/guides/events/",
            },
          ],
        },
        {
          label: "Concepts",
          autogenerate: {
            directory: "concepts",
          },
        },
        {
          label: "Reference",
          autogenerate: {
            directory: "reference",
          },
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
