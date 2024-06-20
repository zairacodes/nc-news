import { useState } from "react";
import { postComment } from "../utils/api";

const CommentAdder = ({ article_id, comments, setComments }) => {
  const [newComment, setNewComment] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const tempComment = {
      article_id: article_id,
      author: "jessjelly",
      body: newComment,
      comment_id: Date.now(),
      created_at: new Date().toISOString(),
      votes: 0,
    };

    const prevComments = [...comments];

    setComments((comments) => [tempComment, ...comments]);

    postComment(article_id, { tempComment })
      .then((newCommentFromApi) => {
        setComments((prevComments) => [
          newCommentFromApi,
          ...prevComments.filter(
            (comment) => comment.comment_id !== tempComment.comment_id
          ),
        ]);
        alert("Comment successfully posted!");
      })
      .catch((err) => {
        setErr(err);
        alert(`Oops! ${err.message}.`);
        setComments(prevComments);
      });

    setNewComment("");
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
      <textarea
        id="add-comment"
        placeholder="Add a comment..."
        className="add-comment-input"
        rows={1}
        onChange={handleChange}
        value={newComment}
        required
      ></textarea>
      <button type="submit">Post Comment</button>
    </form>
  );
};

export default CommentAdder;
