import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
import App2 from "./App2.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Home from "./Home.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App2 />
    {/* <Home /> */}
  </StrictMode>
);
