import React, { useEffect, useState } from "react";
import Accordion from "./Accordion";
import { HiOutlineBellAlert } from "react-icons/hi2";
import EmployPersonalDetail from "./EmployPersonalDetail";
import { FaUsers, FaTasks, FaClipboardList } from "react-icons/fa";
import apiUrls from "../../libs/apiUrls";
import axios_instance from "../../libs/interseptor";

const EmployDashboard = () => {
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    localStorage.setItem('tab', 'dashboard');
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios_instance.get(apiUrls.LOGIN_EMPLOYEE_DASHBOARD);
        setEmployeeDetails(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching employee details:", err);
        setError("Failed to fetch employee details.");
        setLoading(false);
      }
    };

    fetchDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="mb-6 flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full overflow-hidden">
            <img
              src="https://storage.googleapis.com/a1aa/image/fM4bjeZeUVEdlp65TEuJT7c7VaheI9jMDLnNOejMHijfZ9y9E.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">{employeeDetails?.firstname+ " "+employeeDetails?.lastname}</h1>
            <p className="text-gray-500 text-sm">Welcome back to Dataclaps 👋</p>
          </div>
        </div>
        <button className="flex gap-2 items-center border-blue-500 border-1 text-blue-500  px-4 py-2 rounded-lg text-sm font-medium ">
          <span><HiOutlineBellAlert/></span>
          Mark Attendance
        </button>
      </header>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <FaTasks className="text-blue-500 text-4xl mr-4" />
          <div>
            <h3 className="text-sm font-medium text-gray-500">Total Leaves</h3>
            <p className="text-2xl font-bold text-gray-800">11 Leaves</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <FaClipboardList className="text-green-500 text-4xl mr-4" />
          <div>
            <h3 className="text-sm font-medium text-gray-500">Attendance Rate</h3>
            <p className="text-2xl font-bold text-gray-800">90%</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <FaUsers className="text-yellow-500 text-4xl mr-4" />
          <div>
            <h3 className="text-sm font-medium text-gray-500">Total Employees</h3>
            <p className="text-2xl font-bold text-gray-800">12 Employees</p>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EmployPersonalDetail employeeDetails={employeeDetails}/>
        <Accordion />
      </div>
    </div>
  );
};

export default EmployDashboard;
