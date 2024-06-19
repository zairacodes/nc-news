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

export const getArticleById = (article_id) => {
  return ncNewsApi
    .get(`/articles/${article_id}`)
    .then((res) => {
      return res.data.article;
    })
    .catch((err) => {
      throw err;
    });
};

export const getArticleComments = (article_id) => {
  return ncNewsApi
    .get(`/articles/${article_id}/comments`)
    .then((res) => {
      return res.data.comments;
    })
    .catch((err) => {
      throw err;
    });
};

export const patchVote = (article_id, inc_votes) => {
  return ncNewsApi
    .patch(`/articles/${article_id}`, { inc_votes })
    .then((res) => {
      return res.data.article;
    })
    .catch((err) => {
      throw err;
    });
};

export const postComment = (article_id, newComment) => {
  return ncNewsApi
    .post(`/articles/${article_id}/comments`, {
      username: "jessjelly",
      body: newComment,
    })
    .then((res) => {
      return res.data.comment;
    })
    .catch((err) => {
      throw err;
    });
};
