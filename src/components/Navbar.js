import React from "react";
import logo from "./Images/logo1.png";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src={logo}
            alt=""
            style={{
              width: "60px",
              padding: "0",
              margin: "0 26px",
              height: "34px",
            }}
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link mx-3 " aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                About
              </a>
            </li>
          </ul>
          <button type="button" className="btn btn-secondary" id="githubBtn">
            <a href="https://github.com/M-Saad-saif" target="_blanck">
              Github<i className="fa-brands fa-github mx-1"></i>
            </a>
          </button>
        </div>
      </div>
    </nav>
  );
}
