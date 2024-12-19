import React from "react";
import { Link } from "react-router-dom";
import "./PageNotFound.css";

function PageNotFound() {
  return (
    <div className="page-not-found">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>
        You're out of Opuslink world !!!
      </p>
      <Link to="/" className="back-home">
        Go Back to Home
      </Link>
    </div>
  );
}

export default PageNotFound;
