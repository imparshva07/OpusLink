import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Projects from "./pages/projects/Projects";
import Project from "./pages/project/Project";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Reset from "./pages/register/Reset";
import Add from "./pages/add/Add";
import Bids from "./pages/bids/Bids";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import MyProjects from "./pages/myProjects/MyProjects";
import Orders from "./pages/orders/Orders";
import Search from "./components/search/search";
import FreelancerProfile from "./pages/freelancerprofile/FreelancerProfile";

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
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/search",
          element: <Search />,
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
