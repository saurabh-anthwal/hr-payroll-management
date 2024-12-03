import React, { useEffect, useState } from "react";
import { FaCalendarDay, FaRegCalendarAlt, FaFireAlt, FaFlag, FaBirthdayCake } from "react-icons/fa";
import axios_instance from "../../../libs/interseptor";
import apiUrls from "../../../libs/apiUrls";

const UpcomingHolidays = () => {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await axios_instance.get(apiUrls.HOLIDAY_LIST);
        console.log(response.data, "Fetched Salary Data");
        setHolidays(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch holidays:", err);
        setError("Failed to load holidays. Please try again later.");
        setLoading(false);
      }
    };

    fetchHolidays();
  }, []);

  if (loading) {
    return <p className="text-center text-lg">Loading holidays...</p>;
  }

  if (error) {
    return <p className="text-center text-lg text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h3 className="text-3xl font-semibold text-indigo-700 mb-6 flex items-center space-x-2">
        <FaCalendarDay className="text-4xl" />
        <span>Upcoming Holidays</span>
      </h3>
      <ul className="space-y-4">
        {holidays.map((holiday) => (
          <li
            key={holiday.id}
            className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-indigo-100 transition duration-300"
          >
            <div className="flex items-center space-x-3">
              {/* Add conditional icons based on holiday name */}
              {holiday.name === "New Year's Day" && <FaFireAlt className="text-4xl text-yellow-500" />}
              {holiday.name === "Holi" && <FaRegCalendarAlt className="text-4xl text-pink-500" />}
              {holiday.name === "Independence Day" && <FaFlag className="text-4xl text-blue-500" />}
              {holiday.name === "Republic Day" && <FaFlag className="text-4xl text-orange-500" />}
              {holiday.name === "Christmas Day" && <FaBirthdayCake className="text-4xl text-green-600" />}
              <span className="text-xl font-semibold text-gray-800">{holiday.name}</span>
            </div>
            <span className="text-lg text-gray-500">{new Date(holiday.date).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingHolidays;
