import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "jquery"; // Ensure jQuery is loaded first
import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/style.scss";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Make jQuery globally available for Owl Carousel
import $ from "jquery";
window.$ = window.jQuery = $;
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || "1066221106622-k0ph7f03hrqr1t178svt7j56qcm2ri8h.apps.googleusercontent.com";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <App />
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
