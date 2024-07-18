import { useContext, useState } from "react";
import { deleteComment } from "../utils/api";
import { UserContext } from "../contexts/UserContext";

const CommentCard = ({ comment, comments, setComments }) => {
  const { user, setUser } = useContext(UserContext);
  const [err, setErr] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const handleDelete = (comment_id) => {
    setButtonDisabled(true);

    if (user.username === comment.author) {
      const updatedComments = comments.filter(
        (comment) => comment.comment_id !== comment_id
      );
      setComments(updatedComments);

      deleteComment(comment_id)
        .then((res) => {
          setButtonDisabled(false);
          setComments(updatedComments);
          setErr("");
          alert("Comment successfully deleted!");
        })
        .catch((err) => {
          setButtonDisabled(false);
          setComments(comments);
          setErr(err);
          alert(
            "Sorry, we couldn't delete your comment. Please check your internet connection and try again."
          );
        });
    } else {
      alert(`Uh-oh! Are you ${comment.author}?`);
    }
  };

  return (
    <ul className="comment-card" aria-label="Comment">
      <li key={comment.comment_id}>
        <p>{comment.body}</p>
        <p>Author: {comment.author}</p>
        <p>Created on: {new Date(comment.created_at).toDateString()}</p>
        <p>Votes: {comment.votes}</p>
        {user.username === comment.author && (
          <button
            onClick={() => handleDelete(comment.comment_id)}
            disabled={isButtonDisabled}
            aria-label="Delete comment"
          >
            Delete Comment
          </button>
        )}
      </li>
    </ul>
  );
};

export default CommentCard;
