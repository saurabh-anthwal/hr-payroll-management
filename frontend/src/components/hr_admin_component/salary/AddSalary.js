import React, { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import apiUrls from "../../../libs/apiUrls";
import axios_instance from "../../../libs/interseptor";

function AddSalary() {
  const history = useHistory()
  const [userDetails, setUserDetails] = useState([])
  const [input, setInput] = useState({
    employee: "",
    ppa: 0,
    monthly_salary: 0,
    basic_da: 0,
    hra: 0,
    conveyance: 0,
    pf: 0,
    esic: 0,
    professional_tax: 0,
    net_salary: 0,
  });

  const inputHandle = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const response = await axios_instance.post(apiUrls.ALL_EMPLOYEE_SALARY_DETAILS, input);
      if (response.status === 201) {
        alert("Employee salary added successfully!");
        history.push("/1/salary")
      } else {
        alert("Failed to add salary!");
      }
    } catch (error) {
      console.error("Failed to fetch salary details:", error);
      alert("An error occurred while adding salary!");
    }
  };

  useEffect(()=>{
    const abc = async()=>{
      try {
        const response = await axios_instance.get(apiUrls.USER_FIND, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if(response.status == 200){
          const verifiedUsers = response.data.filter((user)=>user.otp_verified === true)
          setUserDetails(verifiedUsers)
        }
      } catch (error) {
        console.error("Failed to get users:", error);
      }
    }
    abc()
  },[])

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Add Employee Salary</h2>
      <form onSubmit={submitHandle} className="space-y-6">
      <label className="block text-sm font-medium text-gray-700">
        Emp Id <span className="text-red-500">*</span>
      </label>
      <select
          name="employee"
          value={input.employee}
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
        {[
          { label: "PPA", name: "ppa" },
          { label: "Monthly Salary", name: "monthly_salary" },
          { label: "Basic DA", name: "basic_da" },
          { label: "HRA", name: "hra" },
          { label: "Conveyance", name: "conveyance" },
          { label: "PF", name: "pf" },
          { label: "ESIC", name: "esic" },
          { label: "Professional Tax", name: "professional_tax" },
          { label: "Net Salary", name: "net_salary" },
        ].map(({ label, name }) => (
          <InputField
            key={name}
            label={label}
            name={name}
            value={input[name]}
            onChange={inputHandle}
            placeholder={`Enter ${label}`}
          />
        ))}
        </div>
        {/* Submit Button */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            className="px-6 py-2 bg-gray-400 text-white rounded-md"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

// Reusable InputField Component
const InputField = ({ label, name, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">
      {label} <span className="text-red-500">*</span>
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm shadow-sm focus:outline-none "
    />
  </div>
);

export default AddSalary;
