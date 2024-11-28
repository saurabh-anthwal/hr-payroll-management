import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EmployeeDashboard = ({ employee }) => {
  const { name, designation, dob, joiningDate } = employee;

  // Example attendance data
  const attendanceData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Attendance (%)",
        data: [95, 88, 90, 92, 85, 87], // Example attendance values
        backgroundColor: "#4CAF50", // Green
        borderRadius: 10,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#374151", // Dark gray
        },
      },
      title: {
        display: true,
        text: "Monthly Attendance",
        color: "#1F2937", // Dark gray
        font: { size: 18 },
      },
    },
    scales: {
      x: {
        ticks: { color: "#6B7280" }, // Light gray
      },
      y: {
        ticks: { color: "#6B7280" },
        max: 100,
      },
    },
  };

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Employee Dashboard</h1>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <p className="text-sm font-semibold text-gray-500">Name</p>
          <h3 className="text-xl font-bold text-gray-800">{name || "John Doe"}</h3>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <p className="text-sm font-semibold text-gray-500">Designation</p>
          <h3 className="text-xl font-bold text-gray-800">{designation || "Software Engineer"}</h3>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <p className="text-sm font-semibold text-gray-500">Date of Birth</p>
          <h3 className="text-xl font-bold text-gray-800">{dob || "N/A"}</h3>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <p className="text-sm font-semibold text-gray-500">Joining Date</p>
          <h3 className="text-xl font-bold text-gray-800">{joiningDate || "N/A"}</h3>
        </div>
      </div>

      {/* Attendance Chart */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Attendance Overview</h2>
        <Bar data={attendanceData} options={chartOptions} />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
