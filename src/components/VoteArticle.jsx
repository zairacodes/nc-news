import { useState } from "react";
import { patchVote } from "../utils/api";

const VoteArticle = ({ article }) => {
  const [articleVotes, setArticleVotes] = useState(article.votes);
  const [updatedArticle, setUpdatedArticle] = useState(article);
  const [err, setErr] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const handleVote = (inc_votes) => {
    setButtonDisabled(true);
    const newVotes = updatedArticle.votes + inc_votes;
    setUpdatedArticle({ ...updatedArticle, votes: newVotes });

    patchVote(article.article_id, inc_votes)
      .then((updatedData) => {
        setButtonDisabled(true);
        setUpdatedArticle(updatedData);
        setArticleVotes(updatedData.votes);
        setErr(null);
        alert("Thank you for voting!");
      })
      .catch((err) => {
        setButtonDisabled(false);
        setUpdatedArticle(updatedArticle);
        setErr(err);
        alert("Oops! Something went wrong.");
      });
  };

  if (err)
    return (
      <p className="err-msg" aria-label="Error message">
        Sorry, we couldn't process your vote. Please check your internet
        connection and try again.
      </p>
    );

  return (
    <>
      <p>Votes: {updatedArticle.votes}</p>
      <button disabled={isButtonDisabled} onClick={() => handleVote(1)}>
        <span aria-label="Upvote for this article">👍🏻</span>
      </button>{" "}
      <button disabled={isButtonDisabled} onClick={() => handleVote(-1)}>
        <span aria-label="Downvote for this article">👎🏻</span>
      </button>
    </>
  );
};

export default VoteArticle;
