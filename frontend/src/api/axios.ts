import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "https://see-again-production.up.railway.app/api",
  withCredentials: true,
});

export default api;
