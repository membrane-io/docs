import { PUBLIC_ROADMAP_ENDPOINT } from "../Upvote";
import styles from "./feedback.module.css";

interface FeedbackProps {
  children: React.ReactNode;
  id: string;
}

const Feedback = ({ children, id }: FeedbackProps) => {
  return (
    <a
      href={`${PUBLIC_ROADMAP_ENDPOINT}/feedback/${id}`}
      target="_blank"
      className={styles.feedback}
    >
      Feedback
      {children}
    </a>
  );
};

export default Feedback;
