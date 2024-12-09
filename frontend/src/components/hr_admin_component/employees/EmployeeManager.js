import React, { useState } from "react";
import TabSwitch from "../../TabSwitch/TabSwitch";
import AddSalary from "../salary/AddSalary";
import AddEmployee from "./AddEmployee";
import UpdateEmployee from "./UpdateEmployee";

const EmployeeManager = () => {
  return (
    <div>
      <TabSwitch
        tabs={["Register New User", "Update Employee",  "Update Manager"]}
        components={[<AddEmployee />, <UpdateEmployee emp_type="Employee" /> , <UpdateEmployee emp_type="Manager"/>]}
      />
    </div>
  );
};

export default EmployeeManager;
