import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar"; // Ensure correct import path
import Footer from "../components/Footer"; // Ensure correct import path
import "./Login.css";

const Login = ({ loginUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });

    try {
      const response = await axios.post("http://localhost:8000/api/login/", { // Update URL if needed
        email: email,
        password: password,
      });

      if (response.status === 200) {
        alert("Login successful!");
        // Store the token using the loginUser function passed down as a prop
        loginUser(response.data.token); // Pass the token to the parent component
        // Optionally, redirect the user or store the token in local storage
        localStorage.setItem("authToken", response.data.token);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred while logging in.");
    }
  };

  return (
    <div className="login-container">
      {/* Include Navbar here */}
      <Navbar />

      <div className="login-form">
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleLogin}>
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
          <button type="submit">Login</button>
        </form>
      </div>

      {/* Include Footer here */}
      <Footer />
    </div>
  );
};

export default Login;