import React, { useState, useEffect } from "react";
import {
  FaEdit,
  FaPhoneAlt,
  FaBirthdayCake,
  FaMapMarkerAlt,
  FaGenderless,
  FaBriefcase,
  FaEnvelope,
} from "react-icons/fa";
import axios_instance from "../../../libs/interseptor";
import * as URLS from "../../../libs/apiUrls";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [employee, setEmployee] = useState(null);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const get_profile = async () => {
    try {
      const response = await axios_instance.get(URLS.HR_DETAILS);
      setEmployee(response.data);
    } catch (error) {
      console.error("Failed to fetch profile details:", error);
    }
  };

  useEffect(() => {
    get_profile();
  }, []);

  if (!employee) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h3 className="text-3xl font-semibold">Loading...</h3>
      </div>
    );
  }

  const {
    firstname,
    lastname,
    designation,
    profilePic,
    address,
    department,
    gender,
    dob,
    contact,
    email,
  } = employee;

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gray-50 shadow-lg rounded-lg mt-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-10 border-b pb-4">
        <h3 className="text-3xl font-bold ">Profile Details</h3>
        <button
          onClick={handleEditClick}
          className="px-4 py-2 flex items-center space-x-2"
        >
          <FaEdit />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* Profile Section */}
      <div className="flex items-center bg-white p-6 rounded-lg shadow-md">
        <div className="w-28 h-28 overflow-hidden">
          <img
            src={"https://storage.googleapis.com/a1aa/image/fM4bjeZeUVEdlp65TEuJT7c7VaheI9jMDLnNOejMHijfZ9y9E.jpg" || profilePic}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-6">
          <h4 className="text-2xl font-bold text-gray-800 uppercase">
            {`${firstname} ${lastname}`}
          </h4>
          <p className="text-lg text-gray-600 font-semibold uppercase">{designation || "N/A"}</p>
        </div>
      </div>

      {/* Information Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <FaBriefcase className="" />
            <span className="font-semibold text-lg">Department:</span>
            <span className="text-gray-700">{department || "N/A"}</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <FaMapMarkerAlt className="" />
            <span className="font-semibold text-lg">Address:</span>
            <span className="text-gray-700">{address || "N/A"}</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <FaGenderless className="" />
            <span className="font-semibold text-lg">Gender:</span>
            <span className="text-gray-700">{gender || "Not specified"}</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <FaBirthdayCake className="" />
            <span className="font-semibold text-lg">Date of Birth:</span>
            <span className="text-gray-700">{dob || "N/A"}</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <FaPhoneAlt className="" />
            <span className="font-semibold text-lg">Contact:</span>
            <span className="text-gray-700">{contact || "N/A"}</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <FaEnvelope className="" />
            <span className="font-semibold text-lg">Email:</span>
            <span className="text-gray-700">{email || "N/A"}</span>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-10 text-center">
        <button className="px-6 py-2 bg-black text-white rounded-lg shadow-md ">
          Change Password
        </button>
      </div>
    </div>
  );
};

export default Profile;
