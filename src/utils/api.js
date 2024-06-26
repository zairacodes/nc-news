import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://be-nc-news-6djf.onrender.com/api",
});

export const getUsers = () => {
  return ncNewsApi
    .get("/users")
    .then((res) => {
      return res.data.users;
    })
    .catch((err) => {
      throw err;
    });
};

export const getTopics = () => {
  return ncNewsApi
    .get("/topics")
    .then((res) => {
      return res.data.topics;
    })
    .catch((err) => {
      throw err;
    });
};

export const getArticles = (topic, sort_by, order) => {
  return ncNewsApi
    .get("/articles", { params: { topic, sort_by, order } })
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

export const postComment = (article_id, { tempComment }) => {
  return ncNewsApi
    .post(`/articles/${article_id}/comments`, {
      username: tempComment.author,
      body: tempComment.body,
    })
    .then((res) => {
      return res.data.comment;
    })
    .catch((err) => {
      throw err;
    });
};

export const deleteComment = (comment_id) => {
  return ncNewsApi
    .delete(`/comments/${comment_id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
