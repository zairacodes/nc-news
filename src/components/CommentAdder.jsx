import { useState, useEffect } from "react";
import { getArticleComments, postComment } from "../utils/api";

const CommentAdder = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    getArticleComments(article_id)
      .then((commentsFromApi) => {
        setComments(commentsFromApi);
      })
      .catch((err) => {
        setErr(err);
      });
  }, [article_id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setComments([newComment, ...comments]);

    postComment(article_id, newComment)
      .then((newCommentFromApi) => {
        setNewComment("");
        setComments([newCommentFromApi, ...comments]);
        setErr(null);
        alert("Comment successfully posted!");
      })
      .catch((err) => {
        setComments(comments);
        setErr(err);
        alert(`Oops! ${err.message}.`);
      });
  };

  const handleChange = (e) => {
    setNewComment(e.target.value);
  };

  if (err)
    return (
      <p className="err-msg">
        Sorry, we couldn't process your comment. Please check your internet
        connection and try again.
      </p>
    );

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="add-comment"></label>
      <input
        id="add-comment"
        type="text"
        placeholder="Add a comment..."
        className="add-comment-input"
        onChange={handleChange}
        value={newComment}
        required
      />
      <button type="submit">Post Comment</button>
    </form>
  );
};

export default CommentAdder;
