import React, { useState } from "react";
import apiUrls from "../../../libs/apiUrls";
import axios_instance from "../../../libs/interseptor";

function AddSalary() {
  const [input, setInput] = useState({
    employee: "", // Employee ID
    ppa: 0,
    monthly_salary: 0,
    basic_da: 0,
    hra: 0,
    conveyance: 0,
    pf: 0,
    esic: 0,
    professional_tax: 0,
    net_salary: 0,
  });

  const inputHandle = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const response = await axios_instance.post(apiUrls.ALL_EMPLOYEE_SALARY_DETAILS, input);
      if (response.status === 201) {
        alert("Employee salary added successfully!");
      } else {
        alert("Failed to add salary!");
      }
    } catch (error) {
      console.error("Failed to fetch salary details:", error);
      alert("An error occurred while adding salary!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <form onSubmit={submitHandle} className="space-y-6">
        {/* Employee ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Employee ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="employee"
            value={input.employee}
            onChange={inputHandle}
            placeholder="Enter Employee ID"
            className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        {/* PPA */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            PPA <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="ppa"
            value={input.ppa}
            onChange={inputHandle}
            placeholder="Enter PPA"
            className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        {/* Other Inputs */}
        {[
          { label: "Monthly Salary", name: "monthly_salary" },
          { label: "Basic DA", name: "basic_da" },
          { label: "HRA", name: "hra" },
          { label: "Conveyance", name: "conveyance" },
          { label: "PF", name: "pf" },
          { label: "ESIC", name: "esic" },
          { label: "Professional Tax", name: "professional_tax" },
          { label: "Net Salary", name: "net_salary" },
        ].map(({ label, name }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700">
              {label} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name={name}
              value={input[name]}
              onChange={inputHandle}
              placeholder={`Enter ${label}`}
              className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        ))}
        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 focus:outline-none"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddSalary;
