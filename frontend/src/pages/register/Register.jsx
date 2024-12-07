import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import axios from "axios";
// import upload from "../../utils/upload";
import "./Register.css";

function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    country: "",
    phone: "",
    desc: "",
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      // Register the user with Firebase
      const { user: firebaseUser } = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      await updateProfile(firebaseUser, { displayName: user.name });

      // Upload profile picture if it exists
      const imgUrl = file ? await upload(file) : "";

      // Send data to the server
      await axios.post("http://localhost:5000/api/auth/register", {
        ...user,
        img: imgUrl,
        firebaseToken: await firebaseUser.getIdToken(),
      });

      navigate("/"); // Redirect after successful registration
    } catch (err) {
      setError("Registration failed. Please try again later.");
      console.error(err);
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>

          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            placeholder="John Doe"
            onChange={handleChange}
            value={user.name}
          />

          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            value={user.email}
          />

          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            value={user.password}
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            onChange={handleChange}
            value={user.confirmPassword}
          />

          <div className="toggle">
            <label htmlFor="isSeller">Activate the seller account</label>
            <label className="switch">
              <input
                type="checkbox"
                onChange={(e) =>
                  setUser({ ...user, isSeller: e.target.checked })
                }
              />
              <span className="slider round"></span>
            </label>
          </div>

          <button type="submit">Register</button>
        </div>
      </form>

      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default Register;
