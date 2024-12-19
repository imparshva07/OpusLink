import { useEffect, useState, useContext, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth, logOut } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { UserContext } from "../../context/UserContext.jsx";
import "./Navbar.css";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const navContainerRef = useRef(null);
  const { currentUser, logoutUser } = useContext(UserContext);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  const removeUser = () => {
    logoutUser();
    logOut();
  };

  const handleClickOutside = (event) => {
    if (
      navContainerRef.current &&
      !navContainerRef.current.contains(event.target)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
  }, [loading, navigate, user]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">OPUSLINK</span>
          </Link>
        </div>
        <div className="links">
          <>
            <Link className="link" to="/myprojects">
              <span>Projects</span>
            </Link>
            {currentUser && currentUser.isClient && (
              <Link className="link" to="/freelancers">
                <span>Freelancers</span>
              </Link>
            )}
          </>
          {currentUser ? (
            <div
              className="user"
              onClick={() => setOpen(!open)}
              ref={navContainerRef}
            >
              <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
              <span>{currentUser.name}</span>
              {open && (
                <div className="options">
                  {currentUser.isClient && (
                    <>
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
              <Link className="link" to="/register">
                <button>Sign up</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
