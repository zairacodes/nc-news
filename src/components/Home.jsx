import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import ArticleList from "./ArticleList";
import { getArticles, getTopics } from "../utils/api";

const Home = () => {
  const { topic } = useParams();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const sortByQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order");

  const setSortOrder = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  useEffect(() => {
    setIsLoading(true);

    getArticles(topic, sortByQuery, orderQuery)
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
  }, [topic, sortByQuery, orderQuery]);

  const handleSelect = (e) => {
    e.preventDefault();
    const selectedTopic = e.target.value === "all" ? "" : e.target.value;
    navigate(`/${selectedTopic}`);
  };

  const handleOrder = () => {
    const newOrder = orderQuery === "asc" ? "desc" : "asc";
    setSortOrder("order", newOrder);
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
      <div className="sortby-dropdown">
        <label>Sort by: </label>
        <select
          onChange={(e) => setSortOrder("sort_by", e.target.value)}
          value={sortByQuery || ""}
          className="sortbyoptions-dropdown"
        >
          <option value="created_at">date</option>
          <option value="comment_count">comments</option>
          <option value="votes">votes</option>
        </select>
      </div>
      <div className="order-arrows">
        <button onClick={handleOrder}>
          {orderQuery === "asc" ? "↑" : "↓"}
        </button>
      </div>
      <ArticleList articles={articles} />
    </section>
  );
};

export default Home;
