import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  return (
    <ul className="article-card">
      <li>
        <Link
          to={`/articles/${article.article_id}`}
          aria-label={`Read article: "${article.title}" by ${article.author} in ${article.topic}`}
        >
          <h3>"{article.title}"</h3>
          <p>
            by {article.author} in <i>{article.topic}</i>
            <img
              src={article.article_img_url}
              alt={article.title}
              width={200}
              className="article-img"
              aria-label={`Article image: "${article.title}"`}
            />
          </p>
          <p>Created on: {new Date(article.created_at).toDateString()}</p>
          <div className="article-infocard">
            <p>Votes: {article.votes}</p>
            <p>Comments: {article.comment_count}</p>
          </div>
        </Link>
      </li>
    </ul>
  );
};

export default ArticleCard;
