import React, { useEffect, useState } from "react";
import apiUrls from "../../../libs/apiUrls";
import axios_instance from "../../../libs/interseptor";
import Cookies from 'js-cookie';

const HolidayCard = ({ holiday }) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-xl bg-white border border-gray-200 group">
      <img
        className="w-full h-64 object-cover group-hover:opacity-75 transition-opacity duration-300"
        src={holiday.image}
        alt={holiday.name}
      />
      <div className="px-6 py-4">
        <h2 className="text-2xl font-bold text-gray-900">{holiday.name}</h2>
        <p className="text-sm text-gray-500 mb-4">{new Date(holiday.date).toLocaleDateString()}</p>
        <p className="text-gray-700 mb-4">{holiday.description}</p>
        <blockquote className="italic text-gray-600 border-l-4 border-blue-500 pl-4 mt-4">
          "{holiday.quotes}"
        </blockquote>
      </div>
    </div>
  );
};

const HolidayList = () => {
  const [holidays, setHolidays] = useState([]);
  const [addNew, setAddNew] = useState(false)
  const [newHoliday, setNewHoliday] = useState({
    name: "",
    date: "",
    description: "",
    image: null,
    quotes: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const userType = Cookies.get('userType')

  useEffect(() => {
    const getHoliday = async () => {
      try {
        const response = await axios_instance.get(apiUrls.HOLIDAY_LIST);
        setHolidays(response.data);
      } catch (error) {
        console.error("Failed to fetch holidays:", error);
      }
    };
    getHoliday();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHoliday({ ...newHoliday, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setNewHoliday({ ...newHoliday, [name]: files[0] });  // Store the file object
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", newHoliday.name);
    formData.append("date", newHoliday.date);
    formData.append("description", newHoliday.description);
    formData.append("quotes", newHoliday.quotes);
    if (newHoliday.image) {
      formData.append("image", newHoliday.image); // Append the image file
    }

    try {
      const response = await axios_instance.post(apiUrls.HOLIDAY_LIST, formData, {
        headers: {
          "Content-Type": "multipart/form-data",  // Ensure the correct content type
        },
      });
      setHolidays([response.data, ...holidays]);
      setNewHoliday({ name: "", date: "", description: "", image: null, quotes: "" });
    } catch (error) {
      console.error("Failed to create holiday:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 bg-white text-gray-500">

      <h3 className="flex justify-center gap-2 text-3xl font-extrabold text-center text-gray-500 mb-10">
        <img
          className="w-40"
          src="https://dataclaps.com/wp-content/uploads/2020/09/Screenshot-2023-03-18-at-2.36.25-AM.png"
          alt="Holiday Logo"
        />
        &nbsp;Holidays
      </h3>
      <div className="flex justify-end py-2">
        {userType==='hr' && <button
          className="formCancelBtn"
          onClick={()=>{setAddNew(!addNew)}}> {addNew ? "Cancel" : "Add New Holiday"}
        </button>}
      </div>
      {addNew &&
      <div className="mb-12 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Add a New Holiday
        </h2>
        <form onSubmit={handleFormSubmit} className="space-y-6 max-w-lg mx-auto">
          <div className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-lg font-semibold text-gray-700">
                Holiday Name
              </label>
              <input
                type="text"
                name="name"
                value={newHoliday.name}
                onChange={handleInputChange}
                placeholder="Enter holiday name"
                className="customTextInput"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="date" className="text-lg font-semibold text-gray-700">
                Holiday Date
              </label>
              <input
                type="date"
                name="date"
                value={newHoliday.date}
                onChange={handleInputChange}
                className="customTextInput"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="description" className="text-lg font-semibold text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={newHoliday.description}
                onChange={handleInputChange}
                placeholder="Write a brief description"
                className="customTextAreaInput"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="image" className="text-lg font-semibold text-gray-700">
                Holiday Image
              </label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="border border-gray-300 p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="quotes" className="text-lg font-semibold text-gray-700">
                Quote (Optional)
              </label>
              <input
                type="text"
                name="quotes"
                value={newHoliday.quotes}
                onChange={handleInputChange}
                placeholder="Enter a holiday quote"
                className="customTextInput"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className={`formSubmitBtn ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                {isLoading ? "Adding..." : "Add Holiday"}
              </button>
            </div>
          </div>
        </form>
      </div>
}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {holidays.length > 0 ? (
          holidays.map((holiday) => <HolidayCard key={holiday.name} holiday={holiday} />)
        ) : (
          <p>No holidays available</p>
        )}
      </div>
    </div>
  );
};

export default HolidayList;
