import React, { useState, useEffect } from "react";
import TotalEmployees from "./TotalEmployees";
import EmployeesTable from "./EmployeesTable";
import axios_instance from "../../../libs/interseptor";
import apiUrls from "../../../libs/apiUrls";
import { useHistory } from "react-router-dom";

function ViewEmployees() {
  const [count, setCount] = useState({});
  const history = useHistory()

  useEffect(() => {
    const fetchEmployeeCount = async () => {
      try {
        const response = await axios_instance.get(apiUrls.EMPLOYEE_COUNT);
        setCount(response.data);
      } catch (error) {
        console.error("Failed to fetch employee count:", error);
      }
    };

    fetchEmployeeCount();
  }, []);
  
  return (
    <div className="ViewEmployees">
      <div className="flex justify-end my-4">
        <button           
          onClick={() => {
            history.push("/1/add-employee");
          }} 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Add Employee
        </button>
     </div>
      <div className="flex gap-3">
        <TotalEmployees title="Total Employees" count={count.total_employees} />
        <TotalEmployees title="Active Employees" count={count.active_employees} />
        <TotalEmployees title="Inactive Employees" count={count.inactive_employees} />
      </div>

      <div className="employee-table container-fluid">
        <EmployeesTable />
      </div>
    </div>
  );
}
export default ViewEmployees;
