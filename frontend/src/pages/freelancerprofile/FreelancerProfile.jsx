/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import './FreelancerProfile.css';

const EditProfile = () => {
    const { currentUser, updateUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        name: currentUser.name,
        bio: currentUser.bio
    });
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.name === "" || formData.bio === "") {
            setError("Fields cannot be empty");
        }
        else {
            try {
                let updateObj = {}
                if (formData.name !== "" && formData.name !== currentUser.name) {
                    updateObj.name = formData.name
                }
                if (formData.bio !== "" && formData.bio !== currentUser.bio) {
                    updateObj.bio = formData.bio
                }
                if (Object.keys(updateObj).length !== 0) {
                    const { data } = await axios.put(`http://localhost:3000/api/users/${currentUser._id}`, {
                        ...updateObj
                    });
                    const { name, bio, uid } = data;
                    setFormData({name, bio});
                    await updateUser(uid);
                    setModalMessage("Profile updated successfully!");
                    setModalOpen(true);
                }
            } catch (err) {
                console.log(err)
                setError(err)
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

                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <label htmlFor="bio">Bio</label>
                    <input
                        type="textbox"
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                    />

                    {error && <div className="alert alert-danger" role="alert">{error}</div>}

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