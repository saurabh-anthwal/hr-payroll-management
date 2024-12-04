import React, { useState, useEffect } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";

import axios_instance from "../../../libs/interseptor";
import apiUrls from "../../../libs/apiUrls";
import SalarySearch from "./SalarySearch";

function EmployeesSalaryDetails() {
  const [employeesData, setEmployeesData] = useState([]);

  const fetchEmployeesSalaryDetails = async () => {
    try {
      const response = await axios_instance.get(apiUrls.ALL_EMPLOYEE_SALARY_DETAILS);
      setEmployeesData(response.data);
    } catch (error) {
      console.error("Error fetching employees' salary details:", error);
    }
  };

  useEffect(() => {
    fetchEmployeesSalaryDetails();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Employees Salary</h1>
        <SalarySearch setEmployeesData={setEmployeesData} />
        {/* Responsive Table */}
        <div className="overflow-x-auto">
        <table className="w-full text-sm text-center text-gray-500 border border-gray-200 mt-6">
  <thead className="text-xs uppercase bg-gray-200 text-gray-700">
    <tr>
      <th className="py-3 px-2 w-[8%]">E_ID</th>
      <th className="py-3 px-2 w-[8%]">PPA</th>
      <th className="py-3 px-2 w-[10%]">Salary</th>
      <th className="py-3 px-2 w-[8%]">DA</th>
      <th className="py-3 px-2 w-[8%]">HRA</th>
      <th className="py-3 px-2 w-[10%]">Conveyance</th>
      <th className="py-3 px-2 w-[8%]">PF</th>
      <th className="py-3 px-2 w-[8%]">ESIC</th>
      <th className="py-3 px-2 w-[16%]">Professional Tax</th>
      <th className="py-3 px-2 w-[12%]">Net Salary</th>
      <th className="py-3 px-2 w-[10%]">Actions</th>
    </tr>
  </thead>
  <tbody>
    {employeesData.length > 0 ? (
      employeesData.map((employee, index) => (
        <tr key={employee.id} className="border-b border-gray-200">
          <td className="py-3 px-2">{employee.employee}</td>
          <td className="py-3 px-2">{employee.ppa}</td>
          <td className="py-3 px-2">{employee.monthly_salary}</td>
          <td className="py-3 px-2">{employee.basic_da}</td>
          <td className="py-3 px-2">{employee.hra}</td>
          <td className="py-3 px-2">{employee.conveyance}</td>
          <td className="py-3 px-2">{employee.pf}</td>
          <td className="py-3 px-2">{employee.esic}</td>
          <td className="py-3 px-2">{employee.professional_tax}</td>
          <td className="py-3 px-2">{employee.net_salary}</td>
          <td className="py-3 px-2 flex gap-2 justify-center">
            <button
              className="text-blue-500 hover:text-blue-700"
              aria-label="Edit"
            >
              <MdOutlineModeEditOutline size={18} />
            </button>
            <button
              className="text-red-500 hover:text-red-700"
              aria-label="Delete"
            >
              <RiDeleteBin5Line size={18} />
            </button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="12" className="text-center py-4 text-gray-500">
          No Records Found
        </td>
      </tr>
    )}
  </tbody>
</table>

        </div>
      </div>
    </div>
  );
}

export default EmployeesSalaryDetails;
