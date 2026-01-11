import React, { use, useState } from "react";
import logo from "./Images/logo1.png";
import MusicImg from "./Images/music img.png";
import { Link, useLocation } from "react-router-dom";
import UserProfile from "./UserProfile";

export default function Navbar() {
  const location = useLocation();
  const [showProfileModal, setShowProfileModal] = useState(false);

  const openProfileModal = () => {
    setShowProfileModal(true);
  };

  const closeProfileModal = () => {
    setShowProfileModal(false);
  };

  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src={MusicImg}
            alt=""
            style={{
              width: "40px",
              padding: "0",
              margin: "0 2px",
              height: "34px",
            }}
          />

          <img
            src={logo}
            alt=""
            style={{
              width: "60px",
              padding: "0",
              margin: "0 0px",
              height: "34px",
            }}
          />
        </Link>

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
            <li className="nav-item" id="homelink">
              <Link
                title="Home "
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                } mx-3`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                title="Playlist"
                className={`nav-link ${
                  location.pathname === "/playlist" ? "active" : ""
                }`}
                to="/playlist"
              >
                PlayList
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="btn btn-secondary github-btn"
            id="githubBtn"
          >
            <Link
              to="https://github.com/M-Saad-saif"
              target="_blanck"
              title="Owner's Github"
            >
              Github<i className="fa-brands fa-github mx-1"></i>
            </Link>
          </button>

          <div className="actions">
            {!localStorage.getItem("token") ? (
              ""
            ) : (
              <i
                title="UserProfile"
                className="ri-account-circle-fill fs-2 profile-icon"
                id="profile-icon"
                onClick={openProfileModal}
              ></i>
            )}

            <UserProfile
              showModal={showProfileModal}
              onClose={closeProfileModal}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
