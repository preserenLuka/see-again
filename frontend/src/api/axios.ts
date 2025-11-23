import axios from "axios";


const devUrl = "http://localhost:5000/api";
// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_DOMAIN_NAME || devUrl,
  withCredentials: true,
});

export default api;