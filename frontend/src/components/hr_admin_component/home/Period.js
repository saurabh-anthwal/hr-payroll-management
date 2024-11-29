import React from "react";
import moment from "moment";

function Period() {
  const startDate = moment().startOf("month").format("DD/MM/YYYY");
  const endDate = moment().endOf("month").format("DD/MM/YYYY");

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
      <span className="block text-gray-600 text-sm font-semibold mb-4">
        Period: {startDate} - {endDate}
      </span>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <span className="block text-2xl font-bold text-indigo-600">
            ₹157,456,656.00
          </span>
          <span className="text-gray-500 text-sm">PAYROLL COST</span>
        </div>
        <div className="text-center">
          <span className="block text-2xl font-bold text-green-600">
            ₹137,654,256.00
          </span>
          <span className="text-gray-500 text-sm">NET COST</span>
        </div>
      </div>
      <div className="mt-6 flex justify-between items-center text-indigo-600 cursor-pointer hover:underline">
        <span className="text-sm font-medium">Check Status</span>
        {/* Add an icon if needed */}
      </div>
    </div>
  );
}

export default Period;
