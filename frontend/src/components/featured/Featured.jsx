import React from "react";
import "./Featured.css";

function Featured() {
  return (
    <section className="featured">
      <div className="featured-container">
        <div className="featured-left">
          <h1>
            Empower your business with <span>expert freelance</span> talent
          </h1>
          <div className="search-bar">
            <div className="search-input">
              <img src="./img/search.png" alt="Search Icon" />
              <input type="text" placeholder='Try "e-commerce website"' />
            </div>
            <button className="btn-search">Search</button>
          </div>
          <div className="popular-tags">
            <span>Popular:</span>
            <ul>
              <li><button>UI/UX Design</button></li>
              <li><button>React Development</button></li>
              <li><button>SEO Optimization</button></li>
              <li><button>Content Writing</button></li>
            </ul>
          </div>
        </div>
        <div className="featured-right">
          <img src="./img/hero-image.png" alt="Freelancer" />
        </div>
      </div>
    </section>
  );
}

export default Featured;
