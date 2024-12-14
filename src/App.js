// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
 // Optional: You can add a home page

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || null); // Check if the token exists in localStorage

  const loginUser = (userToken) => {
    setToken(userToken);
    localStorage.setItem("token", userToken); // Save the token to localStorage
  };

  const logoutUser = () => {
    setToken(null);
    localStorage.removeItem("token"); // Remove the token from localStorage
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LoginPage loginUser={loginUser} />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/profile"
          element={<ProfilePage token={token} logoutUser={logoutUser} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
