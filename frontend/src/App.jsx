import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Projects from "./pages/projects/Projects";
import Project from "./pages/project/Project";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Add from "./pages/add/Add";
import Bids from "./pages/bids/Bids";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import MyProjects from "./pages/myProjects/MyProjects";
import "./App.css";

function App() {
  const { currentUser } = useContext(AuthContext);
  const Layout = () => {
    return (
      <div className="app">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: currentUser ? <Layout /> : <Navigate to="/login" />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/projects",
          element: <Projects />,
        },
        {
          path: "/myProjects",
          element: <MyProjects />,
        },
        {
          path: "/bids",
          element: <Bids />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/message/:id",
          element: <Message />,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/project/:id",
          element: <Project />,
        },
      ],
    },
    {
      path: "/register",
      // element: currentUser ? <Navigate to="/" /> : <Register />,
      element: <Register />,
    },
    {
      path: "/login",
      // element: currentUser ? <Navigate to="/" /> : <Login />,
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
