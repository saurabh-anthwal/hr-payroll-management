import React, { useState, useEffect } from "react";
import axios from "axios";
import axios_instance from "../../../libs/interseptor";
import apiUrls from "../../../libs/apiUrls";

const AddBankDetails = () => {
  const [userDetails, setUserDetails] = useState([])
  const [formData, setFormData] = useState({
    account_holder_name: "",
    account_number: "",
    ifsc_code: "",
    bank_name: "",
    branch_name: "",
    employee: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;

    if (!formData.account_holder_name.trim()) {
      newErrors.account_holder_name = "Account holder name is required.";
    }
    if (!formData.account_number.trim()) {
      newErrors.account_number = "Account number is required.";
    } else if (formData.account_number.length < 9 || formData.account_number.length > 18) {
      newErrors.account_number = "Account number must be between 9 and 18 digits.";
    }
    if (!formData.ifsc_code.trim()) {
      newErrors.ifsc_code = "IFSC code is required.";
    } else if (!ifscRegex.test(formData.ifsc_code)) {
      newErrors.ifsc_code = "Invalid IFSC code format.";
    }
    if (!formData.bank_name.trim()) {
      newErrors.bank_name = "Bank name is required.";
    }
    if (!formData.employee.trim()) {
      newErrors.employee = "Employee ID is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
        const response = await axios_instance.post(apiUrls.ADD_BANK_DETAILS,formData, {
            headers: {
              "Content-Type": "application/json",
            },
          });
      setSuccessMessage("Bank details added successfully!");
      setFormData({
        account_holder_name: "",
        account_number: "",
        ifsc_code: "",
        bank_name: "",
        branch_name: "",
        employee: "",
      });
      setErrors({});
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors({ general: error.response.data.error || "Something went wrong." });
      } else {
        setErrors({ general: "Unable to connect to the server." });
      }
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
      <h2 className="text-xl font-bold mb-4">Add Bank Details</h2>

      {successMessage && (
        <div className="p-2 mb-4 text-green-800 bg-green-200 rounded">
          {successMessage}
        </div>
      )}

      {errors.general && (
        <div className="p-2 mb-4 text-red-800 bg-red-200 rounded">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Account Holder Name */}
        <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
        Account Holder Name <span className="text-red-500">*</span>
    </label>
          <input
            type="text"
            name="account_holder_name"
            value={formData.account_holder_name}
            onChange={handleChange}
            className="customTextInput"
          />
          {errors.account_holder_name && (
            <p className="text-red-600 text-sm mt-1">{errors.account_holder_name}</p>
          )}
        </div>

        {/* Account Number */}
        <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
        Account Number <span className="text-red-500">*</span>
    </label>
          <input
            type="text"
            name="account_number"
            value={formData.account_number}
            onChange={handleChange}
            className="customTextInput"
          />
          {errors.account_number && (
            <p className="text-red-600 text-sm mt-1">{errors.account_number}</p>
          )}
        </div>
        </div>

        {/* IFSC Code */}
        <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
        IFSC Code <span className="text-red-500">*</span>
    </label>
          <input
            type="text"
            name="ifsc_code"
            value={formData.ifsc_code}
            onChange={handleChange}
            className="customTextInput"
          />
          {errors.ifsc_code && (
            <p className="text-red-600 text-sm mt-1">{errors.ifsc_code}</p>
          )}
        </div>

        {/* Bank Name */}
        <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
        Bank Name <span className="text-red-500">*</span>
    </label>
          <input
            type="text"
            name="bank_name"
            value={formData.bank_name}
            onChange={handleChange}
            className="customTextInput"
          />
          {errors.bank_name && (
            <p className="text-red-600 text-sm mt-1">{errors.bank_name}</p>
          )}
        </div>
        </div>

        {/* Branch Name */}
        <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
        Branch Name
    </label>
          <input
            type="text"
            name="branch_name"
            value={formData.branch_name}
            onChange={handleChange}
            className="customTextInput"
          />
        </div>

        {/* Employee */}
        <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
        Employee ID <span className="text-red-500">*</span>
    </label>
    <select
          name="employee"
          value={formData.employee}
          onChange={handleChange}
          className="selectInput"
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
          {errors.employee && (
            <p className="text-red-600 text-sm mt-1">{errors.employee}</p>
          )}
        </div>
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            className="formCancelBtn"
          >
            Reset
          </button>
        <button
          type="submit"
          className="formSubmitBtn"
        >
          Submit
        </button>
        </div>
      </form>
    </div>
  );
};

export default AddBankDetails;
