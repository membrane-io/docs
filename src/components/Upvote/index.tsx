import { useEffect, useState } from "react";
import styles from "./upvote.module.css";

export const PUBLIC_ROADMAP_ENDPOINT =
  "https://board-414-play-563-abroad-64-hat.hook.membrane.io";

interface UpvoteProps {
  children: React.ReactNode;
  id: string;
}

const Upvote = ({ children, id }: UpvoteProps) => {
  const [didUpvote, setDidUpvote] = useState(false);
  const [upvotes, setUpvotes] = useState<number | null>(null);

  useEffect(() => {
    async function fetchUpvotes() {
      const response = await fetch(`${PUBLIC_ROADMAP_ENDPOINT}/upvotes/${id}`);
      const { hasUpvoted, numUpvotes } = await response.json();
      setDidUpvote(hasUpvoted);
      setUpvotes(numUpvotes);
    }

    fetchUpvotes();
  }, []);

  async function handleUpvote() {
    if (upvotes === null) return;

    setDidUpvote(!didUpvote);
    setUpvotes(didUpvote ? upvotes - 1 : upvotes + 1);

    await fetch(
      `${PUBLIC_ROADMAP_ENDPOINT}/${didUpvote ? "downvote" : "upvote"}/${id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  return (
    <button
      className={`${styles.upvote} ${didUpvote && styles.hasUpvoted}`}
      onClick={handleUpvote}
    >
      {upvotes}
      {children}
    </button>
  );
};

export default Upvote;
