import CommentCard from "./CommentCard";

const ArticleComments = ({ commentsLoading, comments }) => {
  if (commentsLoading) return <p>Comments loading...</p>;

  return (
    <>
      {comments.map((comment) => (
        <CommentCard key={comment.comment_id} comment={comment} />
      ))}
    </>
  );
};

export default ArticleComments;
