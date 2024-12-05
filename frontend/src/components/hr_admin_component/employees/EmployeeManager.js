import React, { useState } from "react";
import AddSalary from "../salary/AddSalary";
import AddEmployee from "./AddEmployee";
import UpdateEmployee from "./UpdateEmployee";

const EmployeeManager = () => {
  const [activeTab, setActiveTab] = useState("register");

  return (
    <div className="p-8">

      {/* Tab Buttons */}
      <div className="flex justify-center mb-8 space-x-4">
        <button
          className={`px-8 py-3 text-lg font-semibold rounded-lg shadow-md transform transition-all duration-300 border ${activeTab === "register"
              ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white scale-105 shadow-lg border-transparent"
              : "bg-white text-gray-800 border-gray-300 hover:border-blue-500 hover:shadow-lg"
            }`}
          onClick={() => setActiveTab("register")}
        >
          Register Employee
        </button>
        <button
          className={`px-8 py-3 text-lg font-semibold rounded-lg shadow-md transform transition-all duration-300 border ${activeTab === "update"
              ? "bg-gradient-to-r from-green-500 to-green-700 text-white scale-105 shadow-lg border-transparent"
              : "bg-white text-gray-800 border-gray-300 hover:border-green-500 hover:shadow-lg"
            }`}
          onClick={() => setActiveTab("update")}
        >
          Update Employee
        </button>
        <button
          className={`px-8 py-3 text-lg font-semibold rounded-lg shadow-md transform transition-all duration-300 border ${activeTab === "addSalary"
              ? "bg-gradient-to-r from-purple-500 to-purple-700 text-white scale-105 shadow-lg border-transparent"
              : "bg-white text-gray-800 border-gray-300 hover:border-purple-500 hover:shadow-lg"
            }`}
          onClick={() => setActiveTab("addSalary")}
        >
          Update Salary
        </button>
      </div>



      {/* Render Components Based on Active Tab */}
      {activeTab === "register" && <AddEmployee />}
      {activeTab === "update" && <UpdateEmployee />}
      {activeTab === "addSalary" && <AddSalary />}
    </div>
  );
};

export default EmployeeManager;
