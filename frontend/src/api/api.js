import axios from "axios";

export const API = axios.create({
  baseURL: "https://developer-directory-blue.vercel.app/", // ← CHANGE ON PRODUCTION
});

// API Calls
export const createDeveloper = (data) => API.post("/developers", data);
export const getDevelopers = () => API.get("/developers");
