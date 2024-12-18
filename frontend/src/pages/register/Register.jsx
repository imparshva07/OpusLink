import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../register/Register.css";
import { auth, registerInWithEmailAndPassword } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import upload from "../../utils/upload.js";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [img, setImg] = useState(null);
  const [bio, setBio] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  const validateForm = () => {
    const errors = {};

    if (!name.trim()) errors.name = "Full Name is required";
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      errors.email = "Invalid email format";
    }
    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (!bio.trim()) errors.bio = "Bio is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const register = async () => {
    if (validateForm()) {
      const url = await upload(img);
      try {
        await registerInWithEmailAndPassword(
          name,
          email,
          password,
          url,
          isClient,
          bio
        );
        navigate("/login");
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  };

  useEffect(() => {
    if (loading) return;
  }, [user, loading, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form refresh
    register();
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit} className="register_form">
        <div className="left">
          <h1>Create a new account</h1>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <label htmlFor="name">Full Name</label>
          <input
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {formErrors.name && (
            <div className="error-message">{formErrors.name}</div>
          )}

          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {formErrors.email && (
            <div className="error-message">{formErrors.email}</div>
          )}

          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {formErrors.password && (
            <div className="error-message">{formErrors.password}</div>
          )}

          <label htmlFor="profilePicture">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />

          <label htmlFor="bio">Bio</label>
          <input
            name="bio"
            type="text"
            placeholder="Enter a brief description"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          {formErrors.bio && (
            <div className="error-message">{formErrors.bio}</div>
          )}

          <div className="right">
            <h1>I am Hiring</h1>
            <div className="toggle">
              <label htmlFor="isClient">Enable client mode</label>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isClient}
                  onChange={() => setIsClient(!isClient)}
                />
                <span className="slider round" style={{ padding: '0px' }}></span>
              </label>
            </div>
          </div>

          <button type="submit">Register</button>
          {error && <div className="error-message">{error.message}</div>}

          <div className="extra_options">
            <div>
              Already have an account? <Link to="/login">Login</Link> now.
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
