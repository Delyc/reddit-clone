import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [screen, setScreen] = useState(window.innerWidth);
  const toggleNav = () => {
    setMenu(!menu);
  };
  useEffect(() => {
    const changeWidth = () => {
      setScreen(window.innerWidth);
    };
    window.addEventListener("resize", changeWidth);
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);
  const user = localStorage.getItem("user") || null;
  const logout = () => {
    localStorage.clear();
    return (window.location.pathname = "/login");
  };

  return (
    <nav>
      {(menu || screen > 500) && (
        <ul className="list">
          <li>
            <Link className="items" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="items" to="/create">
              Add post
            </Link>
          </li>
          
          {!user && (
            <>
              <li>
                <Link className="items" to="/sign">
                  Sign up
                </Link>
              </li>
              <button>
                <Link className="button-login" to="/login">
                  Login
                </Link>
              </button>
            </>
          )}
          {user && (
            <button className="logout log-out" onClick={logout}>
              Logout
            </button>
          )}
        </ul>
      )}

      <button onClick={toggleNav} className="btn">
        BTN{" "}
      </button>
    </nav>
  );
};

export default Navbar;
