import CommentCard from "./CommentCard";

const ArticleComments = ({ comments }) => {
  return (
    <>
      {comments.map((comment) => (
        <CommentCard key={comment.comment_id} comment={comment} />
      ))}
    </>
  );
};

export default ArticleComments;
