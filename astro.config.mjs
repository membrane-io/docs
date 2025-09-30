import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightLinksValidator from "starlight-links-validator";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import ecTwoSlash from "expressive-code-twoslash";
import cliHelpLang from "./cli-help.tmLanguage.json";
import * as fs from "fs/promises";
import * as path from "path";

function processMarkdown(content) {
  // Remove (---)
  let cleanContent = content.replace(/^---\n[\s\S]*?\n---\n/, "");

  // Temporarily replace code blocks with placeholders to protect them
  const codeBlocks = [];
  let codeBlockIndex = 0;

  // Handle fenced code blocks (```...```)
  cleanContent = cleanContent.replace(/```[\s\S]*?```/g, (match) => {
    const placeholder = `__CODE_BLOCK_${codeBlockIndex}__`;
    codeBlocks[codeBlockIndex] = match;
    codeBlockIndex++;
    return placeholder;
  });

  // Handle inline code (`...`)
  cleanContent = cleanContent.replace(/`[^`]+`/g, (match) => {
    const placeholder = `__INLINE_CODE_${codeBlockIndex}__`;
    codeBlocks[codeBlockIndex] = match;
    codeBlockIndex++;
    return placeholder;
  });

  // Remove import statements (only those outside of code blocks)
  cleanContent = cleanContent.replace(/^import\s+.+$/gm, "");

  // Replacement for Package components - extract package name
  cleanContent = cleanContent.replace(
    /<Package\s+name\s*=\s*['"]([^'"]+)['"]\s*\/>/g,
    "`$1` package",
  );

  // Replacement for Action components - extract action name
  // Handle case where "action" already follows to avoid duplication
  cleanContent = cleanContent.replace(
    /<Action\s+name\s*=\s*['"]([^'"]+)['"]\s*\/>\s*action/g,
    "`$1()` action",
  );
  cleanContent = cleanContent.replace(
    /<Action\s+name\s*=\s*['"]([^'"]+)['"]\s*\/>/g,
    "`$1()` action",
  );

  // Replacement for Event components - extract event name
  cleanContent = cleanContent.replace(
    /<Event\s+name\s*=\s*['"]([^'"]+)['"]\s*\/>\s*event/g,
    "`$1` event",
  );
  cleanContent = cleanContent.replace(
    /<Event\s+name\s*=\s*['"]([^'"]+)['"]\s*\/>/g,
    "`$1` event",
  );

  // NOTE: Doesn't handle Gref components in tables.
  // Replacement for Gref components - handle both quote types
  cleanContent = cleanContent.replace(
    /<Gref\s+value\s*=\s*['"]([^'"]+)['"]\s*\/>/g,
    "`$1`",
  );

  // NOTE: Doesn't handle Type components in tables.
  // Replacement for Type components - Format 1: <Type type="Root"/>
  cleanContent = cleanContent.replace(
    /<Type\s+type\s*=\s*['"]([^'"]+)['"]\s*\/>/g,
    "`$1` type",
  );
  // Replacement for Type components - Format 2: <Type ... type={{ type: `RepositoryCollection` }} ... />
  cleanContent = cleanContent.replace(
    /<Type[^>]*type\s*=\s*\{\{\s*type:\s*[`'"]([^`'"]+)[`'"]\s*\}\}[^>]*\/>/g,
    "`$1` type",
  );

  // Handle component blocks like <Steps>...</Steps> - keep content, remove tags
  cleanContent = cleanContent.replace(
    /<(Steps|Tabs|TabItem|CodeTabs)[^>]*>([\s\S]*?)<\/\1>/g,
    "$2",
  );

  // Restore code blocks
  for (let i = 0; i < codeBlocks.length; i++) {
    cleanContent = cleanContent.replace(`__CODE_BLOCK_${i}__`, codeBlocks[i]);
    cleanContent = cleanContent.replace(`__INLINE_CODE_${i}__`, codeBlocks[i]);
  }

  // Clean up multiple empty lines
  cleanContent = cleanContent.replace(/\n\s*\n\s*\n/g, "\n\n");
  cleanContent = cleanContent.trim();

  return cleanContent;
}

function formatTitle(slug) {
  const parts = slug.split("/");
  if (parts.length === 1) {
    return parts[0]
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }
  const dir = parts[0]
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  const file = parts[parts.length - 1]
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return `${dir} - ${file}`;
}

function llmsTxtGenerator() {
  return {
    name: "llms-txt-generator",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        const contentDir = path.join(process.cwd(), "src/content/docs");
        const baseUrl = "https://docs.membrane.io";

        // Section order
        const sectionOrder = [
          "Getting Started",
          "Concepts",
          "Guides",
          "Reference",
          "Videos",
          "Root",
        ];

        const sections = new Map();
        const fullContent = [];

        async function collectFiles(sourceDir, currentPath = "") {
          const entries = await fs.readdir(sourceDir, { withFileTypes: true });

          for (const entry of entries) {
            const fullPath = path.join(sourceDir, entry.name);
            const relativePath = currentPath
              ? `${currentPath}/${entry.name}`
              : entry.name;

            if (entry.isDirectory()) {
              await collectFiles(fullPath, relativePath);
            } else if (
              entry.name.endsWith(".md") ||
              entry.name.endsWith(".mdx")
            ) {
              const slug = relativePath.replace(/\.mdx?$/, "");
              const url = `${baseUrl}/${slug}.md`;
              const rawContent = await fs.readFile(fullPath, "utf-8");
              const cleanContent = processMarkdown(rawContent);

              fullContent.push({
                slug,
                title: formatTitle(slug),
                content: cleanContent,
              });

              const section = slug.includes("/") ? slug.split("/")[0] : "Root";
              const sectionName = section
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");

              if (!sections.has(sectionName)) {
                sections.set(sectionName, []);
              }
              sections.get(sectionName).push(url);
            }
          }
        }

        await collectFiles(contentDir);

        // Sort fullContent by section order
        const sectionOrderMap = new Map(
          sectionOrder.map((name, index) => [name, index]),
        );

        fullContent.sort((a, b) => {
          const getSectionName = (slug) => {
            const section = slug.includes("/") ? slug.split("/")[0] : "Root";
            return section
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");
          };

          const aSectionName = getSectionName(a.slug);
          const bSectionName = getSectionName(b.slug);

          const aOrder = sectionOrderMap.get(aSectionName) ?? 999;
          const bOrder = sectionOrderMap.get(bSectionName) ?? 999;

          if (aOrder !== bOrder) {
            return aOrder - bOrder;
          }

          return a.slug.localeCompare(b.slug);
        });

        // Generate llms.txt (index)
        // Acts as an index, guiding LLMs to our docs' markdown files.
        let llmsContent = "# Membrane Documentation\n\n";
        for (const sectionName of sectionOrder) {
          if (sections.has(sectionName)) {
            const urls = sections.get(sectionName);
            llmsContent += `## ${sectionName}\n\n`;
            for (const url of urls) {
              llmsContent += `- ${url}\n`;
            }
            llmsContent += "\n";
          }
        }

        // Note about full documentation
        llmsContent += "---\n\n";
        llmsContent +=
          "The complete Membrane documentation is also available as a single file at:\n";
        llmsContent += `${baseUrl}/llms-full.txt\n`;

        await fs.writeFile(
          path.join(dir.pathname, "llms.txt"),
          llmsContent,
          "utf-8",
        );
        console.log("Generated llms.txt");

        // Generate llms-full.txt (all docs pages combined)
        const fullText = `# Full Membrane Documentation\n\n${fullContent
          .map(({ title, content }) => `# ${title}\n\n${content}`)
          .join("\n\n---\n\n")}`;

        await fs.writeFile(
          path.join(dir.pathname, "llms-full.txt"),
          fullText,
          "utf-8",
        );

        console.log("Generated llms-full.txt");
      },
    },
  };
}

function markdownExporter() {
  return {
    name: "markdown-exporter",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        const contentDir = path.join(process.cwd(), "src/content/docs");

        console.log("Copying markdown files...");

        async function copyMarkdownFiles(sourceDir, destDir) {
          const entries = await fs.readdir(sourceDir, { withFileTypes: true });

          for (const entry of entries) {
            const sourcePath = path.join(sourceDir, entry.name);
            const relativePath = path.relative(contentDir, sourcePath);

            if (entry.isDirectory()) {
              const destPath = path.join(destDir, relativePath);
              await fs.mkdir(destPath, { recursive: true });
              await copyMarkdownFiles(sourcePath, destDir);
            } else if (
              entry.name.endsWith(".md") ||
              entry.name.endsWith(".mdx")
            ) {
              // Read, process, and format the content
              const rawContent = await fs.readFile(sourcePath, "utf-8");
              const cleanContent = processMarkdown(rawContent);

              // Get the slug and format title like we do for LLM files
              const slug = relativePath.replace(/\.mdx?$/, "");
              const title = formatTitle(slug);

              // Format the content with title header like the full LLM documentation
              const formattedContent = `# ${title}\n\n${cleanContent}`;

              const destPath = path.join(
                destDir,
                relativePath.replace(/\.mdx?$/, ".md"),
              );
              await fs.mkdir(path.dirname(destPath), { recursive: true });
              await fs.writeFile(destPath, formattedContent, "utf-8");
              console.log(
                `✓ ${relativePath} → ${relativePath.replace(/\.mdx?$/, ".md")}`,
              );
            }
          }
        }

        await copyMarkdownFiles(contentDir, dir.pathname);
        console.log("Markdown copy complete!");
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: "https://docs.membrane.io",
  output: "static",
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
      social: [
        {
          icon: "discord",
          label: "Discord",
          href: "https://discord.gg/4RHyJDV8kj",
        },
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/membrane-io/docs",
        },
        {
          icon: "twitter",
          label: "Twitter",
          href: "https://twitter.com/membraneio",
        },
      ],
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
              label: "Observability",
              link: "/concepts/observability/",
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
              label: "Brane",
              link: "/guides/brane/",
            },
            {
              label: "Dashboard",
              link: "/guides/dashboard/",
            },
            {
              label: "Databases",
              link: "/guides/databases/",
            },
            {
              label: "Timers and Cronjobs",
              link: "/guides/timers/",
            },
            {
              label: "Integrations",
              link: "/guides/integrations/",
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
              label: "JSX (dashboard)",
              link: "/reference/jsx/",
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
        {
          label: "Membrane in Action",
          items: [
            {
              label: "Slack + GitHub issue watcher in 10m",
              link: "/videos/issue-watcher/",
            },
            {
              label: "PostgreSQL admin dashboard in 4m",
              link: "/videos/staff-picks/",
            },
          ],
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
    markdownExporter(),
    llmsTxtGenerator(),
  ],
});
