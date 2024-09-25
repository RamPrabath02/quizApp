// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App2 from "./App2.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <script src="http://172.16.10.179:8097"></script>
    <App2 />
  </Provider>
);
