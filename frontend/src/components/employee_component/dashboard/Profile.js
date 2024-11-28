import React, { useState } from "react";
import { FaEdit, FaPhoneAlt, FaBirthdayCake, FaMapMarkerAlt, FaGenderless, FaBriefcase, FaBuilding } from "react-icons/fa";

const Profile = ({ employee }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { 
    name, 
    designation, 
    image, 
    address, 
    office, 
    role, 
    houseAddress, 
    emergencyContact, 
    gender, 
    dob 
  } = employee;

  const handleEditClick = () => {
    setIsEditing(!isEditing);  // Toggle edit mode
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 ">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl font-semibold text-indigo-700">Profile Details</h3>
        <button
          onClick={handleEditClick}
          className="text-lg text-indigo-600 hover:text-indigo-800 flex items-center space-x-2"
        >
          <FaEdit />
          <span>Edit</span>
        </button>
      </div>

      <div className="flex items-center space-x-6 mb-8">
        {/* Profile Image */}
        <div className="w-24 h-24 rounded-full border-4 border-indigo-500 overflow-hidden">
          <img
            src={image || "https://via.placeholder.com/150"}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="text-2xl font-semibold text-gray-800">{name || "John Doe"}</h4>
          <p className="text-lg text-gray-600">{designation || "Software Engineer"}</p>
        </div>
      </div>

      {/* Employee Info */}
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <FaBriefcase className="text-indigo-600" />
          <span className="font-semibold text-lg">Role:</span>
          <span className="text-gray-700">{role || "Developer"}</span>
        </div>
        <div className="flex items-center space-x-4">
          <FaBuilding className="text-indigo-600" />
          <span className="font-semibold text-lg">Office:</span>
          <span className="text-gray-700">{office || "Headquarters"}</span>
        </div>
        <div className="flex items-center space-x-4">
          <FaMapMarkerAlt className="text-indigo-600" />
          <span className="font-semibold text-lg">Address:</span>
          <span className="text-gray-700">{address || "123 Main Street, City, State"}</span>
        </div>
        <div className="flex items-center space-x-4">
          <FaGenderless className="text-indigo-600" />
          <span className="font-semibold text-lg">Gender:</span>
          <span className="text-gray-700">{gender || "Not specified"}</span>
        </div>
        <div className="flex items-center space-x-4">
          <FaBirthdayCake className="text-indigo-600" />
          <span className="font-semibold text-lg">Date of Birth:</span>
          <span className="text-gray-700">{dob || "Not provided"}</span>
        </div>
        <div className="flex items-center space-x-4">
          <FaPhoneAlt className="text-indigo-600" />
          <span className="font-semibold text-lg">Emergency Contact:</span>
          <span className="text-gray-700">{emergencyContact || "Not provided"}</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="font-semibold text-lg text-indigo-600 cursor-pointer">
            Change Password
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
