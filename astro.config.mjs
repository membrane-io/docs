import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightLinksValidator from "starlight-links-validator";
import tailwind from "@astrojs/tailwind";
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
      head: [
        {
          tag: "script",
          content: `
            !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
            posthog.init('phc_48uAAchUN87H2CTyxEFZpyjGN213rITNohWsoXMPfld',{api_host:\`https://\${window.location.origin}/events\`,ui_host:"https://app.posthog.com" })
          `,
        },
      ],
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
    react(),
  ],
});
