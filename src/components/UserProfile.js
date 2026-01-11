import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserProfile({ showModal, onClose }) {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("no token found");
        setUserDetails(null);
        return;
      }

      const response = await fetch("http://localhost:5000/api/auth/getuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      const data = await response.json();

      if (
        data.success ||
        data.user ||
        data.firstName ||
        data.lastName ||
        data.email
      ) {
        setUserDetails(data);
      } else {
        setUserDetails(null);
      }
    } catch (error) {
      //   console.error("Error fetching user:", error);
      setUserDetails(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      fetchUser();
    }
  }, [showModal]);

  if (!showModal) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    onClose();
  };

  return (
    <div className={`profile-modal-backdrop ${showModal ? "show" : ""}`}>
      <div className="profile-modal-content">
        <div className="profile-modal-header">
          <h5>
            <i className="fa-solid fa-user-circle me-2"></i>
            User Profile
          </h5>
          <button className="profile-modal-close" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="profile-modal-body">
          {loading ? (
            <div className="profile-loading">
              <div className="spinner"></div>
              <p className="text-danger">Loading profile...</p>
            </div>
          ) : userDetails ? (
            <div className="user-details">
              <div className="user-avatar">
                <i className="fa-solid fa-user fa-3x"></i>
              </div>
              <div className="user-info">
                <div className="info-row">
                  <span className="info-label">Username:</span>
                  <span className="info-value">
                    {userDetails.firstName} {userDetails.lastName}
                  </span>
                </div>

                <div className="info-row">
                  <span className="info-label">Email:</span>
                  <span className="info-value">
                    {userDetails.email || "Not available"}
                  </span>
                </div>

                <div className="info-row">
                  <span className="info-label">User ID:</span>
                  <span className="info-value truncated-id">
                    {userDetails._id || "Not available"}
                  </span>
                </div>

                <div className="info-row">
                  <span className="info-label">Songs Saved:</span>
                  <span className="info-value truncated-id">
                    {userDetails.songName?.length || 0}
                  </span>
                </div>

                <div className="info-row">
                  <span className="info-label">Joined:</span>
                  <span className="info-value">
                    {userDetails.date
                      ? new Date(userDetails.date).toLocaleDateString()
                      : "Not available"}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="profile-error">
              <i className="fa-solid fa-exclamation-triangle"></i>
              <p className="text-danger">Failed to load user details</p>
            </div>
          )}
        </div>

        <div className="profile-modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-danger">Delete Account</button>
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
