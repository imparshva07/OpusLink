import React from "react";
import "./Featured.css";

function Featured() {
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Discover the ideal <span>freelance</span> solutions for your needs
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="./img/search-blue.png" alt="" />
              <input type="text" placeholder='Try "custom web design"' />
            </div>
            <button>Find</button>
          </div>
          <div className="popular">
            <span>Trending:</span>
            <button>App Development</button>
            <button>eCommerce</button>
            <button>SEO Optimization</button>
            <button>Machine Learning</button>
          </div>
        </div>
        <div className="right">
          <img src="./img/creative-team.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Featured;
