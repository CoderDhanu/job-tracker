import axios from "axios";

// Build API base from Vite env (set in .env.*)
// Fallback to localhost for development convenience
const API_BASE = (import.meta.env?.VITE_API_BASE_URL || "http://localhost:5000").replace(/\/+$/, "");

const API = axios.create({
  baseURL: `${API_BASE}/api/applications`,
});

export const fetchApplications = () => API.get("/");
export const createApplication = (data) => API.post("/", data);
export const updateApplication = (id, data) => API.put(`/${id}`, data);
export const deleteApplication = (id) => API.delete(`/${id}`);
