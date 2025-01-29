import styles from "./gref.module.css";

interface GrefProps {
  value: string;
  action?: boolean
  event?: boolean
}

function splitOnce(s: string, on: string): [string, string | undefined] {
  const [first, ...rest] = s.split(on);
  return [first, rest.length > 0 ? rest.join(on) : undefined];
}

// Basic gref component, we don't use a proper gref parser here so it might not work for all cases
const Gref = ({ value, action, event }: GrefProps) => {
  const [root, path] = splitOnce(value, ":");
  const pathElems = path?.length ? path?.split(".") : [];
  return (
    <span className={styles.gref}>
      <span className={styles.grefRoot}>{root}</span>
      <span className={styles.grefSeparator}>:</span>
      {pathElems?.map((part, i) => (
        <>
          { i > 0 && <span key={`sep-${i}`} className={styles.grefSeparator}>.</span> }
          <span key={i} className={classForElem(i, pathElems.length, action, event)}>
            <PathElem value={part} />
          </span>
        </>
      ))}
    </span>
  );
};

function classForElem(i: number, total: number, action?: boolean, event?: boolean) {
  if (action && i === total - 1) return [styles.action, styles.pathElem].join(" ");
  if (event && i === total - 1) return [styles.event, styles.pathElem].join(" ");
  return styles.pathElem;
}

const PathElem = ({ value }: { value: string }) => {
  const [name, params] = splitOnce(value, "(");
  return (
    <>
      {name}
      {params && (
        <>
          <span key="open-parens" className={styles.parens}>(</span>
          {params
            .slice(0, -1)
            .split(",")
            .map((param, i) => (
              <span key={i}>
                {i > 0 && <span className={styles.grefSeparator}>,</span>}
                <Param value={param} />
              </span>
            ))}
          <span key="close-parens" className={styles.parens} style={{ marginRight: -2 }}>
            )
          </span>
        </>
      )}
    </>
  );
};

const Param = ({ value }: { value: string }) => {
  const [name, valueStr] = splitOnce(value, ":");
  return (
    <>
      {name}
      <span className={styles.value}>
        <span className={styles.grefSeparator}>:</span>
        <span className={styles.paramValue}>{valueStr}</span>
      </span>
    </>
  );
};

export default Gref;
