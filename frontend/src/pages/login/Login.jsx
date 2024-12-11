import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import "./Login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (!form.email || !form.password) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const token = await user.getIdToken();
      await axios.post("http://localhost:5000/api/auth/login", {
        firebaseToken: token,
      });
      navigate("/");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
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
        {error && <span>{error}</span>}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in.." : "Login"}
        </button>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
