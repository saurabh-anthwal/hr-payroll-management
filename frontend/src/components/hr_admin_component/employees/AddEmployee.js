import React, { useState } from "react";
import apiUrls from "../../../libs/apiUrls";
import axios_instance from "../../../libs/interseptor";

function AddEmployee() {
  const [input, setInput] = useState({
    active: true,
    dateOfHired: "",  // Added missing fields
    dateOfJoined: "",
  });
  const [file, setFile] = useState({});

  const inputHandle = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileHandle = (e) => {
    setFile({ ...file, [e.target.name]: e.target.files[0] });
  };

  const submitHandle = async (e) => {
    e.preventDefault();
  
    const payload = {
      ...input,
    };
  
    try {
      const response = await axios_instance.post(apiUrls.EMPLOYEE_DETAILS_ADD, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Employee Added Successfully!");
    } catch (error) {
      console.error("Failed to add employee:", error);
      alert("Failed to add employee. Please try again.");
    }
  };
  

  const resetHandle = () => {
    setInput({
      active: true,
      dateOfHired: "",
      dateOfJoined: "",
    });
    setFile({});
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Employee Registration Form
      </h2>
      <form className="space-y-6">
        <input
          type="text"
          name="emp_id"
          placeholder="Employee ID"
          onChange={inputHandle}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              onChange={inputHandle}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              onChange={inputHandle}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={inputHandle}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contact <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="contact"
            placeholder="Contact"
            onChange={inputHandle}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gender <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={inputHandle}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm">Male</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={inputHandle}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm">Female</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="transgender"
                onChange={inputHandle}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm">Transgender</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="dob"
            onChange={inputHandle}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            name="address"
            rows="3"
            placeholder="Address"
            onChange={inputHandle}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Department <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="department"
              placeholder="Department"
              onChange={inputHandle}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Designation <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="designation"
              placeholder="Designation"
              onChange={inputHandle}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Profile Photo
          </label>
          <input
            type="file"
            accept="image/*"
            name="profilePic"
            onChange={fileHandle}
            className="mt-1 block w-full"
          />
        </div>

        {/* Date of Hired */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date of Hired <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="dateOfHired"
            onChange={inputHandle}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Date of Joined */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date of Joined <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="dateOfJoined"
            onChange={inputHandle}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={resetHandle}
            className="px-6 py-2 bg-gray-400 text-white rounded-md"
          >
            Reset
          </button>
          <button
            type="submit"
            onClick={submitHandle}
            className="px-6 py-2 bg-blue-600 text-white rounded-md"
          >
            Add Employee
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEmployee;
