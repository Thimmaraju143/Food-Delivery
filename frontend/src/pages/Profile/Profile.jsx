import React, { useState, useEffect, useContext } from "react";
import "./Profile.css";
import { StoreContext } from "../../context/storeContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { url, token } = useContext(StoreContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      console.log("No token found");
      navigate("/");
      return;
    }
    console.log("Token found:", token);
    fetchUserData();
  }, [token]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/user/data`, {
        headers: { token },
      });

      console.log("User data response:", response.data);

      if (response.data.success) {
        setUserData(response.data.data);
        setError("");
      } else {
        setError(response.data.message || "Failed to load user data");
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      console.error("Error details:", err.response?.data);
      setError(err.response?.data?.message || "Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="profile-container">
        <p>Please log in to view your profile</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="profile-container">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>User Profile</h1>
        {userData && (
          <div className="profile-details">
            <div className="profile-item">
              <label>Name:</label>
              <p>{userData.name}</p>
            </div>
            <div className="profile-item">
              <label>Email:</label>
              <p>{userData.email}</p>
            </div>
            <div className="profile-item">
              <label>User ID:</label>
              <p className="user-id">{userData._id}</p>
            </div>
          </div>
        )}
        <button className="back-button" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Profile;
