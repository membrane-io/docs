import * as Collapsible from "@radix-ui/react-collapsible";
import type { Memconfig, SchemaType } from "../TypeMembers";
import TypeMembers from "../TypeMembers";
import Type from "../Type";
import styles from "./schemaView.module.css";
import React from "react";

interface SchemaViewProps {
  memconfig: Memconfig;
  /** The type to open initially */
  defaultOpen?: string;
}

const SchemaView = ({ memconfig, defaultOpen }: SchemaViewProps) => {
  // Keep track of each type element so we can scroll to it
  const refs = React.useRef<Record<string, HTMLElement | null>>({});

  // The scrollable div so we can animate scrolling
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // The list of open types
  const [openSet, setOpenSet] = React.useState(
    () => new Set(defaultOpen ? [defaultOpen] : []),
  );

  // Opacity of inner shadows
  // TODO: extract this into its own component
  const [topShadow, setTopShadow] = React.useState(0);
  const [bottomShadow, setBottomShadow] = React.useState(0);

  // Sort types to group collections types together
  let sorted = React.useMemo(() => {
    const sortKey = (type: SchemaType): string => {
      const name = type.name;
      if (name === "Root") {
        return "!";
      } else if (name.endsWith("Collection")) {
        return name.replace("Collection", "!1");
      } else if (name.endsWith("Page")) {
        return name.replace("Page", "!2");
      } else {
        return name;
      }
    };
    const sorted = [...memconfig.schema.types].sort((a, b) =>
      sortKey(a).localeCompare(sortKey(b)),
    );
    return sorted;
  }, [memconfig]);

  const handleTypeRef = (name: string, element: HTMLElement | null) => {
    if (refs.current) {
      refs.current[name] = element;
    }
  };

  // Adds or removes a type from the open set
  const setOpen = React.useCallback(
    (type: string, isOpen: boolean) => {
      if (isOpen && !openSet.has(type)) {
        openSet.add(type);
        setOpenSet(new Set(openSet));
      } else if (!isOpen && openSet.has(type)) {
        openSet.delete(type);
        setOpenSet(new Set(openSet));
      }
    },
    [openSet, setOpenSet],
  );

  // Handles clicking on a member type to scroll and expand the corresponding schema type
  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      const memberInnerType = target.dataset.innerType;
      if (memberInnerType) {
        revealType(memberInnerType);
      }
    },
    [setOpen, refs],
  );

  // Scrolls and highlights a type by nane
  const revealType = React.useCallback(
    (type: string, immediate?: boolean) => {
      setOpen(type, true);
      const ref = refs.current?.[type];
      if (ref && scrollRef.current) {
        let target = ref.offsetTop - 12.0;
        if (immediate) {
          scrollRef.current.scrollTop = target;
        } else {
          let start = scrollRef.current.scrollTop;
          let startTime: number | undefined = undefined;
          const duration = Math.min(
            Math.max(Math.abs((target - start) / 2), 120),
            400,
          );

          // Animate the scroll. We can't use scrollIntoView because the elements are grow as they get expanded
          const animate = (timestamp: number) => {
            if (startTime === undefined) {
              startTime = timestamp;
            }
            const elapsed = timestamp - startTime;
            const t = Math.min(Math.pow(elapsed / duration, 0.6), 1.0);

            if (scrollRef.current) {
              scrollRef.current.scrollTop = Math.floor(
                start + t * (target - start),
              );
              if (t < 1.0) {
                requestAnimationFrame(animate);
              }
            }
          };
          requestAnimationFrame(animate);
        }
        // Highlight animation
        ref.classList.remove(styles.highlight);
        setTimeout(() => {
          ref.classList.add(styles.highlight);
        }, 0);
      }
    },
    [refs],
  );

  // Update inner shadows
  const handleScroll = React.useCallback(() => {
    if (!scrollRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const topShadow = remapClamp(scrollTop, 0, 20, 0, 1.0);
    const bottomShadow = remapClamp(
      scrollHeight - scrollTop - clientHeight,
      0,
      20,
      0,
      1.0,
    );
    setTopShadow(topShadow);
    setBottomShadow(bottomShadow);
  }, [scrollRef]);

  // Update inner shadows on mount
  React.useEffect(() => {
    handleScroll();
  }, []);

  // Reveal the default type
  React.useEffect(() => {
    if (defaultOpen) {
      revealType(defaultOpen, true);
    }
  }, [defaultOpen, revealType]);

  return (
    <div className={styles.container}>
      <div className={styles.topShadow} style={{ opacity: topShadow }} />
      <div className={styles.bottomShadow} style={{ opacity: bottomShadow }} />
      <div
        className={styles.typeList}
        onClick={handleClick}
        ref={scrollRef}
        onScroll={handleScroll}
      >
        {sorted.map((type) => (
          <Collapsible.Root
            key={type.name}
            open={openSet.has(type.name)}
            onOpenChange={(open) => {
              setOpen(type.name, open);
            }}
            asChild
          >
            <div
              ref={(el) => handleTypeRef(type.name, el)}
              data-state={openSet.has(type.name) ? "open" : "closed"}
            >
              <Collapsible.Trigger asChild>
                <button className={styles.collapseButton}>
                  <Type type={{ type: type.name }} />
                </button>
              </Collapsible.Trigger>
              <Collapsible.Content className={styles.collapsibleContent}>
                {type.description && type.description.length > 0 && (
                  <div className={styles.typeDescription}>
                    {type.description}
                  </div>
                )}
                <TypeMembers type={type} />
              </Collapsible.Content>
            </div>
          </Collapsible.Root>
        ))}
      </div>
    </div>
  );
};

export default SchemaView;

const remap = (
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number,
) => ((value - fromMin) * (toMax - toMin)) / (fromMax - fromMin) + toMin;

const remapClamp = (
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number,
) =>
  Math.min(
    Math.max(remap(value, fromMin, fromMax, toMin, toMax), toMin),
    toMax,
  );
