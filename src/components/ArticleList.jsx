import React, { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ArticleCard from "./ArticleCard";
import "../utils/colours.css";

const ArticleList = ({ articles }) => {
  const [page, setPage] = useState(1);
  const articlesPerPage = 5;

  const startIndex = (page - 1) * articlesPerPage;
  const paginatedArticles = articles.slice(
    startIndex,
    startIndex + articlesPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (!articles.length) return <p>Sorry, no articles available.</p>;

  return (
    <>
      {paginatedArticles.map((article) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
      <Stack
        spacing={2}
        justifyContent="center"
        mt={3}
        sx={{
          display: "flex",
          alignItems: "center",
          "& .MuiPaginationItem-root": {
            color: "var(--color-selected)",
          },
          "& .Mui-selected": {
            backgroundColor: "var(--color-teal)",
            color: "white",
          },
        }}
      >
        <Pagination
          count={Math.ceil(articles.length / articlesPerPage)}
          page={page}
          onChange={handlePageChange}
        />
      </Stack>
    </>
  );
};

export default ArticleList;
