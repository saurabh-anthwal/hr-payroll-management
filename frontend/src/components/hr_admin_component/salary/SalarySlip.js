import React from "react";

function SalarySlip() {
  const salaryData = {
    companyDetails: {
      logo: "https://dataclaps.com/wp-content/uploads/2020/09/Screenshot-2023-03-18-at-2.36.25-AM.png",
      address: "Cyber City Gurgaon, New Delhi, 110011",
    },
    employeeDetails: {
      name: "John Doe",
      id: "EMP12345",
      designation: "Senior Software Engineer",
      department: "IT Development",
      joiningDate: "2021-06-15",
      bankAccount: "1234 5678 9012",
      pan: "ABCDE1234F",
    },
    salaryDetails: {
      month: "November 2024",
      location: "New York Office",
      payDate: "2024-11-30",
      totalEarnings: 8000,
      totalDeductions: 2000,
      netPay: 6000,
    },
    earnings: [
      { name: "Basic Salary", amount: 4000 },
      { name: "House Rent Allowance (HRA)", amount: 2000 },
      { name: "Special Allowance", amount: 1500 },
      { name: "Performance Bonus", amount: 500 },
    ],
    deductions: [
      { name: "Income Tax", amount: 1000 },
      { name: "Provident Fund", amount: 700 },
      { name: "Professional Tax", amount: 300 },
    ],
    hrDetails: {
      name: "Geeta Sharma",
      designation: "HR Manager",
      signature:
        "https://storage.googleapis.com/a1aa/image/0cc14bfd-43e7-43c2-83e7-c8beb6849267.jpeg", // HR's signature image
    },
  };

  const { companyDetails, employeeDetails, salaryDetails, earnings, deductions, hrDetails } =
    salaryData;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-4 border border-gray-300">
      <h1 className="text-2xl font-bold text-gray-800 mb-5 text-center">Paysleep</h1>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <img
            src={companyDetails.logo}
            alt="Company Logo"
            className="w-28 object-contain"
          />
          <p className="text-xs text-gray-600">{companyDetails.address}</p>
        </div>
      </div>

      {/* Employee Details */}
      <table className="w-full table-auto border-collapse border border-gray-300 mb-6">
        <tbody>
          {Object.entries(employeeDetails).map(([key, value]) => (
            <tr key={key} className="border border-gray-300">
              <td className="px-4 py-2 capitalize font-semibold text-gray-700 mb-4">{key.replace(/([A-Z])/g, " $1")}</td>
              <td className="px-4 py-2 text-gray-800">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Salary Details */}
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Salary Details</h2>
      <table className="w-full table-auto border-collapse border border-gray-300 mb-6">
        <tbody>
          {Object.entries(salaryDetails).map(([key, value]) => (
            <tr key={key} className="border border-gray-300">
              <td className="px-4 py-2 capitalize font-semibold text-gray-700 mb-4">{key.replace(/([A-Z])/g, " $1")}</td>
              <td className="px-4 py-2 text-gray-800">
                {typeof value === "number" ? `₹${value}` : value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Earnings and Deductions */}
      <div className="grid grid-cols-2 gap-8">
        {/* Earnings */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Earnings</h2>
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 border border-gray-300">
                <th className="px-4 py-2 capitalize font-semibold text-gray-700 mb-4">Name</th>
                <th className="px-4 py-2 capitalize font-semibold text-gray-700 mb-4">Amount</th>
              </tr>
            </thead>
            <tbody>
              {earnings.map((item, index) => (
                <tr key={index} className="border border-gray-300">
                  <td className="px-4 py-2 text-gray-800">{item.name}</td>
                  <td className="px-4 py-2 text-right text-gray-800">₹{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Deductions */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Deductions</h2>
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 border border-gray-300">
                <th className="px-4 py-2 capitalize font-semibold text-gray-700 mb-4">Name</th>
                <th className="px-4 py-2 capitalize font-semibold text-gray-700 mb-4">Amount</th>
              </tr>
            </thead>
            <tbody>
              {deductions.map((item, index) => (
                <tr key={index} className="border border-gray-300">
                  <td className="px-4 py-2 text-gray-800">{item.name}</td>
                  <td className="px-4 py-2 text-right text-gray-800">₹{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* HR Signature */}
      <div className="flex justify-between items-center  p-6  mt-6">
        <div>
          <p className="font-medium text-gray-700">HR Signature:</p>
          <p className="text-sm text-gray-600">{hrDetails.name}</p>
          <p className="text-sm text-gray-600">{hrDetails.designation}</p>
        </div>
        <img
          src={hrDetails.signature}
          alt="HR Signature"
          className="h-16 w-auto object-contain"
        />
      </div>
      <div>
        <p className="text-center my-5"><span>--</span> This is system generated payslip <span>--</span></p>
      </div>
    </div>
  );
}

export default SalarySlip;
