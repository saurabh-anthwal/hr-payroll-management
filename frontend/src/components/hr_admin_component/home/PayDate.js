import React from "react";
import moment from "moment";

function PayDate() {
  const lastDay = moment().endOf("month").format("DD");
  const monthYear = moment().endOf("month").format("MMM, YYYY");

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300 text-center">
      <span className="block text-gray-500 font-medium text-sm">PAY DAY</span>
      <span className="block text-4xl font-bold text-indigo-600 mt-2">
        {lastDay}
      </span>
      <span className="block text-gray-600 text-sm">{monthYear}</span>
      <div className="my-4 border-t border-gray-200"></div>
      <span className="text-gray-700 font-medium text-sm">
        256 Employees
      </span>
    </div>
  );
}

export default PayDate;
