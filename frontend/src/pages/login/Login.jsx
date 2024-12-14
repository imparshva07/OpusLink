import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import { UserContext } from "../../context/UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // if (loading) return;
    // if (user){
    //   await updateUser(user.uid);
    //   navigate("/"); 
    // }
    const fetchAndNavigate = async () => {
      if (loading) return;
      if (user) {
        try {
          await updateUser(user.uid);
          navigate("/");
        } catch (error) {
          console.error("Error updating user:", error);
        }
      }
    };
    fetchAndNavigate();
  }, [user, loading, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    logInWithEmailAndPassword(email, password);
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Your Email Address"
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <button type="submit">Login</button>

        {error && <div className="error-message">{error.message}</div>}

        <div className="extra_options">
          <div>
            <Link to="/reset">Forgot Password</Link>
          </div>
          <div>
            Don't have an account? <Link to="/register">Register</Link> now.
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
