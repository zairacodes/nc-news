import ArticleCard from "./ArticleCard";

const ArticleList = ({ articles }) => {
  if (!articles.length) return <p>Sorry, no articles available.</p>;

  return (
    <>
      {articles.map((article) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
    </>
  );
};

export default ArticleList;
