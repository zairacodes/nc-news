const CommentCard = ({ comment }) => {
  return (
    <ul className="comment-card">
      <li key={comment.comment_id}>
        <p>{comment.body}</p>
        <p>Author: {comment.author}</p>
        <p>Created on: {new Date(comment.created_at).toDateString()}</p>
        <p>Votes: {comment.votes}</p>
      </li>
    </ul>
  );
};

export default CommentCard;
