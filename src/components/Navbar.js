import React, { useState, useEffect } from "react";
import logo from "./Images/logo1.png";
import MusicImg from "./Images/music img.png";
import { Link, useLocation } from "react-router-dom";
import UserProfile from "./UserProfile";

export default function Navbar() {
  const location = useLocation();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 992);
    };

    checkIfMobile();

    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const openProfileModal = () => {
    setShowProfileModal(true);
    closeMobileMenu();
  };

  const closeProfileModal = () => {
    setShowProfileModal(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        !event.target.closest(".mobile-menu-container") &&
        !event.target.closest(".navbar-toggler")
      ) {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" onClick={closeMobileMenu}>
            <img
              src={MusicImg}
              alt="Music Icon"
              style={{
                width: "40px",
                padding: "0",
                margin: "0 2px",
                height: "34px",
              }}
            />
            <img
              src={logo}
              alt="Logo"
              style={{
                width: "60px",
                padding: "0",
                margin: "0 0px",
                height: "34px",
              }}
            />
          </Link>

          {/* Mobile menu toggle button */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation"
          >
            {isMobileMenuOpen ? (
              <span className="close-icon">✕</span>
            ) : (
              <span className="navbar-toggler-icon"></span>
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item" id="homelink">
                <Link
                  title="Home"
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
                target="_blank"
                rel="noopener noreferrer"
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

            </div>
          </div>
        </div>
      </nav>
              <UserProfile
                showModal={showProfileModal}
                onClose={closeProfileModal}
              />

      {/*============================== Mobile Side Menu - Only visible on mobile============================== */}
      {isMobile && (
        <div
          className={`mobile-menu-container ${isMobileMenuOpen ? "open" : ""}`}
        >
          {/* Backdrop with blur effect */}
          <div
            className={`mobile-menu-backdrop ${isMobileMenuOpen ? "show" : ""}`}
            onClick={closeMobileMenu}
          ></div>

          {/* Side menu content */}
          <div className="mobile-menu-content">
            <div className="mobile-menu-header">
              <Link className="navbar-brand" to="/" onClick={closeMobileMenu}>
                <img
                  src={MusicImg}
                  alt="Music Icon"
                  className="mobile-logo-img"
                />
                <img src={logo} alt="Logo" className="mobile-logo-text" />
              </Link>
              <button
                className="mobile-menu-close"
                onClick={closeMobileMenu}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <div className="mobile-menu-body">
              <ul className="mobile-nav-list">
                <li className="mobile-nav-item">
                  <Link
                    title="Home"
                    className={`mobile-nav-link ${
                      location.pathname === "/" ? "active" : ""
                    }`}
                    to="/"
                    onClick={closeMobileMenu}
                  >
                    <i className="fa-solid fa-home me-2"></i>
                    Home
                  </Link>
                </li>
                <li className="mobile-nav-item">
                  <Link
                    title="Playlist"
                    className={`mobile-nav-link ${
                      location.pathname === "/playlist" ? "active" : ""
                    }`}
                    to="/playlist"
                    onClick={closeMobileMenu}
                  >
                    <i className="fa-solid fa-music me-2"></i>
                    PlayList
                  </Link>
                </li>
                <li className="mobile-nav-item">
                  <a
                    href="https://github.com/M-Saad-saif"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mobile-nav-link"
                    onClick={closeMobileMenu}
                  >
                    <i className="fa-brands fa-github me-2"></i>
                    GitHub
                  </a>
                </li>
                {localStorage.getItem("token") && (
                  <li className="mobile-nav-item">
                    <button
                      className="mobile-nav-link mobile-profile-btn"
                      onClick={() => {
                        openProfileModal();
                        closeMobileMenu();
                      }}
                    >
                      <i className="ri-account-circle-fill me-2"></i>
                      Profile
                    </button>
                  </li>
                )}
              </ul>
            </div>

            <div className="mobile-menu-footer">
              {!localStorage.getItem("token") ? (
                <div className="mobile-auth-buttons">
                  <Link
                    to="/login"
                    className="btn btn-primary btn-sm"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="btn btn-outline-primary btn-sm"
                    onClick={closeMobileMenu}
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.reload();
                    closeMobileMenu();
                  }}
                >
                  <i className="fa-solid fa-right-from-bracket me-2 text-danger"></i>
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
