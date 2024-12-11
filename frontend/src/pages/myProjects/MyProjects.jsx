import React from "react";
import { Link } from "react-router-dom";
import "./MyProjects.css";

function MyProjects() {
  const currentUser = {
    id: 1,
    username: "Anna",
    isSeller: true,
  };

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
              <th>Price</th>
              <th>Sales</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {[
              { title: "Stunning Concept Art", price: "59.99", sales: 13 },
              { title: "AI Generated Concept Art", price: "120.99", sales: 41 },
              { title: "Digital Character", price: "79.99", sales: 55 },
              { title: "Hyper Realistic Painting", price: "119.99", sales: 29 },
              { title: "AI Generated Art", price: "59.99", sales: 34 },
              { title: "Text-Based AI Art", price: "110.99", sales: 16 },
            ].map((project, index) => (
              <tr key={index}>
                <td>
                  <img
                    className="project-image"
                    src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt={project.title}
                  />
                </td>
                <td>{project.title}</td>
                <td>{project.price}</td>
                <td>{project.sales}</td>
                <td>
                  <img className="delete-btn" src="./img/delete.png" alt="Delete" />
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
