import React, { useEffect, useState } from "react";
import apiUrls from "../../../libs/apiUrls";
import axios_instance from "../../../libs/interseptor";
import { useHistory } from "react-router-dom";

function UpdateEmployee({ emp_type }) {
  const history = useHistory();
  const [userDetails, setUserDetails] = useState([]);
  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
    gender: "",
    dob: "",
    address: "",
    department: "",
    designation: "",
    dateOfHired: "",
    dateOfJoined: "",
    active: true,
    user: "",
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
    const formData = new FormData();
    Object.keys(input).forEach((key) => {
      formData.append(key, input[key]);
    });
    if (file.profilePic) {
      formData.append("profilePic", file.profilePic);
    }

    const url = emp_type === "Employee" ? apiUrls.EMPLOYEE_DETAILS_ADD : emp_type === "Manager" ? apiUrls.MANAGER_DETAILS_ADD : "not-found";
    
    try {
      const response = await axios_instance.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(`${emp_type} Added Successfully!`);
      history.push("/1/view-employees");
    } catch (error) {
      console.error(`Failed to add ${emp_type.toLowerCase()}:`, error);
      alert(`Failed to add ${emp_type.toLowerCase()}. Please try again.`);
    }
  };

  const resetHandle = () => {
    setInput({
      firstname: "",
      lastname: "",
      email: "",
      contact: "",
      gender: "",
      dob: "",
      address: "",
      department: "",
      designation: "",
      dateOfHired: "",
      dateOfJoined: "",
      active: true,
      user: "",
    });
    setFile({});
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const url = apiUrls.USER_FIND
      try {
        const response = await axios_instance.get(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          const verifiedUsers = response.data.filter(
            (user) => 
              user.otp_verified === true &&
              user.type === (emp_type === "Employee" ? "EMPLOYEE" : emp_type === "Manager" ?"MANAGER" : "")
          );
          setUserDetails(verifiedUsers);
        }
      } catch (error) {
        console.error(`Failed to get ${emp_type.toLowerCase()}s:`, error);
      }
    };
    fetchUsers();
  }, [emp_type]);

  return (
    <div className="mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Employee Registration Form</h2>
      <form className="space-y-6">
        <label className="block text-sm font-medium text-gray-700">
          Emp Id <span className="text-red-500">*</span>
        </label>
        <select
          name="user"
          value={input.user}
          onChange={inputHandle}
          className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm shadow-sm focus:outline-none"
        >
          <option value="" disabled>
            Select Employee by Email
          </option>
          {userDetails.map((user) => (
            <option key={user.id} value={user.id}>
              {user.email}
            </option>
          ))}
        </select>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstname"
              value={input.firstname}
              onChange={inputHandle}
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm shadow-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastname"
              value={input.lastname}
              onChange={inputHandle}
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm shadow-sm focus:outline-none"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={inputHandle}
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm shadow-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="contact"
              value={input.contact}
              onChange={inputHandle}
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm shadow-sm focus:outline-none"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
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
                  checked={input.gender === "male"}
                  onChange={inputHandle}
                />
                <span className="ml-2 text-sm">Male</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={input.gender === "female"}
                  onChange={inputHandle}
                />
                <span className="ml-2 text-sm">Female</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="transgender"
                  checked={input.gender === "transgender"}
                  onChange={inputHandle}
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
              value={input.dob}
              onChange={inputHandle}
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm shadow-sm focus:outline-none"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Department <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="department"
              value={input.department}
              onChange={inputHandle}
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm shadow-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Designation <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="designation"
              value={input.designation}
              onChange={inputHandle}
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm shadow-sm focus:outline-none"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Hired <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="dateOfHired"
              value={input.dateOfHired}
              onChange={inputHandle}
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm shadow-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Joined <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="dateOfJoined"
              value={input.dateOfJoined}
              onChange={inputHandle}
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm shadow-sm focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            name="address"
            value={input.address}
            onChange={inputHandle}
            className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm shadow-sm focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Profile Picture
          </label>
          <input
            type="file"
            name="profilePic"
            onChange={fileHandle}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-lg file:border file:border-gray-300 file:bg-gray-100 file:px-4 file:py-2 file:text-gray-600 file:shadow-sm focus:outline-none"
          />
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            className="px-6 py-2 bg-gray-400 text-white rounded-md"
            onClick={resetHandle}
          >
            Reset
          </button>

          <button
            type="submit"
            onClick={submitHandle}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateEmployee;
