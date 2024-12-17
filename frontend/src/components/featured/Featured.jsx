/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import "./Featured.css";

function Featured({setProjectData}) {
  const { currentUser } = useContext(UserContext);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {

      if(currentUser && currentUser.isClient) {
      const response = await axios.get(`http://localhost:3000/api/projects/search/${currentUser._id}`, {
        params: { query },
      });
      setResults(response.data);
      setProjectData(response.data); 
    } 
    if(currentUser && !currentUser.isClient) {
      const response = await axios.get("http://localhost:3000/api/projects/search", {
        params: { query },
      });
      setResults(response.data);
      setProjectData(response.data);
    }
    } catch (error) {
      console.error("Error searching projects:", error);
    }
  };
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
        {currentUser && currentUser.isClient && (
          <h1>
            Search <span>Your</span> Projects Here
          </h1>)}
          {currentUser && !currentUser.isClient && (
          <h1>
            Discover the ideal <span>freelance</span> solutions for your needs
          </h1>)}
          <div className="search">
            <div className="searchInput">
              <input type="text"         value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search for projects..." />
            </div>
            <button onClick={handleSearch}>Find</button>
          </div>
          {/* <div className="popular">
            <span>Trending:</span>
            <button>App Development</button>
            <button>eCommerce</button>
            <button>SEO Optimization</button>
            <button>Machine Learning</button>
          </div> */}
        </div>
        <div className="right">
          <img src="./img/creative-team.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Featured;
