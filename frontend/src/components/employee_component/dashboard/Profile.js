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
import * as utils from "../../../libs/utils";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [employee, setEmployee] = useState({});
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [department, setDepartment] = useState("");
  const [dob, setDob] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [designation, setDesignation] = useState("HR");

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const get_profile = async () => {
    try {
      const response = await axios_instance.get(URLS.HR_DETAILS);
      setEmployee(response.data);
      handleSetData(response.data);
    } catch (error) {
      console.error("Failed to fetch profile details:", error);
    }
  };

  const handleSetData = (data) => {
    setFirstName(data.firstname);
    setLastName(data.lastname);
    setPhoneNumber(data.contact);
    setDepartment(data.department);
    setDob(data.dob);
    setDesignation(designation);
    setGender(data.gender);
    setEmail(data.email)
    setAddress(data.address);
    setProfileImg(data.profilePic);
  }

  const handleCancel = () => {
    handleSetData(employee);
    setIsEditing(false)
  }

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      "firstname": firstName,
      "lastname": lastName,
      "email": email,
      "contact": phoneNumber,
      "gender": gender,
      "dob": dob,
      "address": address,
      "department": department,
      "designation": designation,
      // "profilePic": "/media/hr/profile-picture.png",
      "dateOfHired": employee.dateOfHired,
      "dateOfJoined": employee.dateOfJoined
    }

    console.log(employee?.id)

    axios_instance.put(utils.format(URLS.EMPLOYEE_EDIT, [employee?.id]), payload)
      .then((response) => {
        setEmployee(response.data);
        handleSetData(response.data);
      }).catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className=" text-gray-500 mx-4 bg-gray-50 shadow-lg rounded-lg mt-3  ">
      {/* Header */}
      <div className="flex justify-between items-center mb-10 border-b pl-8 pr-8 py-2">
        <h3 className="text-xl text-gray-500 font-bold ">Profile Details</h3>
        {!isEditing && <button
          onClick={handleEditClick}
          className=" flex gap-2 rounded-3xl bg-blue-400 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-blue-400 focus:shadow-none active:bg-blue-400 hover:bg-blue-500 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" 
          type="button"
        >
          <FaEdit />
          <span>Edit Profile</span>
        </button>}
      </div>

      {/* Profile Section */}
      <div className="flex items-center pl-12 rounded-lg ">
        <label htmlFor="fileToUpload">
          <div
            className="relative flex items-center justify-center w-24 h-24 bg-cover bg-center bg-no-repeat rounded-full cursor-pointer transition-all duration-300 ease-in-out"
            style={{ backgroundImage:  `url(${profileImg ? profileImg : 'https://storage.googleapis.com/a1aa/image/fM4bjeZeUVEdlp65TEuJT7c7VaheI9jMDLnNOejMHijfZ9y9E.jpg' })` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-full flex items-center justify-center">
              <span className="text-white text-sm">Change Image</span>
            </div>
          </div>
        </label>
        <input
          type="file"
          name="fileToUpload"
          id="fileToUpload"
          className="hidden"
        />
        
        {/* <div className="w-28 h-28 overflow-hidden rounded-full">
          <img
            src={"https://storage.googleapis.com/a1aa/image/fM4bjeZeUVEdlp65TEuJT7c7VaheI9jMDLnNOejMHijfZ9y9E.jpg" || profilePic}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div> */}
        <div className="ml-6 flex flex-col ">
          <h4 className="text-2xl font-bold text-gray-500 " >
            {`${firstName} ${lastName}`}
          </h4>
          <p className="text-lg text-gray-600 font-semibold uppercase">{email || "N/A"}</p>
        </div>
      </div>

      {/* Information Section */}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 p-6 gap-4">

        <div className="grid grid-cols-5 gap-2 items-center">
          <label className="text-gray-800 col-span-1 text-sm mb-2   ">First Name :</label>
          <div className="relative col-span-4 flex items-center w-full">
            <input
              name="first_name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-2 rounded-lg outline-blue-400"
              placeholder="Enter first name"
              readOnly ={!isEditing}
            />
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 items-center">
          <label className="text-gray-800 col-span-1 text-sm mb-2">Last Name :</label>
          <div className="relative col-span-4 flex items-center w-full">
            <input
              name="last_name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-2 rounded-lg outline-blue-400"
              placeholder="Enter last name"
              readOnly ={!isEditing}
            />
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 items-center">
          <label className="text-gray-800 text-sm mb-2 col-span-1">Email :</label>
          <div className="relative col-span-4 flex items-center w-full">
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-2 rounded-lg outline-blue-400"
              placeholder="Enter your email"
              readOnly ={!isEditing}
            />
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 items-center">
          <label className="text-gray-800 col-span-1 text-sm mb-2   ">Phone Number :</label>
          <div className="relative col-span-4 flex items-center w-full">
            <input
              name="phone_number"
              type="number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-2 rounded-lg outline-blue-5    00"
              placeholder="Enter Phone Number"
              readOnly ={!isEditing}
            />
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 items-center">
          <label className="text-gray-800 col-span-1 text-sm mb-2   ">Gender :</label>
          <div className="relative col-span-4 flex items-center w-full">
            <select 
              id="gender"
              value={gender} 
              class="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg outline-blue-400 focus:ring-blue-400 focus:border-blue-500 block w-full p-2.5  "
              onChange={(e) => setGender(e.target.value)}
              readOnly ={!isEditing}
            >
              <option selected>Choose a gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 items-center">
          <label className="text-gray-800 col-span-1 text-sm mb-2   ">Date of Birth :</label>
          <div className="relative col-span-4 flex items-center w-full">
            <input
              name="date"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
              className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-2 rounded-lg outline-blue-400"
              placeholder="Enter date of birth "
              readOnly ={!isEditing}
            />
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 items-center">
          <label className="text-gray-800 col-span-1 text-sm mb-2   ">Department :</label>
          <div className="relative col-span-4 flex items-center w-full">
            <input
              name="department"
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
              className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-2 rounded-lg outline-blue-400"
              placeholder="Enter Department"
              readOnly ={!isEditing}
            />
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 items-center">
          <label className="text-gray-800 col-span-1 text-sm mb-2   ">Address :</label>
          <div className="relative col-span-4 flex items-center w-full">
            <input
              name="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-2 rounded-lg outline-blue-400"
              placeholder="Enter Address"
              readOnly ={!isEditing}
            />
          </div>
        </div>

        {isEditing && <div className="flex justify-end col-span-2 gap-2">
          <button 
            onClick={handleCancel}
            className="rounded-full border py-2 px-4 text-center text-sm transition-all shadow-sm  border-red-500 hover:shadow-lg text-slate-600 hover:text-slate-600 hover:bg-slate-200  disabled:pointer-events-none " 
            type="button"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-full border bg-lime-500 py-2 px-4 text-center text-sm transition-all text-white border-green-400 shadow-sm hover:shadow-lg hover:bg-green-500  disabled:pointer-events-none " 
          >
            Save
          </button>
        </div>}

      </form>

      {/* Footer Actions */}
      {/* <div className="mt-8 pb-8 text-center">
        <button className="px-6 py-2 bg-black text-white rounded-lg shadow-md ">
          Change Password
        </button>
      </div> */}
    </div>
  );
};

export default Profile;
