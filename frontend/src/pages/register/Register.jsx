import { useEffect, useState } from "react";
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

    if (!name.trim()) {
      errors.name = "Full Name is required";
    } else if (name.length > 50) {
      errors.name = "Name must not exceed 50 characters";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    } else if (
      !/(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/.test(password)
    ) {
      errors.password =
        "Password must include at least one uppercase letter, one number, and one special character";
    }

    if (img) {
      const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validImageTypes.includes(img.type)) {
        errors.img = "Invalid image format (only jpg, jpeg, or png allowed)";
      } else if (img.size > 5 * 1024 * 1024) {
        errors.img = "Image size must not exceed 5MB";
      }
    }

    if (!bio.trim()) {
      errors.bio = "Bio is required";
    } else if (bio.length > 200) {
      errors.bio = "Bio must not exceed 200 characters";
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

    switch (field) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "bio":
        setBio(value);
        break;
      default:
        break;
    }
  };

  const register = async () => {
    if (!validateForm()) return;
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
  };

  useEffect(() => {
    if (loading) return;
  }, [user, loading, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
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
            onChange={(e) => handleFieldChange("name", e.target.value)}
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
            onChange={(e) => handleFieldChange("email", e.target.value)}
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
            onChange={(e) => handleFieldChange("password", e.target.value)}
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
          {formErrors.img && (
            <div className="error-message">{formErrors.img}</div>
          )}

          <label htmlFor="bio">Bio</label>
          <input
            name="bio"
            type="text"
            placeholder="Enter a brief description"
            value={bio}
            onChange={(e) => handleFieldChange("bio", e.target.value)}
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
                <span
                  className="slider round"
                  style={{ padding: "0px" }}
                ></span>
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
