import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingWheel = () => {
  return <CircularProgress sx={{ color: "primary"}} size={150}className="progress-wheel"/>;
};

export default LoadingWheel;
