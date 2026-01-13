import React, { useState } from "react";
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



// import React, { useState, useEffect } from "react";
// import logo from "./Images/logo1.png";
// import MusicImg from "./Images/music img.png";
// import { Link, useLocation } from "react-router-dom";
// import UserProfile from "./UserProfile";

// export default function Navbar() {
//   const location = useLocation();
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   // Check if device is mobile
//   useEffect(() => {
//     const checkIfMobile = () => {
//       setIsMobile(window.innerWidth <= 992); // Bootstrap's lg breakpoint
//     };

//     // Initial check
//     checkIfMobile();

//     // Add event listener
//     window.addEventListener("resize", checkIfMobile);

//     // Cleanup
//     return () => window.removeEventListener("resize", checkIfMobile);
//   }, []);

//   const openProfileModal = () => {
//     setShowProfileModal(true);
//     closeMobileMenu(); // Close mobile menu when opening profile
//   };

//   const closeProfileModal = () => {
//     setShowProfileModal(false);
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   // Close mobile menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isMobileMenuOpen && !event.target.closest(".mobile-menu-container") && 
//           !event.target.closest(".navbar-toggler")) {
//         closeMobileMenu();
//       }
//     };

//     if (isMobileMenuOpen) {
//       document.addEventListener("click", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, [isMobileMenuOpen]);

//   // Prevent body scroll when mobile menu is open
//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }

//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isMobileMenuOpen]);

//   return (
//     <>
//       <nav className="navbar navbar-expand-lg">
//         <div className="container-fluid">
//           <Link className="navbar-brand" to="/" onClick={closeMobileMenu}>
//             <img
//               src={MusicImg}
//               alt="Music Icon"
//               style={{
//                 width: "40px",
//                 padding: "0",
//                 margin: "0 2px",
//                 height: "34px",
//               }}
//             />
//             <img
//               src={logo}
//               alt="Logo"
//               style={{
//                 width: "60px",
//                 padding: "0",
//                 margin: "0 0px",
//                 height: "34px",
//               }}
//             />
//           </Link>

//           {/* Mobile menu toggle button */}
//           <button
//             className="navbar-toggler"
//             type="button"
//             onClick={toggleMobileMenu}
//             aria-label="Toggle navigation"
//           >
//             {isMobileMenuOpen ? (
//               <span className="close-icon">✕</span>
//             ) : (
//               <span className="navbar-toggler-icon"></span>
//             )}
//           </button>

//           {/* Desktop Navigation */}
//           <div className="collapse navbar-collapse" id="navbarSupportedContent">
//             <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
//               <li className="nav-item" id="homelink">
//                 <Link
//                   title="Home"
//                   className={`nav-link ${
//                     location.pathname === "/" ? "active" : ""
//                   } mx-3`}
//                   aria-current="page"
//                   to="/"
//                 >
//                   Home
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link
//                   title="Playlist"
//                   className={`nav-link ${
//                     location.pathname === "/playlist" ? "active" : ""
//                   }`}
//                   to="/playlist"
//                 >
//                   PlayList
//                 </Link>
//               </li>
//             </ul>
            
//             <button
//               type="button"
//               className="btn btn-secondary github-btn"
//               id="githubBtn"
//             >
//               <Link
//                 to="https://github.com/M-Saad-saif"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 title="Owner's Github"
//               >
//                 Github<i className="fa-brands fa-github mx-1"></i>
//               </Link>
//             </button>

//             <div className="actions">
//               {!localStorage.getItem("token") ? (
//                 ""
//               ) : (
//                 <i
//                   title="UserProfile"
//                   className="ri-account-circle-fill fs-2 profile-icon"
//                   id="profile-icon"
//                   onClick={openProfileModal}
//                 ></i>
//               )}

//               <UserProfile
//                 showModal={showProfileModal}
//                 onClose={closeProfileModal}
//               />
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Side Menu - Only visible on mobile */}
//       {isMobile && (
//         <div className={`mobile-menu-container ${isMobileMenuOpen ? "open" : ""}`}>
//           {/* Backdrop with blur effect */}
//           <div 
//             className={`mobile-menu-backdrop ${isMobileMenuOpen ? "show" : ""}`}
//             onClick={closeMobileMenu}
//           ></div>
          
//           {/* Side menu content */}
//           <div className="mobile-menu-content">
//             <div className="mobile-menu-header">
//               <Link className="navbar-brand" to="/" onClick={closeMobileMenu}>
//                 <img
//                   src={MusicImg}
//                   alt="Music Icon"
//                   className="mobile-logo-img"
//                 />
//                 <img
//                   src={logo}
//                   alt="Logo"
//                   className="mobile-logo-text"
//                 />
//               </Link>
//               <button 
//                 className="mobile-menu-close"
//                 onClick={closeMobileMenu}
//                 aria-label="Close menu"
//               >
//                 ✕
//               </button>
//             </div>

//             <div className="mobile-menu-body">
//               <ul className="mobile-nav-list">
//                 <li className="mobile-nav-item">
//                   <Link
//                     title="Home"
//                     className={`mobile-nav-link ${
//                       location.pathname === "/" ? "active" : ""
//                     }`}
//                     to="/"
//                     onClick={closeMobileMenu}
//                   >
//                     <i className="fa-solid fa-home me-2"></i>
//                     Home
//                   </Link>
//                 </li>
//                 <li className="mobile-nav-item">
//                   <Link
//                     title="Playlist"
//                     className={`mobile-nav-link ${
//                       location.pathname === "/playlist" ? "active" : ""
//                     }`}
//                     to="/playlist"
//                     onClick={closeMobileMenu}
//                   >
//                     <i className="fa-solid fa-music me-2"></i>
//                     PlayList
//                   </Link>
//                 </li>
//                 <li className="mobile-nav-item">
//                   <a
//                     href="https://github.com/M-Saad-saif"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="mobile-nav-link"
//                     onClick={closeMobileMenu}
//                   >
//                     <i className="fa-brands fa-github me-2"></i>
//                     GitHub
//                   </a>
//                 </li>
//                 {localStorage.getItem("token") && (
//                   <li className="mobile-nav-item">
//                     <button
//                       className="mobile-nav-link mobile-profile-btn"
//                       onClick={() => {
//                         openProfileModal();
//                         closeMobileMenu();
//                       }}
//                     >
//                       <i className="ri-account-circle-fill me-2"></i>
//                       Profile
//                     </button>
//                   </li>
//                 )}
//               </ul>
//             </div>

//             <div className="mobile-menu-footer">
//               {!localStorage.getItem("token") ? (
//                 <div className="mobile-auth-buttons">
//                   <Link
//                     to="/login"
//                     className="btn btn-primary btn-sm"
//                     onClick={closeMobileMenu}
//                   >
//                     Login
//                   </Link>
//                   <Link
//                     to="/signup"
//                     className="btn btn-outline-primary btn-sm"
//                     onClick={closeMobileMenu}
//                   >
//                     Sign Up
//                   </Link>
//                 </div>
//               ) : (
//                 <button
//                   className="btn btn-outline-danger btn-sm"
//                   onClick={() => {
//                     localStorage.removeItem("token");
//                     window.location.reload();
//                     closeMobileMenu();
//                   }}
//                 >
//                   <i className="fa-solid fa-right-from-bracket me-2"></i>
//                   Logout
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       <style jsx="true">{`
//         /* Mobile Menu Styles */
//         .mobile-menu-container {
//           display: none;
//         }

//         @media (max-width: 992px) {
//           .mobile-menu-container {
//             display: block;
//             position: fixed;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             z-index: 1050;
//             pointer-events: none;
//           }

//           .mobile-menu-backdrop {
//             position: fixed;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             background: rgba(0, 0, 0, 0.5);
//             backdrop-filter: blur(8px);
//             -webkit-backdrop-filter: blur(8px);
//             opacity: 0;
//             transition: opacity 0.3s ease;
//             pointer-events: none;
//           }

//           .mobile-menu-backdrop.show {
//             opacity: 1;
//             pointer-events: all;
//           }

//           .mobile-menu-content {
//             position: fixed;
//             top: 0;
//             right: -100%;
//             width: 80%;
//             max-width: 320px;
//             height: 100%;
//             background: white;
//             box-shadow: -5px 0 25px rgba(0, 0, 0, 0.1);
//             transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
//             display: flex;
//             flex-direction: column;
//             pointer-events: all;
//             z-index: 1051;
//           }

//           .mobile-menu-container.open .mobile-menu-content {
//             right: 0;
//           }

//           .mobile-menu-header {
//             display: flex;
//             align-items: center;
//             justify-content: space-between;
//             padding: 1rem;
//             border-bottom: 1px solid #eee;
//             background: #f8f9fa;
//           }

//           .mobile-menu-header .navbar-brand {
//             display: flex;
//             align-items: center;
//             margin: 0;
//           }

//           .mobile-logo-img {
//             width: 35px;
//             height: 30px;
//             margin-right: 8px;
//           }

//           .mobile-logo-text {
//             width: 50px;
//             height: 28px;
//           }

//           .mobile-menu-close {
//             background: none;
//             border: none;
//             font-size: 1.8rem;
//             color: #6c757d;
//             cursor: pointer;
//             padding: 0.25rem;
//             line-height: 1;
//             transition: color 0.2s;
//           }

//           .mobile-menu-close:hover {
//             color: #343a40;
//           }

//           .mobile-menu-body {
//             flex: 1;
//             padding: 1rem 0;
//             overflow-y: auto;
//           }

//           .mobile-nav-list {
//             list-style: none;
//             padding: 0;
//             margin: 0;
//           }

//           .mobile-nav-item {
//             margin: 0;
//           }

//           .mobile-nav-link {
//             display: flex;
//             align-items: center;
//             padding: 1rem 1.5rem;
//             color: #333;
//             text-decoration: none;
//             font-size: 1.1rem;
//             transition: all 0.2s;
//             border-left: 4px solid transparent;
//             background: none;
//             border: none;
//             width: 100%;
//             text-align: left;
//             cursor: pointer;
//           }

//           .mobile-nav-link:hover,
//           .mobile-nav-link.active {
//             background: #f8f9fa;
//             color: #0d6efd;
//             border-left-color: #0d6efd;
//           }

//           .mobile-nav-link i {
//             font-size: 1.2rem;
//             width: 24px;
//             text-align: center;
//           }

//           .mobile-profile-btn {
//             color: #6c757d;
//           }

//           .mobile-profile-btn:hover {
//             color: #0d6efd;
//           }

//           .mobile-menu-footer {
//             padding: 1rem;
//             border-top: 1px solid #eee;
//             background: #f8f9fa;
//           }

//           .mobile-auth-buttons {
//             display: flex;
//             gap: 0.5rem;
//           }

//           .mobile-auth-buttons .btn {
//             flex: 1;
//           }

//           /* Close icon for toggler */
//           .close-icon {
//             display: inline-block;
//             font-size: 1.5rem;
//             line-height: 1;
//             color: #6c757d;
//           }

//           /* Hide desktop navigation on mobile */
//           .navbar-collapse {
//             display: none !important;
//           }

//           .navbar-collapse.show {
//             display: flex !important;
//           }

//           /* Adjust original navbar for mobile */
//           .navbar {
//             padding: 0.5rem 1rem;
//           }

//           .navbar-toggler {
//             border: none;
//             padding: 0.25rem;
//             font-size: 1.25rem;
//           }

//           .navbar-toggler:focus {
//             box-shadow: none;
//           }
//         }

//         @media (min-width: 993px) {
//           .mobile-menu-container {
//             display: none !important;
//           }
          
//           .navbar-collapse {
//             display: flex !important;
//           }
//         }

//         /* Smooth transitions */
//         * {
//           transition: background-color 0.2s ease;
//         }

//         /* Improve accessibility */
//         .mobile-nav-link:focus-visible,
//         .mobile-menu-close:focus-visible {
//           outline: 2px solid #0d6efd;
//           outline-offset: 2px;
//         }
//       `}</style>
//     </>
//   );
// }  