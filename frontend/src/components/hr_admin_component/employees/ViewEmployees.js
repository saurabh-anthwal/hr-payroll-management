import React, { useState, useEffect } from "react";
import "./ViewEmployees.css";
import TotalEmployees from "./TotalEmployees";
import SearchEmployee from "./SearchEmployee";
import EmployeesTable from "./EmployeesTable";

function ViewEmployees() {
  const [count, setCount] = useState({});

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/employee-count/`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`, 
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => setCount(data))
      .catch((error) => console.error(error));
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
