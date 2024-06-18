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
        console.log(commentsFromApi);
        if (commentsFromApi.length === 0) {
          setErr("Oops, no comments yet!");
        }
        setComments(commentsFromApi);
        setIsLoading(false);
      })
      .catch((err) => {
        setErr("Sorry, something went wrong.");
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) return <p>Loading...</p>;

  if (err) return <p>{err}</p>;

  return (
    <>
      {comments.map((comment) => (
        <CommentCard key={comment.comment_id} comment={comment} />
      ))}
    </>
  );
};

export default ArticleComments;
