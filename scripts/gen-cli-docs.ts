#!/usr/bin/env -S deno run --allow-read --allow-write --allow-env --allow-run
import { join } from "jsr:@std/path/join";
import $ from "jsr:@david/dax";
import { dedent } from "jsr:@qnighy/dedent";

const cliFilePath = join(Deno.cwd(), "src/content/docs/reference/cli.md");

let cliDocs = await Deno.readTextFile(cliFilePath);

const [_, usage, subcommands] = cliDocs.split(/<!-- .* -->\s*/);

// Update main CLI output

const newUsage = usage.replace(
  /```cli-help\n([\s\S]+?)\n```/,
  "```cli-help\n" + (await $`mctl --help`.text()) + "\n```"
);

cliDocs = cliDocs.replace(usage, newUsage);

// Iterate over subcommands and update their output
const commands = await Promise.all(
  newUsage
    .split(/SUBCOMMANDS:\s+/)[1] // Get subcommands section of docs
    .split("\n") // Turn each command into a line
    .filter((line) => line.match(/^(\s{4})?[a-z]/)) // Filter out non-command lines
    .map((line) => line.trim().split(/\s+/)[0])
    .filter((command) => command !== "help")
    .map(
      async (command) => dedent`
  ### ${command}

  \`\`\`cli-help
  ${await $`mctl ${command} --help`.text()}
  \`\`\`
  `
    )
);

cliDocs = cliDocs.replace(
  /<!-- SUBCOMMANDS -->[\s\S]*<!-- END -->/gm,
  dedent`
  <!-- SUBCOMMANDS -->
  ## Subcommands
  ${commands.join("\n")}
  <!-- END -->
`
);

Deno.writeTextFileSync(cliFilePath, cliDocs);
