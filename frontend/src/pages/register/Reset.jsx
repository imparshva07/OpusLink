import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { sendPasswordReset } from "../../Firebase";
import { auth } from "../../Firebase"

function Reset() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  // TODO *************
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/");
  }, [user, loading]);

  return (
    <div className="login">
      <div className="login_box">
        <input
          type="text"
          className="reset__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button
          style={{ marginTop: "20px" }}
          className="reset__btn"
          // TODO *************
          onClick={()=> sendPasswordReset(email)}
        >
          Send password reset email
        </button>
        <div style={{ marginTop: "20px" }}>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Reset;
