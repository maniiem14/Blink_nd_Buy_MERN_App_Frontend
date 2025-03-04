import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import SearchBar from "../SearchBar/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faCartShopping,
  faSignOut,
  faUserCircle,
  faUserPlus,
  faBars, 
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import AppContext from "../../context/AppContext";

const Navbar = () => {
  const { setfilteredData, products, logout, isAuthenticated, cart, user } =
    useContext(AppContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="container">
          {/* Brand */}
          <Link
            to="/"
            className="navbar-brand"
            onClick={() => setfilteredData(products)}
          >
            Blink & Buy
          </Link>

          <SearchBar />

          {/* Mobile Menu Toggle */}
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="2x" />
          </button>

          {/* Navbar Menu */}
          <div className={`navbar-menu ${menuOpen ? "is-open" : ""}`}>
            {isAuthenticated ? (
              <div className="d-flex gap-4 align-items-center icons-container">
                {/* Profile */}
                <div>
                  <Link to="/profile" className="profile-icon" onClick={() => setMenuOpen(false)}>
                    <div className="profile-wrapper">
                      <FontAwesomeIcon icon={faUserCircle} size="2x" />
                      <span className="profile-text">{user?.name}</span>
                    </div>
                  </Link>
                </div>

                {/* Cart */}
                <div>
                  <Link to="/cart" className="cart-icon text-white" onClick={() => setMenuOpen(false)}>
                    <div className="icon-wrapper">
                      <FontAwesomeIcon icon={faCartShopping} size="2x" />
                      {cart?.items?.length > 0 && (
                        <span className="cart-count">{cart.items.length}</span>
                      )}
                    </div>
                  </Link>
                </div>

                {/* Logout */}
                <div className="profile-wrapper" onClick={() => { logout(); handleNavigation("/"); }}>
                  <FontAwesomeIcon icon={faSignOut} size="2x" />
                  <span className="profile-text">Logout</span>
                </div>
              </div>
            ) : (
              <div className="d-flex gap-4 icons-container">
                {/* Login */}
                <div className="profile-wrapper" onClick={() => handleNavigation("/login")}>
                  <FontAwesomeIcon icon={faArrowRightToBracket} size="2x" />
                  <span className="profile-text">Login</span>
                </div>

                {/* Sign Up */}
                <div className="profile-wrapper" onClick={() => handleNavigation("/register")}>
                  <FontAwesomeIcon icon={faUserPlus} size="2x" />
                  <span className="profile-text">Sign Up</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
