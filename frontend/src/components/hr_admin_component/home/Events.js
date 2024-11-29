import React from "react";

function Events() {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
      <span className="block text-gray-700 text-lg font-semibold text-center">
        Coming Up Events!
      </span>
      <div className="my-4 border-t border-gray-200"></div>
      <ol className="text-gray-500 text-center text-sm italic">No Events..</ol>
    </div>
  );
}

export default Events;
