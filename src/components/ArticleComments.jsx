import CommentCard from "./CommentCard";
import Loading from "./Loading";

const ArticleComments = ({ commentsLoading, comments, setComments }) => {
  if (commentsLoading) return <Loading />;

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
