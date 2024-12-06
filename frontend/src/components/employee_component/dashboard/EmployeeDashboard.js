import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import { FaUsers, FaTasks, FaClipboardList } from "react-icons/fa";
import { IoCheckmarkDone } from "react-icons/io5";
import { MdNotificationsNone } from "react-icons/md";
import { Chart as ChartJS, CategoryScale, PointElement, LinearScale, BarElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import axios_instance from "../../../libs/interseptor";
import apiUrls from "../../../libs/apiUrls";
import Accordion from "../../dashboard/Accordion";

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend);

const EmployeeDashboard = () => {
  const [hrDetail, setHrDetail] = useState(null);
  const [employeeDetail, setEmployeeDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isPresent, setIsPresent] = useState(false);

  const toggleAttendance = () => {
    setIsPresent((prev) => !prev);
  };

  // Chart Data
  const incomeExpenseData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Income",
        data: [5000, 7000, 8000, 8500, 9000, 9500, 6500, 7000, 7200, 8000, 9000, 10000],
        borderColor: "#3b82f6", // Blue
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Expense",
        data: [3000, 3200, 3400, 3600, 4000, 3800, 3280, 3500, 4000, 4200, 4500, 4800],
        borderColor: "#fbbf24", // Yellow
        backgroundColor: "rgba(251, 191, 36, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const performanceData = {
    labels: ["Hazel", "Simon", "Aida", "Peg", "Barb"],
    datasets: [
      {
        label: "Task Completed",
        data: [35, 28, 40, 30, 25],
        backgroundColor: "#f0b967", // Green
        borderRadius: 3,
      },
      {
        label: "Presence",
        data: [28, 25, 35, 22, 18],
        backgroundColor: "rgb(240 185 103 / 52%)", // Blue
        borderRadius: 3,
      },
      {
        label: "Completed Meetings",
        data: [20, 15, 18, 25, 20],
        backgroundColor: "#faf278", // Purple
        borderRadius: 3,
      },
    ],
  };


  // leave Data
  const leaveData = [
    {
      id: 1,
      type: "Sick Leave",
      status: "Pending",
      employee: {
        name: "Rajesh Singh",
        image: "https://via.placeholder.com/50",
        leaveDays: "Leave for 4 days",
      },
      fromDate: "Jan 23, 2025",
      toDate: "Jan 26, 2025",
    },
    {
      id: 2,
      type: "Casual Leave",
      status: "Approved",
      employee: {
        name: "Aman Gupta",
        image: "https://via.placeholder.com/50",
        leaveDays: "Leave for 2 days",
      },
      fromDate: "Feb 1, 2025",
      toDate: "Feb 2, 2025",
    },
    {
      id: 3,
      type: "Vacation Leave",
      status: "Rejected",
      employee: {
        name: "Meera Sharma",
        image: "https://via.placeholder.com/50",
        leaveDays: "Leave for 7 days",
      },
      fromDate: "Mar 5, 2025",
      toDate: "Mar 11, 2025",
    },
  ];

  const hrDetails = async () => {
    setLoading(false);
    setLoading(false);
    try {
      const response = await axios_instance.get(apiUrls.HR_DETAILS);
      setHrDetail(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch salary details:", error);
      setError("Failed to load employee details.");
      setLoading(false);
    }
  };

  const employeeDetails = async () => {
    setLoading(false);
    setLoading(false);
    try {
      const response = await axios_instance.get(apiUrls.ALL_EMPLOYEE_DETAILS);
      console.log("response", response)
      setEmployeeDetail(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch salary details:", error);
      setError("Failed to load employee details.");
      setLoading(false);
    }
  }

  useEffect(() => {
    hrDetails();
    // employeeDetails()
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  // if (error) return <p className="text-center text-red-500">{error}</p>;

  // const { firstname, lastname, designation, dob, dateOfJoined } = hrDetail;

  let full_name = "GEETA SHARMA"
  let count_employee = 200

  const options = {
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          fontSize: 16,
          fontStyle: "normal",
          fontFamily: "Outfit",
          boxWidth: 6,
          boxHeight: 6,
          padding: 10,
          usePointStyle: true,
        },
      },
    },
    animation: {
      duration: 2000,
    },
    maintainAspectRatio: true,
    responsive: true
  }

  const optionsLine = {
    scales: {
      x: {
        beginAtZero: true,
        type: "linear",
        position: "left",

        grid: {
          borderDash: [20],
        },

      },
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          fontSize: 16,
          fontStyle: "normal",
          fontFamily: "Outfit",
          boxWidth: 6,
          boxHeight: 6,
          padding: 10,
          usePointStyle: true,
        },
      },
    },
    animation: {
      duration: 2000,
    },
    maintainAspectRatio: true,
  };


  return (
    <div className="min-h-screen">
      {/* Profile Section */}
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
            <h1 className="text-xl font-bold text-gray-800">{full_name}</h1>
            <p className="text-gray-500 text-sm">Welcome back to Dataclaps 👋</p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <button
            onClick={toggleAttendance}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition ${isPresent
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-gray-100 text-gray-800 border border-gray-200"
              }`}
          >
            {isPresent ? (
              <>
                <IoCheckmarkDone className="w-5 h-5 text-green-800" />
                <span>Present</span>
              </>
            ) : (
              <>
                <MdNotificationsNone className="w-5 h-5 text-gray-600" />
                <span>Mark Attendance</span>
              </>
            )}
          </button>
        </div>
      </header>


      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-gradient-to-r from-violet-200 to-pink-200 p-6 rounded-lg shadow flex items-center">
          <FaTasks className="text-blue-500 text-3xl mr-4" />
          <div>
            <h3 className="text-sm font-medium text-gray-500">Jobs Overview</h3>
            <p className="text-xl font-bold text-gray-800">180 Total Jobs</p>
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
            <p className="text-xl font-bold text-gray-800">{count_employee} Employees</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Income/Expense Line Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Income Statistics</h2>
          <Line data={incomeExpenseData} options={optionsLine} />
        </div>

        {/* Performance Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Employee Performance Ratings</h2>
          <Bar data={performanceData} options={options} />
        </div>
      </div>

      {/* Leave request */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-4">
        {leaveData.map((leave) => (
          <div
            key={leave.id}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 w-full"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-md">
                {leave.type}
              </p>
              <span
                className={`text-sm px-2 py-1 rounded-md font-medium border ${leave.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800 border-yellow-100"
                    : leave.status === "Approved"
                      ? "bg-green-100 text-green-800 border-green-100"
                      : "bg-red-100 text-red-800 border-red-100"
                  }`}
              >
                {leave.status}
              </span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <img
                src={leave.employee.image}
                alt={leave.employee.name}
                className="w-14 h-14 rounded-full object-cover shadow-sm"
              />
              <div>
                <p className="text-gray-800 font-medium">{leave.employee.name}</p>
                <p className="text-sm text-gray-500">Leave Days: {leave.employee.leaveDays}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Leave From:</p>
                <p className="text-gray-800 font-medium">{leave.fromDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Leave To:</p>
                <p className="text-gray-800 font-medium">{leave.toDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-1 justify-between">
              <button className="flex items-center gap-2 bg-green-100 text-green-800 text-sm font-medium px-4 py-2 rounded-md border border-green-100 hover:bg-green-200 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Approve
              </button>
              <button className="flex items-center gap-2 bg-red-100 text-red-800 text-sm font-medium px-4 py-2 rounded-md border border-red-100 hover:bg-red-200 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Reject
              </button>
            </div>

            <div className="mt-6">
              <p className="text-sm text-gray-500 mb-1">Leave Status:</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${leave.status === "Pending"
                      ? "bg-yellow-500 w-1/2"
                      : leave.status === "Approved"
                        ? "bg-green-500 w-full"
                        : "bg-red-500 w-1/3"
                    }`}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="">
        <div className="bg-white col-span-2 p-6 rounded-lg shadow mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Employee</h2>
          <Accordion />
        </div>
      </div>


    </div>
  );
};

export default EmployeeDashboard;
