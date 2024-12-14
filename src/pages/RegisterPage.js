import React, { useState } from "react";
import Navbar from "../components/Navbar";  // Ensure correct import
import Footer from "../components/Footer";  // Ensure correct import
import { registerUser } from "../api";  // import the register API function
import "./Register.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setconfirm_password] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirm_password) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Call the register API function
      await registerUser(username, email, password, confirm_password);
      alert("Registration Successful!");
      setUsername("");
      setEmail("");
      setPassword("");
      setconfirm_password("");
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="register-container">
      {/* Navbar */}
      <Navbar />

      <div className="register-form">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirm_password">Confirm Password</label>
            <input
              type="password"
              id="confirm_password"
              value={confirm_password}
              onChange={(e) => setconfirm_password(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RegisterPage;
