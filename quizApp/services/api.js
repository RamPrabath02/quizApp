import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // Your Flask API's base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
