import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Add.css";
import { UserContext } from '../../context/UserContext.jsx';

const Add = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: currentUser._id,
    title: "",
    description: "",
    category: "design",
    budget: "",
    expected_delivery_time: "",
    specifications: [],
  });
  const [specificationInput, setSpecificationInput] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddSpecification = () => {
    if (specificationInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        specifications: [...prev.specifications, specificationInput.trim()],
      }));
      setSpecificationInput("");
    }
  };

  const handleRemoveSpecification = (index) => {
    setFormData((prev) => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index),
    }));
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

      navigate(`/project/${response.data._id}`);
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
            <div className="specifications-input">
              <input
                type="text"
                value={specificationInput}
                onChange={(e) => setSpecificationInput(e.target.value)}
                placeholder="Add a specification"
              />
              <button type="button" onClick={handleAddSpecification}>
                Add
              </button>
            </div>
            <ul className="specifications-list">
              {formData.specifications.map((spec, index) => (
                <li key={index}>
                  {spec} <button type="button" onClick={() => handleRemoveSpecification(index)}>Remove</button>
                </li>
              ))}
            </ul>
          </div>

          <button type="submit">Create Project</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
