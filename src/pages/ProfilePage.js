// src/pages/ProfilePage.js
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getUserProfile } from "../api";  // Assuming your API function is imported
import "./Profile.css";

const ProfilePage = ({ token }) => {
  const [userData, setUserData] = useState(null);  // State to hold user data
  const [loading, setLoading] = useState(true);  // State to track loading status
  const [error, setError] = useState(null);  // State to handle errors

  useEffect(() => {
    if (token) {
      const fetchProfile = async () => {
        try {
          const profileData = await getUserProfile(token);  // Call API to fetch user profile
          setUserData(profileData);  // Store fetched user data in state
          setLoading(false);  // Set loading to false after data is fetched
        } catch (err) {
          setError(err.message);  // Set error if something goes wrong
          setLoading(false);
        }
      };

      fetchProfile();  // Trigger profile fetch on token change
    }
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;  // Show loading message while fetching data
  }

  if (error) {
    return <div>Error: {error}</div>;  // Show error message if fetching fails
  }

  if (!userData) {
    return <div>No user data found.</div>;  // Handle case when no data is available
  }

  return (
    <div className="profile-container">
      <Navbar />
      <div className="profile-card">
        <h2>Profile</h2>
        <div className="profile-info">
          <p><strong>Name:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          {/* You can add any other fields you need from userData here */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
