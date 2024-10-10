import { useEffect, useState } from "react";
import axios from "../axios.jsx";
import { useNavigate } from "react-router-dom";
import Login from "./Login.jsx";
import { Link } from "react-router-dom";  

export default function Profile() {
  const [user, setUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null); // State for avatar URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      try {
        const response = await axios.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("API Response:", response); // Check the complete API response

        // Assuming response.data contains the user data
        const userData = response.data;
        setUser(userData);
        console.log("userdata is :::",userData); // Check the user data

        // Generate avatar URL using email as seed
        const avatar = `https://api.dicebear.com/6.x/croodles/svg?seed=${userData.email}`;
        setAvatarUrl(avatar); // Set the avatar URL
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  if (!user) {
    return (<Login/>)
  }

  return (
    <div className="main">
      <h2>Profile</h2>
      <button onClick={handleLogout}>Logout</button>
      {avatarUrl && (
        <img
          src={avatarUrl}
          alt="Avatar"
          style={{ width: "10rem", height: "10rem" }}
        />
      )}
      <p>
        <strong>_id: </strong>
        {user._id ? user._id : "User ID not available"}{" "}
        {/* Check if _id is available */}
      </p>
      <p>
        <strong>Name: </strong>
        {user.name ? user.name : "Name not available"}{" "}
        {/* Check if name is available */}
      </p>
      <p>
        <strong>Email: </strong>
        {user.email ? user.email : "Email not available"}{" "}
        {/* Check if email is available */}
      </p>
      <Link to="/">Create</Link>
      <Link to="/getall">Items</Link>
    </div>
  );
}
