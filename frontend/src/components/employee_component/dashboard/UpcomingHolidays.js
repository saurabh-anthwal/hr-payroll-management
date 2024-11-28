import React from "react";
import { FaCalendarDay, FaRegCalendarAlt, FaFireAlt, FaFlag, FaBirthdayCake } from "react-icons/fa";
const holidays = [
    { name: "Diwali", date: "November 12, 2024" },
    { name: "Holi", date: "March 15, 2024" },
    { name: "Independence Day", date: "August 15, 2024" },
    { name: "Republic Day", date: "January 26, 2024" },
    { name: "Christmas", date: "December 25, 2024" },
  ];
const UpcomingHolidays = () => (
  <div className="max-w-4xl mx-auto  p-6">
    <h3 className="text-3xl font-semibold text-indigo-700 mb-6 flex items-center space-x-2">
      <FaCalendarDay className="text-4xl" />
      <span>Upcoming Holidays</span>
    </h3>
    <ul className="space-y-4">
      {holidays.map((holiday, index) => (
        <li
          key={index}
          className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-indigo-100 transition duration-300"
        >
          <div className="flex items-center space-x-3">
            {holiday.name === "Diwali" && <FaFireAlt className="text-4xl text-yellow-500" />}
            {holiday.name === "Holi" && <FaRegCalendarAlt className="text-4xl text-pink-500" />}
            {holiday.name === "Independence Day" && <FaFlag className="text-4xl text-blue-500" />}
            {holiday.name === "Republic Day" && <FaFlag className="text-4xl text-orange-500" />}
            {holiday.name === "Christmas" && <FaBirthdayCake className="text-4xl text-green-600" />}
            <span className="text-xl font-semibold text-gray-800">{holiday.name}</span>
          </div>
          <span className="text-lg text-gray-500">{holiday.date}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default UpcomingHolidays;
