import axios from "axios";

const backendClient = axios.create({
  baseURL: "http://127.0.0.1:5000", // Your Flask API's base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default backendClient;
