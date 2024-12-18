import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { sendPasswordReset } from "../../Firebase";
import { auth } from "../../Firebase";

function Reset() {
  const [email, setEmail] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [buttonColor, setButtonColor] = useState("#007bff");
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  const validateForm = () => {
    const errors = {};

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      errors.email = "Invalid email format";
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
  };

  const reset = async () => {
    if (!validateForm()) return;
    try {
      await sendPasswordReset(email);
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    reset();
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/");
  }, [user, loading, navigate]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <form
        style={{
          width: "380px",
          padding: "50px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          background: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
        onSubmit={handleReset}
      >
        <h1
          style={{
            color: "#333",
            fontSize: "24px",
            fontWeight: "600",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          Reset Password
        </h1>
        {errorMessage && (
          <span
            style={{
              color: "red",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {errorMessage}
          </span>
        )}
        <label
          style={{
            color: "#555",
            fontSize: "16px",
            fontWeight: "500",
            marginBottom: "5px",
          }}
        >
          Email
        </label>
        <input
          type="email"
          style={{
            padding: "12px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "14px",
            backgroundColor: "#fafafa",
            transition: "border-color 0.3s",
          }}
          value={email}
          onChange={(e) => handleFieldChange("email", e.target.value)}
          placeholder="Enter your email"
        />
        {formErrors.email && (
          <div
            style={{
              color: "red",
              fontSize: "14px",
            }}
          >
            {formErrors.email}
          </div>
        )}
        <button
          type="submit"
          style={{
            padding: "14px",
            border: "none",
            borderRadius: "4px",
            backgroundColor: buttonColor,
            color: "#fff",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={() => setButtonColor("#0056b3")}
          onMouseLeave={() => setButtonColor("#007bff")}
        >
          Send
        </button>
        {error && (
          <div
            style={{
              color: "red",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {error.message}
          </div>
        )}
        <div>
          Don{"'"}t have an account? <Link to="/register">Register</Link> now.
        </div>
      </form>
    </div>
  );
}

export default Reset;
