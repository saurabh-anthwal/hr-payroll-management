import React, { useState, useEffect } from "react";
import TotalEmployees from "./TotalEmployees";
import SearchEmployee from "./SearchEmployee";
import EmployeesTable from "./EmployeesTable";
import axios_instance from "../../../libs/interseptor";
import apiUrls from "../../../libs/apiUrls";
import AddEmployee from "./AddEmployee";

function ViewEmployees() {
  const [count, setCount] = useState({});
  const [addEmp, setAddEmp] = useState(false);

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

     <div className="flex justify-end my-4">
     <button onClick={()=>{setAddEmp(!addEmp)}} className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
        Add Employee
      </button>
     </div>
      {addEmp &&
        <AddEmployee/>
      }
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
