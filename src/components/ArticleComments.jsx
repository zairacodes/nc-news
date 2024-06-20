import CommentCard from "./CommentCard";

const ArticleComments = ({ commentsLoading, comments, setComments }) => {
  if (commentsLoading) return <p>Comments loading...</p>;

  return (
    <>
      {comments.map((comment) => (
        <CommentCard
          key={comment.comment_id}
          comment={comment}
          comments={comments}
          setComments={setComments}
        />
      ))}
    </>
  );
};

export default ArticleComments;
