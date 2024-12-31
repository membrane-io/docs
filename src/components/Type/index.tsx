import type { Memconfig } from "../TypeMembers";
import * as Popover from "@radix-ui/react-popover";
import styles from "./type.module.css";
import SchemaView from "../SchemaView";
import Package from "../Package";

interface TypeProps {
  typed: Typed;
  memconfig?: Memconfig;
  packageName?: string;
  onClick?: () => void;
}

export type OfType = string | { type: string; ofType?: OfType };
export type Typed = { type: string; ofType?: OfType };

const Type = ({ typed, memconfig, packageName, onClick }: TypeProps) => {
  if (!memconfig) {
    if (onClick) {
      return (
        <button
          className={styles.button}
          data-inner-type={innerTypeName(typed)}
          onClick={onClick}
        >
          <span data-inner-type={innerTypeName(typed)} className={styles.type}>
            {formatType(formatTyped(typed))}
          </span>
        </button>
      );
    } else {
      return (
        <span className={styles.type}>{formatType(formatTyped(typed))}</span>
      );
    }
  } else {
    return (
      <Popover.Root>
        <Popover.Trigger asChild>
          <button aria-label="Show Schema" className={styles.trigger}>
            <span className={styles.type}>
              {formatType(formatTyped(typed))}
            </span>
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            className={styles.popover}
            sideOffset={2}
            align="end"
            avoidCollisions={true}
          >
            <Popover.Arrow className={styles.arrow} width={12} height={8} />
            <div className={styles.topBar}>
              {packageName && <Package name={packageName} />}
              <Popover.Close className={styles.close} aria-label="Close">
                <CloseIcon />
              </Popover.Close>
            </div>
            {/* <div className={styles.scrollArea}> */}
            <SchemaView
              memconfig={memconfig}
              defaultOpen={innerTypeName(typed)}
            />
            {/* </div> */}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    );
  }
};

function CloseIcon() {
  return (
    <svg
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
    >
      <rect width="256" height="256" fill="none" />
      <line
        x1="200"
        y1="56"
        x2="56"
        y2="200"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <line
        x1="200"
        y1="200"
        x2="56"
        y2="56"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
    </svg>
  );
}

export function innerTypeName(typed: Typed): string {
  let t: Typed | OfType = typed;
  while (typeof t !== "string" && t.ofType) {
    t = t.ofType;
  }
  if (typeof t === "string") {
    return t;
  } else {
    return t.type;
  }
}
/**
 * Formats a `Typed` object into a string.
 */
export function formatTyped(typed: Typed): string {
  if (typed.ofType) {
    if (typeof typed.ofType === "string") {
      return `${typed.type}<${typed.ofType}>`;
    } else {
      return `${typed.type}<${formatTyped(typed.ofType)}>`;
    }
  } else if (typed.type) {
    return typed.type;
  } else {
    return "[invalid type]";
  }
}

/**
 * Formats Some<TypeName> into SOME<TYPE NAME>
 */
function formatType(s: string): string {
  let formatted = "";
  let wasPrevLowercase = false;

  for (const c of s) {
    if (c.match(/[A-Z]/) && wasPrevLowercase) {
      formatted += " ";
    }
    formatted += c.toUpperCase();
    wasPrevLowercase = c.match(/[a-z]/) !== null;
  }

  return formatted;
}

export default Type;
