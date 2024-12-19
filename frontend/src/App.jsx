import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Project from "./pages/project/Project";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Reset from "./pages/register/Reset";
import Add from "./pages/add/Add";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import MyProjects from "./pages/myProjects/MyProjects";
import FreelancerProfile from "./pages/freelancerprofile/FreelancerProfile";
import FreelancersList from "./pages/freelancerslist/FreelancersList";

function App() {
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
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/myProjects",
          element: <MyProjects />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/message/:chatId",
          element: <Message />,
        },
        {
          path: "/profile/:id",
          element: <FreelancerProfile />,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/project/:id",
          element: <Project />,
        },
        {
          path: "/freelancers",
          element: <FreelancersList />,
        },
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/reset",
      element: <Reset />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
