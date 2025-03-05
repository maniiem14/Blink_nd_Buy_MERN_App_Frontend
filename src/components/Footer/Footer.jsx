import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer
      className="bg-dark text-white pt-4 pb-3"
      style={{ minHeight: "250px", boxSizing: "border-box" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3 px-5" style={{ minHeight: "130px" }}>
            <Link
              to="/"
              style={{
                fontSize: "clamp(1.3rem, 4vw, 1.6rem)",
                textDecoration: "none",
                minHeight: "40px",
                color: "red",
              }}
            >
              Blink & Buy
            </Link>
            <p style={{ fontSize: "14px", lineHeight: "1.5" }}>
              Explore premium products tailored to your needs. Shop now for the
              best in quality and variety!
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3 px-5" style={{ minHeight: "150px" }}>
            <h5
              className="text-uppercase"
              style={{
                fontSize: "18px",
                lineHeight: "1.5",
                minHeight: "36px",
                color: "red",
              }}
            >
              Quick Links
            </h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-white text-decoration-none">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/" className="text-white text-decoration-none">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="#" className="text-white text-decoration-none">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-white text-decoration-none">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className="col-md-4 mb-3 px-5" style={{ minHeight: "150px" }}>
            <h5
              className="text-uppercase"
              style={{
                fontSize: "18px",
                lineHeight: "1.5",
                minHeight: "36px",
                color: "red",
              }}
            >
              Follow Us On
            </h5>

            <div className="d-flex gap-3">
              <a
                href="https://github.com/maniiem14" target="_blank"
                className="text-white"
                style={{
                  display: "inline-block",
                  width: "32px",
                  height: "32px",
                }}
              >
                <i
                  className="bi bi-youtube fs-3"
                  style={{ fontSize: "28px" }}
                ></i>
              </a>
              <a
                href="https://github.com/maniiem14" target="_blank"
                className="text-white"
                style={{
                  display: "inline-block",
                  width: "32px",
                  height: "32px",
                }}
              >
                <i
                  className="bi bi-github fs-3"
                  style={{ fontSize: "28px" }}
                ></i>
              </a>
              <a
                href="https://www.linkedin.com/in/lalmani-kumar-20b758207/" target="_blank"
                className="text-white"
                style={{
                  display: "inline-block",
                  width: "32px",
                  height: "32px",
                }}
              >
                <i
                  className="bi bi-linkedin fs-3"
                  style={{ fontSize: "28px" }}
                ></i>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-3" style={{ minHeight: "50px" }}>
          <p
            className="mb-0"
            style={{ lineHeight: "1.6", minHeight: "24px", overflow: "hidden" }}
          >
            &copy; 2025 Blink & Buy. All Rights Reserved.
          </p>
          <p
            className="mb-0"
            style={{ lineHeight: "1.6", minHeight: "24px", overflow: "hidden" }}
          >
            Designed with ❤️ by Lalmani Kumar
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
