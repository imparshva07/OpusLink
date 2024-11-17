import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1>Welcome, {currentUser?.displayName || "User"}!</h1>
        <p>Email: {currentUser?.email}</p>
        <button className="btn btn-danger mt-3" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
