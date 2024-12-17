/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./MyProjects.css";

function MyProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentUser = {
    id: "1",
    username: "Anna",
    isSeller: true,
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/projects`, {
          params: { userId: currentUser.id },
        });
        setProjects(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [currentUser.id]);

  const handleDelete = async (projectId) => {
    try {
      await axios.delete(`/api/projects/${projectId}`);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== projectId)
      );
    } catch (err) {
      alert("Failed to delete the project. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  console.log(projects);

  return (
    <div className="projects">
      <div className="projects-container">
        <div className="projects-header">
          <h1>{currentUser.isSeller ? "Your Projects" : "Active Orders"}</h1>
          {currentUser.isSeller && (
            <Link to="/add" className="add-project-link">
              <button className="add-project-btn">Add Project</button>
            </Link>
          )}
        </div>
        <table className="projects-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Budget</th>
              <th>Category</th>
              <th>Delivery Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id}>
                <td>
                  <img
                    className="project-image"
                    src={
                      project.img ||
                      "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    }
                    alt={project.title}
                  />
                </td>
                <td>
                  <Link
                    to={`/project/${project._id}`}
                    className="project-title-link"
                  >
                    {project.title}
                  </Link>
                </td>
                <td>${project.budget.toFixed(2)}</td>
                <td>{project.category}</td>
                <td>
                  {new Date(
                    project.expected_delivery_time
                  ).toLocaleDateString()}
                </td>
                <td>
                  <img
                    className="delete-btn"
                    src="./img/delete.png"
                    alt="Delete"
                    onClick={() => handleDelete(project._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyProjects;
