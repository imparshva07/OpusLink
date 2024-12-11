import React from "react";
import "./Add.css";

const Add = () => {
  return (
    <div className="add">
      <div className="container">
        <h1>Add New Project</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="e.g. I will do something amazing"
            />
            <label htmlFor="category">Category</label>
            <select id="category" name="category">
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>
            <label htmlFor="coverImage">Cover Image</label>
            <input id="coverImage" type="file" />
            <label htmlFor="uploadImages">Upload Images</label>
            <input id="uploadImages" type="file" multiple />
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Describe your service briefly"
              rows="10"
            ></textarea>
            <button>Create Project</button>
          </div>
          <div className="details">
            <label htmlFor="serviceTitle">Service Title</label>
            <input
              id="serviceTitle"
              type="text"
              placeholder="e.g. One-page web design"
            />
            <label htmlFor="shortDescription">Short Description</label>
            <textarea
              id="shortDescription"
              placeholder="A brief description of your service"
              rows="6"
            ></textarea>
            <label htmlFor="deliveryTime">Delivery Time (days)</label>
            <input id="deliveryTime" type="number" />
            <label htmlFor="revisionNumber">Revision Number</label>
            <input id="revisionNumber" type="number" />
            <label htmlFor="addFeatures">Add Features</label>
            <input
              id="addFeatures"
              type="text"
              placeholder="e.g. page design"
            />
            <label htmlFor="price">Price</label>
            <input id="price" type="number" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
