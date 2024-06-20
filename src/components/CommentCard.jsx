import { useContext, useState } from "react";
import { deleteComment } from "../utils/api";
import { UserContext } from "../contexts/UserContext";

const CommentCard = ({ comment, triggerRefresh }) => {
  const { user, setUser } = useContext(UserContext);
  const [err, setErr] = useState("");

  const handleDelete = (comment_id) => {
    if (user.username === comment.author) {
      deleteComment(comment_id)
        .then((res) => {
          setErr(null);
          alert("Comment successfully deleted!");
          triggerRefresh();
        })
        .catch((err) => {
          setErr(err);
          alert(`Oops! ${err.message}.`);
        });
    } else {
      alert(`Uh-oh! Are you ${comment.author}?`);
    }
  };

  if (err)
    return (
      <p className="err-msg">
        Sorry, we couldn't delete your comment. Please check your internet
        connection and try again.
      </p>
    );

  return (
    <ul className="comment-card">
      <li key={comment.comment_id}>
        <p>{comment.body}</p>
        <p>Author: {comment.author}</p>
        <p>Created on: {new Date(comment.created_at).toDateString()}</p>
        <p>Votes: {comment.votes}</p>
        <button onClick={() => handleDelete(comment.comment_id)}>
          Delete Comment
        </button>
      </li>
    </ul>
  );
};

export default CommentCard;
