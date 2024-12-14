// src/api.js
export const registerUser = async (username, email, password, confirm_password) => {
    const response = await fetch("http://localhost:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password, confirm_password }),
    });
  
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Failed to register.");
    }
  
    return await response.json();
  };


export const getUserProfile = async (token) => {
  const response = await fetch("http://localhost:8000/api/profile/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`,  // Pass the token in the Authorization header
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Failed to fetch profile.");
  }

  return await response.json();  // Return the user's profile data
};
