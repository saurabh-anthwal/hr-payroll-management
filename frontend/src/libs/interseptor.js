/* eslint-disable no-case-declarations */
import axios from "axios";
import * as utils from "./utils";

let axios_instance = axios.create();

// Helper function to retrieve token from localStorage
const getUserToken = () => {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  return storedUserData?.access_token || null;
};

// Helper function to retrieve full user data from localStorage
const getUserData = () => {
  return JSON.parse(localStorage.getItem("userData"));
};

// Axios request interceptor
axios_instance.interceptors.request.use(
  (configuration) => {
    const config = configuration;
    const token = getUserToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["ngrok-skip-browser-warning"] = "any";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Axios response interceptor
axios_instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const userData = getUserData();

    switch (error.response?.status) {
      case 401:
        utils.displayMessage("negative", "Unauthorized");
        clearLocalStorage(); // Clear tokens and other user data
        window.location.href = "/login";
        break;

      case 402:
        utils.displayMessage("negative", "Payment is required");
        if (userData && userData.type === "HR") {
          window.location.href = `/${userData.user_id}/payments`;
        }
        break;

      case 403:
        const err = { response: { data: "lock" } };
        return Promise.reject(err);

      case 404:
        if (!Array.isArray(error?.response?.data)) {
          return Promise.reject(error);
        } else {
          utils.displayMessage("negative", "Not Found");
          return Promise.reject(error);
        }

      case 500:
        utils.displayMessage("negative", "Server Error");
        break;

      default:
        const errorMessages = error.response?.data && Object.values(error.response.data)[0];
        const message = Array.isArray(errorMessages) ? errorMessages.join(", ") : errorMessages;
        message && utils.displayMessage("negative", message);
    }

    return Promise.reject(error);
  }
);

// Utility function to clear localStorage
const clearLocalStorage = () => {
  localStorage.removeItem("userData");
};

export default axios_instance;
