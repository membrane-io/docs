import crypto from "node:crypto";
import { h } from "hastscript";

/**
 * This is a shiki transformer to turn hover elements into proper
 * popovers
 * @returns {import('@shikijs/core').ShikiTransformer}
 */
export const popoverTransformer = () => ({
  code(node) {
    const tooltips = node.children
      .flatMap((c) => c.children)
      .filter(Boolean)
      .flatMap((c) => c.children)
      .filter((c) => c.properties?.class?.includes("twoslash-hover"));
    tooltips.map((container) => {
      const tooltip = container.children[0];
      const id = crypto.randomBytes(8).toString("hex");
      container.properties.id = `tc-${id}`;
      tooltip.properties.id = `tt-${id}`;
      const script = h(
        "script",
        {
          type: "module",
        },
        /* js */ `
          import {computePosition, flip, shift, offset, arrow} from 'https://cdn.jsdelivr.net/npm/@floating-ui/dom@1.6.4/+esm';

          const anchor = document.querySelector('#${container.properties.id}');
          const tooltip = document.querySelector('#${tooltip.properties.id}');

          console.log(tooltip)

          computePosition(anchor, tooltip, {
            placement: 'bottom-start',
            middleware: [
              flip(),
              shift({ padding: 10 }),
              offset(({ rects, placement }) => {
                return placement.includes('bottom') ? -16 : 16;
              })
            ]
          }).then(({x, y}) => {
            Object.assign(tooltip.style, {
              left: x + 'px',
              top: y + 'px'
            });
          });
      `
      );
      container.children.push(script);
    });
  },
});
