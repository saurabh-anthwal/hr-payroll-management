import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaRegCalendarAlt, FaFlag, FaGift, FaTree } from "react-icons/fa";
import { MdExpandMore, MdExpandLess } from "react-icons/md"; // Import collapse icons
import axios_instance from "../../../libs/interseptor";
import apiUrls from "../../../libs/apiUrls";

const UpcomingHolidays = () => {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedHoliday, setExpandedHoliday] = useState(null); // Track expanded holiday

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await axios_instance.get(apiUrls.HOLIDAY_LIST);
        console.log(response.data, "Fetched Holiday Data");
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

  const handleToggleDetails = (id) => {
    // Toggle the expanded holiday details
    if (expandedHoliday === id) {
      setExpandedHoliday(null); // Collapse if the same holiday is clicked
    } else {
      setExpandedHoliday(id); // Expand the clicked holiday
    }
  };

  if (loading) {
    return <p className="text-center text-lg text-indigo-700">Loading holidays...</p>;
  }

  if (error) {
    return <p className="text-center text-lg text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-white">
    <div className="p-6">
      <h3 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center space-x-2">
        <FaCalendarAlt className="text-4xl text-indigo-600" />
        <span>Upcoming Holidays</span>
      </h3>
      <ul className="space-y-6">
        {holidays.map((holiday) => (
          <li
            key={holiday.id}
            className="flex flex-col bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Icons based on holiday name */}
                {holiday.name === "New Year's Day" && <FaGift className="text-4xl text-red-500" />}
                {holiday.name === "Christmas Day" && <FaTree className="text-4xl text-green-500" />}
                {holiday.name === "Holi" && <FaRegCalendarAlt className="text-4xl text-pink-500" />}
                {holiday.name === "Independence Day" && <FaFlag className="text-4xl text-blue-500" />}
                {holiday.name === "Republic Day" && <FaFlag className="text-4xl text-orange-500" />}
                <div className="cursor-pointer" onClick={() => handleToggleDetails(holiday.id)}>
                  <span className="text-xl font-bold text-gray-900">{holiday.name}</span>
                </div>
              </div>
              <span className="text-lg text-gray-600 font-medium">{new Date(holiday.date).toLocaleDateString()}</span>

              {/* Toggle icon based on collapse state */}
              <div
                className="cursor-pointer"
                onClick={() => handleToggleDetails(holiday.id)}
              >
                {expandedHoliday === holiday.id ? (
                  <MdExpandLess className="text-2xl text-gray-600" />
                ) : (
                  <MdExpandMore className="text-2xl text-gray-600" />
                )}
              </div>
            </div>

            {/* Collapsible Holiday Description moved to bottom */}
            {expandedHoliday === holiday.id && (
              <div className="mt-4 text-sm text-gray-600">
                <p>{holiday.description}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default UpcomingHolidays;
