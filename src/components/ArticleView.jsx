import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getArticleById } from "../utils/api";

const ArticleView = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id)
      .then((articleFromApi) => {
        if (articleFromApi) {
          setArticle(articleFromApi);
          setIsLoading(false);
        } else {
          setErr("Article not found.");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setErr("Sorry, something went wrong.");
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) return <p>Loading...</p>;

  if (err) return <p>{err}</p>;

  return (
    <section>
      <h2>{article.title}</h2>
      <p>by {article.author}</p>
      <img
        src={article.article_img_url}
        alt={article.title}
        width={400}
        className="article-img"
      />
      <p>{article.body}</p>
      <p>Created on: {new Date(article.created_at).toDateString()}</p>
      <div className="article-info">
        <p>Votes: {article.votes}</p>
        <p>Comments: {article.comment_count}</p>
      </div>
    </section>
  );
};

export default ArticleView;
