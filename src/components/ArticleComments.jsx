import { useState, useEffect } from "react";
import { getArticleComments } from "../utils/api";
import CommentCard from "./CommentCard";

const ArticleComments = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getArticleComments(article_id)
      .then((commentsFromApi) => {
        if (commentsFromApi.length === 0) {
          setErr("Uh-oh! No comments yet!");
        }
        setComments(commentsFromApi);
        setIsLoading(false);
      })
      .catch((err) => {
        setErr(err);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) return <p>Loading...</p>;

  if (err) return <p className="err-msg">{err}</p>;

  return (
    <>
      {comments.map((comment) => (
        <CommentCard key={comment.comment_id} comment={comment} />
      ))}
    </>
  );
};

export default ArticleComments;
