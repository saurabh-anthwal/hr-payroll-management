import React from "react";
import cake from "./cake.jpg";

function Wishes() {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
      <h2 className="text-xl font-semibold text-gray-800">Anniversaries & Birthdays!</h2>
      <div className="h-[2px] bg-gray-200 mt-4"></div>
      <div className="flex items-center mt-6 space-x-4">
        <img
          src={cake}
          alt="cake"
          className="w-20 h-20 object-cover rounded-lg shadow-sm"
        />
        <ul className="text-gray-600 italic text-sm">No Birthdays & Anniversaries..</ul>
      </div>
    </div>
  );
}

export default Wishes;
