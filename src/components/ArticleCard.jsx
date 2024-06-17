const ArticleCard = ({ article }) => {
  return (
    <ul>
      <li>
        <p>
          "{article.title}", by {article.author} in <i>{article.topic}</i>
          <img
            src={article.article_img_url}
            alt={article.title}
            width={200}
            className="article-img"
          />
        </p>
        <p>Created on: {new Date(article.created_at).toDateString()}</p>
        <div className="article-info">
          <p>Votes: {article.votes}</p>
          <p>Comments: {article.comment_count}</p>
        </div>
      </li>
    </ul>
  );
};

export default ArticleCard;
