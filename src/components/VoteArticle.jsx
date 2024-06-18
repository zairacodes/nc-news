import { useState } from "react";
import { patchArticle } from "../utils/api";

const VoteArticle = ({ article }) => {
  const [updatedArticle, setUpdatedArticle] = useState(article);
  const [err, setErr] = useState("");

  const handleVote = (inc_votes) => {
    patchArticle(article.article_id, inc_votes)
      .then((patchedArticle) => {
        setUpdatedArticle(patchedArticle);
      })
      .catch((err) => {
        setErr("Sorry, something went wrong.");
      });
  };

  const upVote = () => handleVote(1);
  const downVote = () => handleVote(-1);

  return (
    <>
      <p>Votes: {updatedArticle.votes}</p>
      <button onClick={upVote}>
        <span aria-label="upvotes for this article">👍🏻</span>
      </button>{" "}
      <button onClick={downVote}>
        <span aria-label="downvotes for this article">👎🏻</span>
      </button>{" "}
    </>
  );
};

export default VoteArticle;
