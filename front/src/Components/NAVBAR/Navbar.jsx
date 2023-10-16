import React, { useState } from "react";
import "./Navbar.css";
import { NavLink,useLocation,useNavigate  } from "react-router-dom";
import MounehLogo from "../../images/Mouneh-logo.png";
import DropDown from "../DROPDOWN/Dropdown";
import CategoryDropDown from "../CATEGORY DROPDOWN/CategoryDropdown";

const Navbar = (props) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); 
  const isProductPage = location.pathname.startsWith("/product/");
  const isProductsPage = location.pathname.startsWith("/showProducts");
  const isAdmin = localStorage.getItem("isAdmin");
  const token = localStorage.getItem("access_token");



  const menuOnClick = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
   // navigate('/login'); // Redirect to the homepage after logout
  };

  return (
    <>
      <div id="menu">
        <div
          id="menu-bar"
          onClick={menuOnClick}
          className={isMenuOpen ? "change" : ""}
        >
          <div id="bar1" className="bar"></div>
          <div id="bar2" className="bar"></div>
          <div id="bar3" className="bar"></div>
        </div>
        <nav className={isMenuOpen ? "nav change" : "nav"} id="nav">
          <ul>
            <li>
              <NavLink to="/" onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={closeMenu}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={closeMenu}>
                Contact
              </NavLink>
            </li>
            {isAdmin === "true" && (
              <li>
              <NavLink to="/dashboard/admin/*" onClick={closeMenu}>
              Dashboard
            </NavLink>
            </li>
            )}
            <li>
            <NavLink to="/workshops" onClick={closeMenu}>
                Workshop
              </NavLink>
            </li>
            {isAdmin === "false" && (
              <li>
              <NavLink to="/MyProducts" onClick={closeMenu}>
              My Product
            </NavLink>
            </li>
            )}
            {isAdmin === "false" && (
              <li>
              <NavLink to="/addproduct" onClick={closeMenu}>
              Add Product
            </NavLink>
            </li>
            )}
            <li>
            {isProductPage && <NavLink onClick={closeMenu} to="/cart">My Cart</NavLink>}
            {!isProductPage && <NavLink onClick={closeMenu} to="/editprofile">Edit Profile</NavLink>}
            </li>
            {token && (
              <li><NavLink onClick={closeMenu} to="/mychat">My Chats</NavLink></li>
            )}
            <li>
              <NavLink to="/login" onClick={closeMenu}>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" onClick={closeMenu}>
                Register
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div
        className={isMenuOpen ? "menu-bg change-bg" : "menu-bg"}
        id="menu-bg"
      ></div>

      <nav className="navbar">
        <div className="logo">
          <img src={MounehLogo} alt="" />
        </div>
        <ul className="navbar-list">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
          {isProductsPage && (
            <li><CategoryDropDown /></li>
          )}
          <li>
            <DropDown />
          </li>
        </ul>
        <div className="authentication-btn">
          {token ? (
            <>
              {isProductsPage && <NavLink to="/cart">My Cart</NavLink>}
              {isProductPage && <NavLink to="/cart">My Cart</NavLink>}
              <NavLink to="/login" onClick={handleLogout}>
                Logout
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
