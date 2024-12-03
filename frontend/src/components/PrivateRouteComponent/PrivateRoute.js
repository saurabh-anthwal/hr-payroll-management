import React from "react";
import { Redirect, Route } from "react-router-dom";
import Navbar from "../hr_admin_component/navbar/Navbar";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  const token = storedUserData?.access_token

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <>
            <Navbar />
            <Component {...props} />
          </>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
