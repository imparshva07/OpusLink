/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { auth, db, logOut } from "../../Firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { UserContext } from "../../context/UserContext.jsx";
function Navbar() {
  // scrolling effect
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const { currentUser, logoutUser } = useContext(UserContext);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  const removeUser = () => {
    logoutUser();
    logOut();
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  // Firebase User
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

 

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
  }, [user, loading]);

  

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">OpusLink</span>
          </Link>
        </div>
        <div className="links">
          {!currentUser?.isClient && <span>Become a Seller</span>}
          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
              <span>{currentUser.name}</span>
              {open && (
                <div className="options">
                  {currentUser.isClient && (
                    <>
                      <Link className="link" to="/myprojects">
                        Projects
                      </Link>
                      <Link className="link" to="/add">
                        Add New Project
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" to={`/profile/${currentUser._id}`}>
                    Edit Profile
                  </Link>
                  <Link className="link" onClick={removeUser}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <span>Sign in</span>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
