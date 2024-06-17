import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://be-nc-news-6djf.onrender.com/api",
});

export const getArticles = () => {
  return ncNewsApi
    .get("/articles")
    .then((res) => {
      return res.data.articles;
    })
    .catch((err) => {
      throw err;
    });
};
