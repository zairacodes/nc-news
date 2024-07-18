import { useState, useEffect } from "react";
import {
  useParams,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import ArticleList from "./ArticleList";
import { getArticles, getTopics } from "../utils/api";
import Loading from "./Loading";

const Home = () => {
  const { topic } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const sortByQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order") || "desc";

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
  }, [topic, sortByQuery, orderQuery, location]);

  useEffect(() => {
    setErr("");
  }, [location]);

  const handleSelect = (e) => {
    e.preventDefault();
    const selectedTopic = e.target.value === "all" ? "" : e.target.value;
    navigate(`/${selectedTopic}`);
  };

  const handleOrder = () => {
    const newOrder = orderQuery === "asc" ? "desc" : "asc";
    setSortOrder("order", newOrder);
  };

  if (isLoading) return <Loading />;

  if (err.response && err.response.status === 404) {
    return (
      <p className="err-msg" aria-label="Error message">
        Oops! Page not found. Please check the URL and try again.
      </p>
    );
  } else if (err) {
    return (
      <p className="err-msg" aria-label="Error message">
        Oops! Something went wrong, please try again later.
      </p>
    );
  } else {
    return (
      <section aria-label="Homepage">
        <h2>{topic ? `Articles about ${topic}` : "Welcome to NC News"}</h2>{" "}
        <div className="filterbytopic-dropdown">
          <label>Topic: </label>
          <select
            onChange={handleSelect}
            value={topic || ""}
            className="topics-dropdown"
            aria-label="Filter articles by topic"
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
            aria-label="Sort articles by"
          >
            <option value="created_at">date</option>
            <option value="comment_count">comments</option>
            <option value="votes">votes</option>
          </select>
        </div>
        <div className="order-arrows">
          <button
            onClick={handleOrder}
            aria-label={`Sort articles in ${
              orderQuery === "asc" ? "descending" : "ascending"
            } order`}
          >
            {orderQuery === "asc" ? "↓" : "↑"}
          </button>
        </div>
        <ArticleList articles={articles} />
      </section>
    );
  }
};

export default Home;
