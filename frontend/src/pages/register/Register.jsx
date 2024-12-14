import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../register/Register.css";
import { auth, registerInWithEmailAndPassword } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [img, setImg] = useState(null);
  const [bio, setBio] = useState("");
  const [isClient, setIsClient] = useState(false);

  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  const register = async() => {
    if (name !== "") {
      await registerInWithEmailAndPassword(name, email, password, img, isClient, bio);
      navigate("/login");
    } else {
      alert("Please enter a name");
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

          <label htmlFor="name">Full Name</label>
          <input
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

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

          <button type="submit">Register</button>
          {error && <div className="error-message">{error.message}</div>}
        </div>

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
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
