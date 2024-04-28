import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  redirects: {
    "/": "/getting-started/intro-to-membrane/",
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
              label: "Example Guide",
              link: "/guides/example/",
            },
          ],
        },
        {
          label: "Reference",
          autogenerate: {
            directory: "reference",
          },
        },
      ],
    }),
    tailwind({ applyBaseStyles: false }),
  ],
});
