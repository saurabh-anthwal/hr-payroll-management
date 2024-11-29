import React from "react";

function Count() {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
      <span className="block text-gray-600 text-center text-lg font-semibold mb-4">
        Employees
      </span>
      <div className="flex justify-around items-center">
        <div className="text-center">
          <span className="block text-sm text-gray-500">Total</span>
          <span className="block text-2xl font-bold text-indigo-600">256</span>
        </div>
        <div className="h-12 w-px bg-gray-200"></div>
        <div className="text-center">
          <span className="block text-sm text-gray-500">Available</span>
          <span className="block text-2xl font-bold text-green-600">250</span>
        </div>
        <div className="h-12 w-px bg-gray-200"></div>
        <div className="text-center">
          <span className="block text-sm text-gray-500">Leave</span>
          <span className="block text-2xl font-bold text-red-600">6</span>
        </div>
      </div>
    </div>
  );
}

export default Count;
