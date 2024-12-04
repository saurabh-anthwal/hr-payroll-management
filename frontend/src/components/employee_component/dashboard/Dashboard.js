import React, { useState } from "react";
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
    {/* <EmployeeNavbar/> */}
    <div className="bg-gray-100 min-h-screen flex flex-col">
    <main className="flex-1 flex flex-col lg:flex-row">
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
