import styles from "./gref.module.css";

interface GrefProps {
  value: string;
}

function splitOnce(s: string, on: string): [string, string | undefined] {
  const [first, ...rest] = s.split(on);
  return [first, rest.length > 0 ? rest.join(on) : undefined];
}

// Basic gref component, we don't use a proper gref parser here so it might not work for all cases
const Gref = ({ value }: GrefProps) => {
  const [root, path] = splitOnce(value, ":");
  const pathElems = path?.split(".");
  const isRoot = pathElems?.length === 1 && pathElems[0] === "";

  return (
    <span className={styles.gref}>
      <span className={styles.grefRoot} data-root={isRoot}>
        {root}
      </span>
      <span className={styles.grefSeparator}>:</span>
      {!isRoot &&
        pathElems?.map((part, i) => (
          <>
            {i > 0 && <span className={styles.grefSeparator}>.</span>}
            <span key={i} className={styles.pathElem}>
              <PathElem value={part} />
            </span>
          </>
        ))}
    </span>
  );
};

const PathElem = ({ value }: { value: string }) => {
  const [name, params] = splitOnce(value, "(");
  return (
    <>
      {name}
      {params && (
        <>
          <span className={styles.parens}>(</span>
          {params
            .slice(0, -1)
            .split(",")
            .map((param, i) => (
              <span key={i}>
                {i > 0 && <span className={styles.grefSeparator}>,</span>}
                <Param value={param} />
              </span>
            ))}
          <span className={styles.parens} style={{ marginRight: -2 }}>
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
