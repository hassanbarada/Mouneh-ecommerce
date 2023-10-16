import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Footer.css';
import {
    faFacebook,
    faInstagram,
    faTwitter,
  } from "@fortawesome/free-brands-svg-icons";

const Footer = ({ isFixed }) => {
  return (
    <footer className={`footer ${isFixed ? 'fixed-footer' : ''}`}>
      <div className="footer-content">

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: contact@mouneh.com</p>
          <p>Phone: +1234567890</p>
          <p>Address: 123 HomeGrown Street, City, Country</p>
        </div>

        <div className="footer-section">
          <h3>Social Media</h3>
        <div className="social-media">
        <Link to="#">
            <FontAwesomeIcon icon={faFacebook} />
            Facebook
          </Link><br />
          <Link to="#">
            <FontAwesomeIcon icon={faInstagram} />
            Instagram
          </Link><br />
          <Link to="#">
            <FontAwesomeIcon icon={faTwitter} />
            Twitter
          </Link>
        </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} HomeGrown. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
