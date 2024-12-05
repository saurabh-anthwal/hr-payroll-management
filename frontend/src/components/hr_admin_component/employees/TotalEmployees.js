import React from "react";

function TotalEmployees({ title, count }) {
  return (
    <div className="bg-white rounded-lg shadow-md py-3 w-72 mx-auto my-4">
      <h5 className="text-lg font-semibold text-gray-700 border-b pb-2 text-center">{title}</h5>
      <div className="py-4">
        <h5 className="text-center">{count}</h5>
      </div>
    </div>
  );
}

export default TotalEmployees;
