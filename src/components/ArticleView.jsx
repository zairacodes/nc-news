import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getArticleById, getArticleComments } from "../utils/api";
import Collapsible from "react-collapsible";
import ArticleComments from "./ArticleComments";
import VoteArticle from "./VoteArticle";
import CommentAdder from "./CommentAdder";
import Loading from "./Loading";

const ArticleView = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id)
      .then((articleFromApi) => {
        setArticle(articleFromApi);
        setIsLoading(false);
      })
      .catch((err) => {
        setErr(err);
        setIsLoading(false);
      });
  }, [article_id]);

  useEffect(() => {
    setCommentsLoading(true);
    getArticleComments(article_id)
      .then((commentsFromApi) => {
        if (commentsFromApi.length === 0) {
          setErr("Uh-oh! No comments yet!");
        }
        setComments(commentsFromApi);
        setCommentsLoading(false);
      })
      .catch((err) => {
        setErr(err);
        setCommentsLoading(false);
      });
  }, [article_id]);

  if (isLoading) return <Loading />;

  if (err)
    return (
      <p className="err-msg" aria-label="Error message">
        Oops! The article you're looking for isn't here.
      </p>
    );

  return (
    <article>
      <h2>{article.title}</h2>
      <p>by {article.author}</p>
      <img
        src={article.article_img_url}
        alt={article.title}
        width={400}
        className="article-img"
        aria-label={`Article image: ${article.title}`}
      />
      <p>{article.body}</p>
      <p>Created on: {new Date(article.created_at).toDateString()}</p>
      <div className="article-info">
        <VoteArticle article={article} aria-label="Vote for this article" />
      </div>
      <p>Comments: {article.comment_count}</p>
      <CommentAdder
        article_id={article_id}
        comments={comments}
        setComments={setComments}
        aria-label="Add a comment"
      />
      <Collapsible
        trigger="View all comments"
        aria-label="View all comments for this article"
      >
        <ArticleComments
          commentsLoading={commentsLoading}
          comments={comments}
          setComments={setComments}
        />
      </Collapsible>
    </article>
  );
};

export default ArticleView;
