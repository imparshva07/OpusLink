import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [active, setActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { pathname } = useLocation();

  const handleScroll = () => {
    setActive(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const currentUser = {
    id: 1,
    username: "Anna",
    isSeller: true,
  };

  return (
    <nav className={`navbar ${active ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="logo">
          <Link className="nav-link" to="/">
            <span>WorkSphere</span>
          </Link>
        </div>
        <ul className="nav-links">
          <li>
            <Link className="nav-link" to="/business">
              Business
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/explore">
              Explore
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/language">
              EN
            </Link>
          </li>
          {!currentUser?.isSeller && (
            <li>
              <Link className="nav-link" to="/become-seller">
                Become a Seller
              </Link>
            </li>
          )}
          {currentUser ? (
            <li className="dropdown" onClick={() => setMenuOpen(!menuOpen)}>
              <img
                src="https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="User Avatar"
                className="user-avatar"
              />
              <span>{currentUser.username}</span>
              {menuOpen && (
                <div className="dropdown-menu">
                  {currentUser.isSeller && (
                    <>
                      <Link className="dropdown-item" to="/mygigs">
                        My Gigs
                      </Link>
                      <Link className="dropdown-item" to="/add-gig">
                        Add Gig
                      </Link>
                    </>
                  )}
                  <Link className="dropdown-item" to="/orders">
                    Orders
                  </Link>
                  <Link className="dropdown-item" to="/messages">
                    Messages
                  </Link>
                  <Link className="dropdown-item" to="/logout">
                    Logout
                  </Link>
                </div>
              )}
            </li>
          ) : (
            <>
              <li>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/register">
                  <button className="btn-primary">Join</button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      {(active || pathname !== "/") && (
        <div className="submenu">
          <Link className="submenu-link" to="/graphics-design">
            Graphics & Design
          </Link>
          <Link className="submenu-link" to="/video-animation">
            Video & Animation
          </Link>
          <Link className="submenu-link" to="/writing">
            Writing & Translation
          </Link>
          <Link className="submenu-link" to="/ai-services">
            AI Services
          </Link>
          <Link className="submenu-link" to="/marketing">
            Digital Marketing
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
