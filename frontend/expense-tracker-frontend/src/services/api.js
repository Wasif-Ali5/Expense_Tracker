import axios from "axios";

// If the environment variable exists (Vercel), use it.
// If not (Local Dev), use "/api" so the Vite Proxy handles it.
const baseURL = import.meta.env.VITE_API_URL || "/api";

const API = axios.create({
  baseURL: baseURL,
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;