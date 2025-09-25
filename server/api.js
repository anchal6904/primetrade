// api.js
import axios from "axios";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
  timeout: 10000,
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Global response handler: if 401 -> logout
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // clear storage and redirect to login
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // using history to force reload on router
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;
export { history };
