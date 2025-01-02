import styles from "./action.module.css";
interface ActionProps {
  name: string;
}

const Action = ({ name }: ActionProps) => {
  return <span className={styles.action}>{name}</span>;
};

export default Action;
