import React, { useState, useContext} from "react";
import axios from "axios";
import "./Add.css";
import { UserContext } from '../../context/UserContext.jsx';

const Add = () => {
  const { currentUser, logoutUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    userId: currentUser._id,
    title: "",
    description: "",
    category: "design",
    budget: "",
    expected_delivery_time: "",
    specifications: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/projects", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Project created successfully!");
      console.log("Response: ", response.data);
    } catch (error) {
      console.error("Error creating project: ", error.response?.data || error.message);
      alert("Failed to create project. Please check your inputs and try again.");
    }
  };

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Project</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter project title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter a detailed description"
              rows="4"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select id="category" value={formData.category} onChange={handleChange} required>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="budget">Budget</label>
            <input
              type="number"
              id="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="Enter your budget"
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="expected_delivery_time">Expected Delivery Time</label>
            <input
              type="date"
              id="expected_delivery_time"
              value={formData.expected_delivery_time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="specifications">Specifications</label>
            <textarea
              id="specifications"
              value={formData.specifications}
              onChange={handleChange}
              placeholder="Enter the specifications"
              rows="4"
              required
            ></textarea>
          </div>

          <button type="submit">Create Project</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
