import { useState } from "react";
import styles from "./upvote.module.css";

export const PUBLIC_ROADMAP_ENDPOINT =
  "https://board-414-play-563-abroad-64-hat.hook.membrane.io";

interface UpvoteProps {
  children: React.ReactNode;
  id: string;
  numUpvotes: number;
  hasUpvoted: boolean;
}

const Upvote = ({ children, id, numUpvotes, hasUpvoted }: UpvoteProps) => {
  const [didUpvote, setDidUpvote] = useState(hasUpvoted);
  const [upvotes, setUpvotes] = useState(numUpvotes);

  async function handleUpvote() {
    setDidUpvote(!didUpvote);
    setUpvotes(didUpvote ? upvotes - 1 : upvotes + 1);

    await fetch(
      `${PUBLIC_ROADMAP_ENDPOINT}/${didUpvote ? "downvote" : "upvote"}`,
      {
        method: "POST",
        body: JSON.stringify({ id }),
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
