import { useState } from "react";
import { patchVote } from "../utils/api";

const VoteArticle = ({ article }) => {
  const [articleVotes, setArticleVotes] = useState(article.votes);
  const [updatedArticle, setUpdatedArticle] = useState(article);
  const [err, setErr] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const handleVote = (inc_votes) => {
    setButtonDisabled(true);
    alert("Thank you for voting!");
    const newVotes = updatedArticle.votes + inc_votes;
    setUpdatedArticle({ ...updatedArticle, votes: newVotes });

    patchVote(article.article_id, inc_votes)
      .then((updatedData) => {
        setButtonDisabled(true);
        setUpdatedArticle(updatedData);
        setArticleVotes(updatedData.votes);
        setErr(null);
      })
      .catch((err) => {
        setButtonDisabled(false);
        setUpdatedArticle(updatedArticle);
        setErr(err);
        alert(`Oops! ${err.message}.`);
      });
  };

  if (err)
    return (
      <p className="err-msg">
        Sorry, we couldn't process your vote. Please check your internet
        connection and try again.
      </p>
    );

  return (
    <>
      <p>Votes: {updatedArticle.votes}</p>
      <button disabled={isButtonDisabled} onClick={() => handleVote(1)}>
        <span aria-label="upvotes for this article">👍🏻</span>
      </button>{" "}
      <button disabled={isButtonDisabled} onClick={() => handleVote(-1)}>
        <span aria-label="downvotes for this article">👎🏻</span>
      </button>
    </>
  );
};

export default VoteArticle;
