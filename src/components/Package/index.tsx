import styles from "./package.module.css";
interface PackageProps {
  /** Full package name. Publisher defaults to `membrane` if not specified  */
  name: string;
}

const Package = (props: PackageProps) => {
  let [publisher, name] = props.name.split("/");
  if (!name) {
    name = publisher;
    publisher = "membrane";
  }
  const url = `https://membrane.io/share/${publisher}/${name}`;
  return (
    <a
      href={url}
      className={styles.link}
      style={{
        whiteSpace: "nowrap",
      }}
    >
      <PackageIcon />
      <span style={{ marginLeft: "0.25rem" }}>{publisher}</span>
      <span>/</span>
      {name}
    </a>
  );
};

const PackageIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    style={{ display: "inline-block", verticalAlign: "middle" }}
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
  >
    <rect width="256" height="256" fill="none" />
    <line
      x1="128"
      y1="129.09"
      x2="128"
      y2="231.97"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    />
    <polyline
      points="32.7 76.92 128 129.08 223.3 76.92"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    />
    <path
      d="M219.84,182.84l-88,48.18a8,8,0,0,1-7.68,0l-88-48.18a8,8,0,0,1-4.16-7V80.18a8,8,0,0,1,4.16-7l88-48.18a8,8,0,0,1,7.68,0l88,48.18a8,8,0,0,1,4.16,7v95.64A8,8,0,0,1,219.84,182.84Z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    />
    <polyline
      points="81.56 48.31 176 100 176 152"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    />
  </svg>
);

export default Package;
