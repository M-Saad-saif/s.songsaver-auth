import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import SongsState from "./Context/Songs/SongsState";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SongsState>
      <App />
    </SongsState>
  </React.StrictMode>
);

reportWebVitals();
