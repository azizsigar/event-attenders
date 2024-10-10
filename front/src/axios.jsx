import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:7890", // Replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
