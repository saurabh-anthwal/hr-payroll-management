import React from "react";
import { Redirect, Route } from "react-router-dom";
import Cookies from "js-cookie";

const PublicRoute = ({ component: Component, restricted = false, ...rest }) => {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  const token = Cookies.get("access_token");

  return (
    <Route
      {...rest}
      render={(props) =>
        token && restricted ? (
          <Redirect to="/1/dashboard" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
