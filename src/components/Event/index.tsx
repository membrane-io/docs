import styles from "./event.module.css";
interface EventProps {
  name: string;
}

const Event = ({ name }: EventProps) => {
  return <span className={styles.event}>{name}</span>;
};

export default Event;
