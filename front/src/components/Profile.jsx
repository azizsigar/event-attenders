import { useEffect, useState } from "react";
import axios from "../axios.jsx";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      console.log("Token:", token); // Check if token exists
      if (!token) {
        return; // Exit if no token
      }

      try {
        const response = await axios.get("/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("User data:", response.data); // Check the response
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setUser(null); // Clear user state
    navigate("/login"); // Redirect to login page after logout
  };
  

  if (!user) {
    return <p>No user data available</p>; // Show message if no user data
  }

  return (
    <div>
      <h2>Profile</h2>
      <button onClick={handleLogout}>Logout</button>{" "}
      {/* Change button text to Logout */}
      <p>
        <strong>_id: </strong>
        {user._id}
      </p>
      <p>
        <strong>Name: </strong>
        {user.name}
      </p>
      <p>
        <strong>Email: </strong>
        {user.email}
      </p>
      <p>
        <strong>Password (hashed): </strong>
        {user.password}
      </p>
      <p>
        <strong>Created At: </strong>
        {new Date(user.createdAt).toLocaleString()}
      </p>
    </div>
  );
}
