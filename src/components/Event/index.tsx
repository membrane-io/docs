interface EventProps {
  name: string;
}

const Event = ({ name }: EventProps) => {
  return <span style={{ color: "var(--color-event)" }}>{name}</span>;
};

export default Event;
