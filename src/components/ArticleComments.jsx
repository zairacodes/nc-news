import CommentCard from "./CommentCard";

const ArticleComments = ({ commentsLoading, comments, triggerRefresh }) => {
  if (commentsLoading) return <p>Comments loading...</p>;

  return (
    <>
      {comments.map((comment) => (
        <CommentCard
          key={comment.comment_id}
          comment={comment}
          triggerRefresh={triggerRefresh}
        />
      ))}
    </>
  );
};

export default ArticleComments;
