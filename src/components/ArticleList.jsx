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

  const colours = {
    "& .MuiPaginationItem-page, & .MuiPaginationItem-previousNext": {
      bgcolor: "var(--color-teal)",
      color: "var(--color-lightGrey)",
    },
    "& .Mui-selected": {
      bgcolor: "var(--color-lightGrey) !important",
      color: "var(--color-charcoalGrey) !important",
    },
    "& .MuiPaginationItem-ellipsis": {
      color: "grey",
    },
  };

  if (!articles.length) return <p>Sorry, no articles available.</p>;

  return (
    <>
      {paginatedArticles.map((article) => (
        <ArticleCard
          key={article.article_id}
          article={article}
          aria-label={`Article: ${article.title}`}
        />
      ))}
      <Stack
        spacing={2}
        mt={2}
        mb={1}
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Pagination
          count={Math.ceil(articles.length / articlesPerPage)}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          sx={colours}
          aria-label="Pagination"
        />
      </Stack>
    </>
  );
};

export default ArticleList;
