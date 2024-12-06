import React, { useState } from "react";
import { LiaDownloadSolid } from "react-icons/lia";
import SalarySlip from "./SalarySlip";

const DownloadPayslip = () => {
  const [filters, setFilters] = useState({
    month: "",
    employee: "",
    department: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Filters:", filters);
    // Add your search functionality here
  };

  return (
    <div className="">
      <div className="">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Search Employee Payslip
        </h1>

        {/* Filter Section */}
        <form
          onSubmit={handleSearch}
          className="flex flex-wrap items-center gap-4 mb-6"
        >
          {/* Month Field */}
          <div className="flex-1 min-w-[150px]">
            <label
              htmlFor="month"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Month
            </label>
            <input
              type="month"
              id="month"
              name="month"
              value={filters.month}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm shadow-sm focus:outline-none"
              required
            />
          </div>

          {/* Employee Field */}
          <div className="flex-1 min-w-[150px]">
            <label
              htmlFor="employee"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Employee Name/ID
            </label>
            <input
              type="text"
              id="employee"
              name="employee"
              placeholder="Employee Name or ID"
              value={filters.employee}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm shadow-sm focus:outline-none"
            />
          </div>

          {/* Department Dropdown */}
          <div className="flex-1 min-w-[150px]">
            <label
              htmlFor="department"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Department
            </label>
            <select
              id="department"
              name="department"
              value={filters.department}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm shadow-sm focus:outline-none"
            >
              <option value="">All Departments</option>
              <option value="IT Development">IT Development</option>
              <option value="Finance">Finance</option>
              <option value="HR">HR</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

          {/* Search Button */}
          <div className="flex-none mt-4 sm:mt-0">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Search
            </button>
          </div>
        </form>

        {/* Results Section */}
        <div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            {/* <p className="text-sm text-gray-500 text-center">
              No results found. Use the search above to find payslips.
            </p> */}
            <div>
                <div className="flex justify-end items-center font-semibold">
                    <LiaDownloadSolid/>
                    <button>Download PDF</button>
                </div>
                <SalarySlip/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPayslip;
