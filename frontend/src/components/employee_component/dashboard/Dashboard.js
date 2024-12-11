import React from "react";
import HrDashboard from "./HrDashboard";
import Cookies from 'js-cookie';
import EmployDashboard from "../../dashboard/EmployDashboard";

const Dashboard = ({ employee = {} }) => {
  const userType = Cookies.get('userType')

  return (
    <>
    {/* <EmployeeNavbar/> */}
    <div className="bg-gray-100 min-h-screen flex flex-col">
    <main className="flex-1 flex flex-col lg:flex-row">
      {/* Main Content */}
      <section className="flex-1 bg-white p-6">
        {userType==='hr' 
          ? <HrDashboard employee={employee} />
          : <EmployDashboard />
        } 
      </section>
    </main>
  </div>
  </>
  );
};

export default Dashboard;
