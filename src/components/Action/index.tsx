interface ActionProps {
  name: string;
}

const Action = ({ name }: ActionProps) => {
  return <span style={{ color: "var(--color-action)" }}>{name}</span>;
};

export default Action;
