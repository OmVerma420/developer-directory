import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5000", // ← CHANGE ON PRODUCTION
});

// API Calls
export const createDeveloper = (data) => API.post("/developers", data);
export const getDevelopers = () => API.get("/developers");
