import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "see-again-production.up.railway.app/api",
  withCredentials: true,
});

export default api;
