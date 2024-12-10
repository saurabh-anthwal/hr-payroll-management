import React from "react";
import EmployeeDashboard from "./EmployeeDashboard";
import Cookies from 'js-cookie';

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
          ?<EmployeeDashboard employee={employee} />
          : <div>dashboard</div>
        } 
      </section>
    </main>
  </div>
  </>
  );
};

export default Dashboard;
