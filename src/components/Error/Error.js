import React from "react";
import "./Error.css";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="error">
      <p className="errorMessage">Sorry to kill your mood.</p>
      <p className="errorMessage">Something went wrong.</p>
      <Link to="/">
        <button className="home-button">HOME</button>
      </Link>
    </div>
  );
};

export default Error;
