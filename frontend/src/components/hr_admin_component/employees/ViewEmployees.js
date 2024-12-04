import React, { useState, useEffect } from "react";
import "./ViewEmployees.css";
import TotalEmployees from "./TotalEmployees";
import SearchEmployee from "./SearchEmployee";
import EmployeesTable from "./EmployeesTable";
import axios_instance from "../../../libs/interseptor";
import apiUrls from "../../../libs/apiUrls";

function ViewEmployees() {
  const [count, setCount] = useState({});

  useEffect(async() => {
    try {
      const response = await axios_instance.get(apiUrls.EMPLOYEE_COUNT);
      setCount(response.data);
    } catch (error) {
      console.error("Failed to fetch salary details:", error);
    }
  }, []);
  
  return (
    <div className="ViewEmployees">
      <div className="employee-count-container">
        <TotalEmployees title="Total Employees" count={count.total_employees} />
        <TotalEmployees title="Active Employees" count={count.active_employees} />
        <TotalEmployees title="Inactive Employees" count={count.inactive_employees} />
      </div>
      <div className="employee-search container">
        <SearchEmployee />
      </div>
      <div className="employee-table container-fluid">
        <EmployeesTable />
      </div>
    </div>
  );
}
export default ViewEmployees;
