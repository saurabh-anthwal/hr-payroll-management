import React, { useState } from "react";
import {
  FaUser,
  FaRegCalendarAlt,
  FaRegMoneyBillAlt,
  FaRegListAlt,
} from "react-icons/fa";
import EmployeeNavbar from "../navbar/Navbar";
import EmployeeDashboard from "./EmployeeDashboard";
import Profile from "./Profile";
import SalaryDetails from "./SalaryDetails";
import UpcomingHolidays from "./UpcomingHolidays";

const Dashboard = ({ employee = {} }) => {
  const [activeTab, setActiveTab] = useState("employee-dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "employee-dashboard":
        return <EmployeeDashboard employee={employee} />;
      case "salary":
        return <SalaryDetails employee={employee} />;
      case "holidays":
        return <UpcomingHolidays holidays={employee.holidays || []} />;
      case "profile":
        return <Profile employee={employee} />;
      default:
        return null;
    }
  };

  return (
    <>
    <EmployeeNavbar/>
    <div className="bg-gray-100 min-h-screen flex flex-col">
    <main className="flex-1 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="bg-gray-50 shadow-lg lg:w-1/4 p-4 flex flex-col gap-4">
        <div
          className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all ${
            activeTab === "employee-dashboard"
              ? "bg-blue-500 text-white"
              : "hover:bg-blue-100 text-blue-600"
          }`}
          onClick={() => setActiveTab("employee-dashboard")}
        >
          <FaRegListAlt className="text-2xl" />
          <span className="font-medium">Dashboard</span>
        </div>
        <div
          className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all ${
            activeTab === "salary"
              ? "bg-green-500 text-white"
              : "hover:bg-green-100 text-green-600"
          }`}
          onClick={() => setActiveTab("salary")}
        >
          <FaRegMoneyBillAlt className="text-2xl" />
          <span className="font-medium">Salary</span>
        </div>
        <div
          className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all ${
            activeTab === "holidays"
              ? "bg-yellow-500 text-white"
              : "hover:bg-yellow-100 text-yellow-600"
          }`}
          onClick={() => setActiveTab("holidays")}
        >
          <FaRegCalendarAlt className="text-2xl" />
          <span className="font-medium">Holidays</span>
        </div>
        <div
          className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all ${
            activeTab === "profile"
              ? "bg-purple-500 text-white"
              : "hover:bg-purple-100 text-purple-600"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          <FaUser className="text-2xl" />
          <span className="font-medium">Profile</span>
        </div>
      </aside>
  
      {/* Main Content */}
      <section className="flex-1 bg-white p-6">
        {renderContent()}
      </section>
    </main>
  </div>
  </>
  );
};

export default Dashboard;
