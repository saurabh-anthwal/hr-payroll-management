import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "../components/hr_admin_component/navbar/Navbar";
import Home from "../components/hr_admin_component/home/Home";
import AddEmployee from "../components/hr_admin_component/employees/AddEmployee";
import ViewEmployees from "../components/hr_admin_component/employees/ViewEmployees";
import UpdateEmployee from "../components/hr_admin_component/employees/UpdateEmployee";
import Salary from "../components/hr_admin_component/salary/Salary";
import AdminPanel from "../components/hr_admin_component/adminPanel/AdminPanel";
import Dashboard from "../components/employee_component/dashboard/Dashboard";
import Login, { Logout } from "../components/hr_admin_component/accounts/login/Login";
import Register from "../components/hr_admin_component/accounts/register/Register";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/admin-panel">
          <Navbar />
          <AdminPanel />
        </Route>
        <Route path="/salary">
          <Navbar />
          <Salary />
        </Route>
        <Route path="/update-employee">
          <Navbar />
          <UpdateEmployee />
        </Route>
        <Route path="/view-employees">
          <Navbar />
          <ViewEmployees />
        </Route>
        <Route path="/add-employee">
          <Navbar />
          <AddEmployee />
        </Route>
        <Route path="/home">
          <Navbar />
          <Home />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/employee-dashboard">
          <Dashboard />
        </Route>
        {/* 404 Catch-all Route */}
        <Route path="*">
          <div>
            <h1>404 - Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
