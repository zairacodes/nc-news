import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArticleList from "./ArticleList";
import { getArticles, getTopics } from "../utils/api";

const Home = () => {
  const { topic } = useParams();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    setIsLoading(true);

    getArticles(topic)
      .then((articlesFromApi) => {
        setArticles(articlesFromApi);
        setIsLoading(false);
      })
      .catch((err) => {
        setErr(err);
        setIsLoading(false);
      });

    getTopics()
      .then((topicsFromApi) => {
        setTopics(topicsFromApi);
      })
      .catch((err) => {
        setErr(err);
      });
  }, [topic]);

  const handleSelect = (e) => {
    e.preventDefault();
    const selectedTopic = e.target.value === "all" ? "" : e.target.value;
    navigate(`/${selectedTopic}`);
  };

  if (isLoading) return <p>Loading...</p>;

  if (err)
    return (
      <p className="err-msg">
        Oops! Something went wrong, please try again later.
      </p>
    );

  return (
    <section>
      <h2>{topic ? `Articles about ${topic}` : "Welcome to NC News"}</h2>{" "}
      <div className="filterbytopic-dropdown">
        <label>Topic: </label>
        <select
          onChange={handleSelect}
          value={topic || ""}
          className="topics-dropdown"
        >
          <option value="all">all</option>
          {topics.map((topic) => (
            <option key={topic.slug} value={topic.slug}>
              {topic.slug}
            </option>
          ))}
        </select>
      </div>
      <ArticleList articles={articles} />
    </section>
  );
};

export default Home;
