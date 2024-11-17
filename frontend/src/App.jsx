import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/"
        element={currentUser ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={currentUser ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/register"
        element={currentUser ? <Navigate to="/" /> : <Register />}
      />
      <Route
        path="*"
        element={currentUser ? <Navigate to="/" /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
