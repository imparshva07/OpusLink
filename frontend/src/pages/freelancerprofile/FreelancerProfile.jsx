import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import "./FreelancerProfile.css";
import upload from "../../utils/upload";
const EditProfile = () => {
  const { currentUser, updateUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: currentUser.name,
    img: currentUser.img,
    bio: currentUser.bio,
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;

    const newValue = type === "file" ? files[0] : value;

    setFormData({ ...formData, [name]: newValue });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) errors.name = "Full Name is required";
    if (!formData.bio.trim()) errors.bio = "Bio is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const url = await upload(formData.img);
      try {
        let updateObj = {};
        if (formData.name !== currentUser.name) {
          updateObj.name = formData.name;
        }
        if (formData.bio !== currentUser.bio) {
          updateObj.bio = formData.bio;
        }
        if (formData.img !== currentUser.img) {
          updateObj.img = url;
        }
        if (Object.keys(updateObj).length !== 0) {
          const { data } = await axios.put(
            `http://localhost:3000/api/users/${currentUser._id}`,
            {
              ...updateObj,
            }
          );
          const { name, bio, img, uid } = data;
          setFormData({ name, img, bio });
          await updateUser(uid);
          setModalMessage("Profile updated successfully!");
          setModalOpen(true);
        }
      } catch (err) {
        console.log(err);
        setErrorMessage(err.message);
        setModalMessage("Failed to update profile. Please try again.");
        setModalOpen(true);
      }
    }
  };
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Edit Profile</h1>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <label htmlFor="profilePicture">Profile Picture</label>
          <input
            name="img"
            type="file"
            id="profilePicture"
            accept="image/*"
            onChange={handleChange}
          />

          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          {formErrors.name && (
            <div className="error-message">{formErrors.name}</div>
          )}

          <label htmlFor="bio">Bio</label>
          <input
            type="text"
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />

          {formErrors.bio && (
            <div className="error-message">{formErrors.bio}</div>
          )}

          <button type="submit" className="mt-3 btn btn-primary w-100">
            Update
          </button>
          {isModalOpen && (
            <div className="modal-overlay">
              <div className="modal-container">
                <p>{modalMessage}</p>
                <button onClick={() => setModalOpen(false)}>Close</button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
