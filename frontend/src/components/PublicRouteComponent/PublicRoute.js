import React from "react";
import { Redirect, Route } from "react-router-dom";

const PublicRoute = ({ component: Component, restricted = false, ...rest }) => {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  const token = storedUserData?.access_token;

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
