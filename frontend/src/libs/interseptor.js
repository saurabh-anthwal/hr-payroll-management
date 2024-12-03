/* eslint-disable no-case-declarations */
import axios from "axios";
import cookie from "react-cookies";
import * as utils from "./utils";

let axios_instance = axios.create();

axios_instance.interceptors.request.use(
  (configuration) => {
    const config = configuration;
    const authToken = cookie.load("authToken");
    if (authToken) {
      // config.headers.Authorization = `Token ${authToken}`;
      config.headers.Authorization = `Bearer ${authToken}`;
      config.headers["ngrok-skip-browser-warning"] = "any";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios_instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    switch (error.response.status) {
      case 401:
        utils.displayMessage("negative", "Unauthorized");
        utils.clearCookie();
        window.location.href = "/login";
        break;

      case 402:
        utils.displayMessage("negative", "Payment is required");
        const user = cookie.load("business_user");
        window.location.href = `/${user.business}/payments`;
        break;

      case 403:
        // utils.displayMessage("negative", "Unauthorized");
        const err = { response: { data: "lock" } };
        return Promise.reject(err);

      case 404:
        if (!Array.isArray(error?.response?.data)) {
          // return Promise.reject(error);
          return Promise.reject(error);
        } else {
          utils.displayMessage("negative", "Not Found");
          return Promise.reject(error);
        }

      case 500:
        utils.displayMessage("negative", "Server Error");
        break;

      default:
        const errorMessages = error.response && error.response.data && Object.values(error.response.data)[0];
        const message = Array.isArray(errorMessages) ? errorMessages : errorMessages;
        message && utils.displayMessage("negative", message);
    }

    return Promise.reject(error);
  }
);

export default axios_instance;
