import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import { UserContext } from "../../context/UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
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

    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
  };

  useEffect(() => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await logInWithEmailAndPassword(email, password);
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => handleFieldChange("email", e.target.value)}
          placeholder="Enter your email"
        />
        {formErrors.email && (
          <div className="error-message">{formErrors.email}</div>
        )}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => handleFieldChange("password", e.target.value)}
          placeholder="Enter your password"
        />
        {formErrors.password && (
          <div className="error-message">{formErrors.password}</div>
        )}

        <button type="submit">Login</button>

        {error && <div className="error-message">{error.message}</div>}

        <div className="extra_options">
          <div>
            <Link to="/reset">Forgot Password</Link>
          </div>
          <div>
            Don{"'"}t have an account? <Link to="/register">Register</Link> now.
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
