import React, { useState } from "react";
import Accordion from "./Accordion";
import { IoMdAddCircleOutline } from "react-icons/io";
import EmployPersonalDetail from "./EmployPersonalDetail";
import { FaUsers, FaTasks, FaClipboardList } from "react-icons/fa";

const EmployDashboard = () => {
  const [fullName, setFullName] = useState("Vijay");
  return <div className="min-h-screen">
    <header className="mb-8 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src="https://storage.googleapis.com/a1aa/image/fM4bjeZeUVEdlp65TEuJT7c7VaheI9jMDLnNOejMHijfZ9y9E.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800">{fullName}</h1>
          <p className="text-gray-500 text-sm">Welcome back to Dataclaps 👋</p>
        </div>
      </div>
      <div className=""> </div>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gradient-to-r from-violet-200 to-pink-200 p-6 rounded-lg shadow flex items-center">
        <FaTasks className="text-blue-500 text-3xl mr-4" />
        <div>
          <h3 className="text-sm font-medium text-gray-500">Total Leaves</h3>
          <p className="text-xl font-bold text-gray-800">180 Leaves</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-teal-400 to-yellow-200 p-6 rounded-lg shadow flex items-center">
        <FaClipboardList className="text-green-500 text-3xl mr-4" />
        <div>
          <h3 className="text-sm font-medium text-gray-500">Attendance Rate</h3>
          <p className="text-xl font-bold text-gray-800">90%</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-200 to-cyan-200 p-6 rounded-lg shadow flex items-center">
        <FaUsers className="text-yellow-500 text-3xl mr-4" />
        <div>
          <h3 className="text-sm font-medium text-gray-500">Total Employees</h3>
          <p className="text-xl font-bold text-gray-800">{12} Employees</p>
        </div>
      </div>
      </div>
    <div className="flex gap-4">
      <EmployPersonalDetail />
      <Accordion />
    </div>
  </div>
}

export default EmployDashboard;