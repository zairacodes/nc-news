import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function CircularIndeterminate() {
  return (
    <Box
      className="loading-container"
      sx={{ position: "relative", display: "inline-flex" }}
    >
      <CircularProgress role="progressbar" aria-label="Loading..." />
    </Box>
  );
}
