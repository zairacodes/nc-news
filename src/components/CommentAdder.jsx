import { useContext, useState, useEffect } from "react";
import { postComment } from "../utils/api";
import { UserContext } from "../contexts/UserContext";

const CommentAdder = ({ article_id, comments, setComments }) => {
  const { user, setUser } = useContext(UserContext);
  const [newComment, setNewComment] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    setErr("");
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const tempComment = {
      article_id: article_id,
      author: user.username,
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
        setNewComment("");
        setErr("");
      })
      .catch((err) => {
        setErr(err);
        alert("Oops! Something went wrong.");
        setComments(prevComments);
      });
  };

  const handleChange = (e) => {
    setNewComment(e.target.value);
  };

  if (err)
    return (
      <p className="err-msg">
        Sorry, we couldn't process your comment. Please log in and try again, or
        check your internet connection.
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
