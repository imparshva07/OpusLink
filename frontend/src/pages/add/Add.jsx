import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Add.css";
import { UserContext } from "../../context/UserContext.jsx";
import upload from "../../utils/upload.js";

const Add = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: currentUser._id,
    title: "",
    description: "",
    category: "Other",
    budget: "",
    expected_delivery_time: "",
    specifications: [],
    img: "",
  });
  const [specificationInput, setSpecificationInput] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDate = tomorrow.toISOString().split("T")[0];

  const validateForm = () => {
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = "Title is required.";
    } else if (formData.title.length < 5) {
      errors.title = "Title must be at least 5 characters long.";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required.";
    } else if (formData.description.length < 10) {
      errors.description = "Description must be at least 10 characters long.";
    }

    if (!formData.budget) {
      errors.budget = "Budget is required.";
    } else if (formData.budget <= 0) {
      errors.budget = "Budget must be greater than 0.";
    }

    if (!formData.expected_delivery_time) {
      errors.expected_delivery_time = "Expected delivery time is required.";
    }

    if (!formData.category.trim()) {
      errors.category = "Category is required.";
    } else if (formData.category.length < 1) {
      errors.category = "Category is required.";
    }

    if (!formData.specifications.length) {
      errors.specifications = "At least one specification is required.";
    } else if (formData.specifications.some((spec) => spec.length < 4)) {
      errors.specifications =
        "Each specification must be at least 4 characters long.";
    }

    if (!formData.img) {
      errors.image = "Image is required.";
    }

    if (formData.img) {
      if (imageFile) {
        const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!validImageTypes.includes(imageFile.type)) {
          errors.image =
            "Invalid image format (only jpg, jpeg, or png allowed)";
        } else if (imageFile.size > 5 * 1024 * 1024) {
          errors.image = "Image size must not exceed 5MB";
        }
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFieldChange = (field, value) => {
    if (formErrors[field]) {
      setFormErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[field];
        return updatedErrors;
      });
    }

    setFormData((prev) => ({ ...prev, [field]: value }));
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

  const handleImageUpload = async (file) => {
    try {
      const uploadedImageUrl = await upload(file);
      setFormData((prev) => ({ ...prev, img: uploadedImageUrl }));
    } catch (error) {
      console.error("Image upload failed", error);
      setErrorMessage("Image upload failed. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validImageTypes.includes(file.type)) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          image: "Invalid image format (only jpg, jpeg, or png allowed)",
        }));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          image: "Image size must not exceed 5MB",
        }));
        return;
      }

      setFormErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors.image;
        return updatedErrors;
      });

      handleImageUpload(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:3000/api/projects",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        navigate(`/project/${response.data._id}`);
      } catch (error) {
        console.error(
          "Error creating project: ",
          error.response?.data || error.message
        );
        setErrorMessage("Failed to create project. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Project</h1>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="img">Upload Image</label>
            <input
              type="file"
              id="img"
              accept="image/*"
              onChange={(e) => {
                handleFileChange(e);
              }}
            />
            {formErrors.image && (
              <div className="error-message">{formErrors.image}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => {
                handleFieldChange("title", e.target.value);
              }}
              placeholder="Enter project title"
            />
            {formErrors.title && (
              <div className="error-message">{formErrors.title}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => {
                handleFieldChange("description", e.target.value);
              }}
              placeholder="Enter a detailed description"
              rows="4"
            ></textarea>
            {formErrors.description && (
              <div className="error-message">{formErrors.description}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => {
                handleFieldChange("category", e.target.value);
              }}
            >
              <option value=""></option>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
              <option value="graphic_design">Graphic Design</option>
              <option value="mobile_app">Mobile App Development</option>
              <option value="game_development">Game Development</option>
              <option value="content_writing">Content Writing</option>
              <option value="seo">SEO & Marketing</option>
              <option value="business_consulting">Business Consulting</option>
              <option value="data_analysis">Data Analysis</option>
              <option value="photography">Photography</option>
              <option value="videography">Videography</option>
              <option value="digital_marketing">Digital Marketing</option>
              <option value="blockchain">Blockchain Development</option>
              <option value="ai_ml">AI & Machine Learning</option>
            </select>
            {formErrors.category && (
              <div className="error-message">{formErrors.category}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="budget">Budget</label>
            <input
              type="number"
              id="budget"
              value={formData.budget}
              onChange={(e) => {
                handleFieldChange("budget", e.target.value);
              }}
              placeholder="Enter your budget"
              min="1"
            />
            {formErrors.budget && (
              <div className="error-message">{formErrors.budget}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="expected_delivery_time">
              Expected Delivery Time
            </label>
            <input
              type="date"
              id="expected_delivery_time"
              value={formData.expected_delivery_time}
              onChange={(e) => {
                handleFieldChange("expected_delivery_time", e.target.value);
              }}
              min={tomorrowDate}
            />
            {formErrors.expected_delivery_time && (
              <div className="error-message">
                {formErrors.expected_delivery_time}
              </div>
            )}
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
                  {spec}{" "}
                  <button
                    type="button"
                    onClick={() => handleRemoveSpecification(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            {formErrors.specifications && (
              <div className="error-message">{formErrors.specifications}</div>
            )}
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Project"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
