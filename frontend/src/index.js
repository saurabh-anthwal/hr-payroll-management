import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AppWrapper from "./components/AppWrapper";
import { Provider } from 'react-redux';
import { store } from './store/store';

// Render the app wrapped with QueryClientProvider
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    {/* <AppWrapper> */}
      <App />
    {/* </AppWrapper> */}
  </Provider>,
);

// Report web vitals (optional)
reportWebVitals();
