/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/projects/search", {
        params: { query },
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error searching projects:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for projects..."
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map((project) => (
          <li key={project.id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>Budget: ${project.budget}</p>
            <p>Status: {project.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
