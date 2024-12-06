import React, { useState } from "react";
import TabSwitch from "../../TabSwitch/TabSwitch";
import AddSalary from "../salary/AddSalary";
import AddEmployee from "./AddEmployee";
import UpdateEmployee from "./UpdateEmployee";

const EmployeeManager = () => {
  return (
    <div>
      <TabSwitch
        tabs={["Register Employee", "Update Employee"]}
        components={[<AddEmployee />, <UpdateEmployee />]}
      />
    </div>
  );
};

export default EmployeeManager;
