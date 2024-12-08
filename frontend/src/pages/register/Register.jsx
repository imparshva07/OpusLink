import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      await updateProfile(user, {
        displayName: form.name,
      });
      const token = await user.getIdToken();
      await axios.post("http://localhost:5000/api/auth/register", {
        firebaseToken: token,
        name: form.name,
        role: form.role,
      });
    } catch (error) {
      setError("Registration failed. Please try again later.");
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>

          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            required
          />

          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            required
          >
            <option value="">Select your Role</option>
            <option value="freelancer">Freelancer</option>
            <option value="client">Client</option>
          </select>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <button type="submit" className="mt-3 btn btn-primary w-100">
            Register
          </button>

          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
