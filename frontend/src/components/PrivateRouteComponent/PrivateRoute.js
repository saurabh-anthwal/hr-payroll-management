import React from "react";
import Cookies from "js-cookie";
import { Redirect, Route } from "react-router-dom";
import Navbar from "../hr_admin_component/navbar/Navbar";

const getAuthToken = () => {
  return Cookies.get("access_token") || null; 
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = getAuthToken(); 
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
