import React from "react";
import Cookies from "js-cookie";
import { Redirect, Route } from "react-router-dom";
import Navbar from "../hr_admin_component/navbar/Navbar";

const getAuthToken = () => {
  return Cookies.get("access_token") || null; 
};

export const HrPrivateRoute = ({ component: Component, ...rest }) => {
  const token = getAuthToken(); 
  const userType = Cookies.get("userType");
  return (
    <Route
      {...rest}
      render={(props) =>
        token && userType !=="employ" ? (
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


export const EmployPrivateRoute = ({ component: Component, ...rest }) => {
  const token = getAuthToken(); 
  const userType = Cookies.get("userType");
  return (
    <Route
      {...rest}
      render={(props) =>
        token &&  userType==='employ' ? (
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

