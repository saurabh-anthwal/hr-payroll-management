import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AppWrapper from "./components/AppWrapper";

// Render the app wrapped with QueryClientProvider
ReactDOM.render(
  <React.StrictMode>
    <AppWrapper>
      <App />
    </AppWrapper>
  </React.StrictMode>,
  document.getElementById("root")
);

// Report web vitals (optional)
reportWebVitals();
