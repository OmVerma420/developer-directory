// src/api/axios.js
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // e.g., http://localhost:5000/api
  withCredentials: true, // send cookies for protected backend routes
});

// Attach JWT token (if available) to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Global error handling
api.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status;

    // Handle unauthorized access globally
    if (status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      // Avoid infinite redirect loop
      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
