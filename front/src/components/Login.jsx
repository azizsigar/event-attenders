import { useState } from "react";
import axios from "../axios.jsx";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile.jsx";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/users/login", { email, password, });
      console.log("its a response from login: ",response)
      setMessage("Login successful");

      // Store token in local storage
      localStorage.setItem("token", response.data.token);

      // Navigate to the profile page
      navigate("/profile");
      <Profile/>
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="main">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {message && <p>{message}</p>}
      </form>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </div>
  );
}
