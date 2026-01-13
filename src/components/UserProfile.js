import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import songContext from "../Context/Songs/songContext";

export default function UserProfile({ showModal, onClose }) {
  const navigate = useNavigate();
  const { songs } = useContext(songContext); //take this context for the song counts in profile

  // ======================= States =========================
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadMessageType, setUploadMessageType] = useState("");

  // ======================= Fetching user =========================
  const fetchUser = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      // if no token found retun
      if (!token) {
        // console.log("no token found");
        setUserDetails(null);
        return;
      }
      // fetchong user detail
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

    // Listen for song add/delete events to refresh user details
    const handleSongChange = () => {
      fetchUser();
    };

    window.addEventListener("songAdded", handleSongChange);
    window.addEventListener("songDeleted", handleSongChange);

    return () => {
      window.removeEventListener("songAdded", handleSongChange);
      window.removeEventListener("songDeleted", handleSongChange);
    };
  }, [showModal]);

  // ======================= Profile Pic Upload =========================
  const handleProfilePicUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setUploadMessageType("error");
      setUploadMessage(
        "Please upload a valid image file (JPEG, PNG, GIF, WebP)"
      );
      setTimeout(() => setUploadMessage(""), 3000);
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadMessageType("error");
      setUploadMessage("File size must be less than 5MB");
      setTimeout(() => setUploadMessage(""), 3000);
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("profilepic", file);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5000/api/auth/uploadProfilePic",
        {
          method: "POST",
          headers: {
            "auth-token": token,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        setUploadMessageType("success");
        setUploadMessage("Profile picture updated successfully!");
        setUserDetails(data.user);
        setTimeout(() => setUploadMessage(""), 3000);
      } else {
        setUploadMessageType("error");
        setUploadMessage(data.error || "Failed to upload profile picture");
        setTimeout(() => setUploadMessage(""), 3000);
      }
    } catch (error) {
      // console.error("Upload error:", error);
      setUploadMessageType("error");
      setUploadMessage("Error uploading file. Please try again.");
      setTimeout(() => setUploadMessage(""), 3000);
    } finally {
      setUploading(false);
      // Reset file input
      e.target.value = "";
    }
  };

  if (!showModal) return null;

  // ======================= logout user =========================
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    setUserDetails(null);
    onClose();
  };

  // ======================= deleteUser user =========================
  const handleDelete = async () => {
    const confirmdelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmdelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5000/api/auth/deleteuser",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );
      const json = await response.json();
      // console.log(json);

      if (
        json.success ||
        response.ok ||
        json.message === "User deleted successfully"
      ) {
        localStorage.removeItem("token");
        navigate("/");
        setUserDetails(null);
        onClose();
      } else {
        alert(json.error || "Failed to delete account");
      }
    } catch (error) {
      console.error("delete error", error);
      console.log("error in deletting account");
    }
  };

  // ======================= Fetching  =========================
  return (
    <div className={`profile-modal-backdrop ${showModal ? "show" : ""}`}>
      <div className="profile-modal-content">
        <div className="profile-modal-header">
          <h5>
            <i className="fa-solid fa-user-circle me-2"></i>
            Profile Details
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
                {userDetails.profilepic &&
                userDetails.profilepic !== "../uploads/defaultprofile.png" ? (
                  <img
                    src={`http://localhost:5000${userDetails.profilepic}`}
                    alt="Profile"
                    className="profile-image"
                    style={{
                      width: "100px",
                      height: "75px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <i className="fa-solid fa-user fa-3x"></i>
                )}
              </div>

              <div className="profile-upload-section">
                <label htmlFor="profilePicInput" className="upload-label">
                  <input
                    id="profilePicInput"
                    type="file"
                    name="profilepic"
                    className="file-input"
                    onChange={handleProfilePicUpload}
                    disabled={uploading}
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                  <button
                    className="btn btn-info btn-sm"
                    disabled={uploading}
                    type="button"
                    onClick={() =>
                      document.getElementById("profilePicInput").click()
                    }
                  >
                    {uploading ? "Uploading..." : "Choose Profile Picture"}
                  </button>
                </label>
                {uploadMessage && (
                  <p
                    className={
                      uploadMessageType === "success"
                        ? "text-success"
                        : "text-danger"
                    }
                    style={{ marginTop: "10px", fontSize: "0.9em" }}
                  >
                    {uploadMessage}
                  </p>
                )}
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
                    {songs.length}
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
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete Account
          </button>
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
