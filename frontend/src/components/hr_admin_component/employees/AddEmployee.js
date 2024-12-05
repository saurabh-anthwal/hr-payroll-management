import React, { useState } from "react";
import axios_instance from "../../../libs/interseptor";
import apiUrls from "../../../libs/apiUrls";

const AddEmployee = () => {
  const [step, setStep] = useState(1); // Step 1: Collect Details, Step 2: Verify OTP
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    otp: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error when user types
  };

  const validateStepOne = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.username) {
      newErrors.username = "Username is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStepTwo = () => {
    const newErrors = {};
    if (!formData.otp) {
      newErrors.otp = "OTP is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = async () => {
    if (!validateStepOne()) return;

    setLoading(true);
    setMessage("");
    const payload = {
      email: formData.email,
      username: formData.username,
      password: formData.password,
      type: "EMPLOYEE",
    };

    try {
      await axios_instance.post(apiUrls.HR_REGISTER_OTP, payload);
      setLoading(false);
      setMessage("OTP sent successfully!");
      setStep(2);
    } catch (error) {
      setLoading(false);
      setMessage(error.response?.data?.message || "Failed to send OTP.");
    }
  };

  const handleVerifyOtp = async () => {
    if (!validateStepTwo()) return;

    setLoading(true);
    setMessage("");
    const payload = {
      email: formData.email,
      otp: formData.otp,
      password: formData.password,
    };

    try {
      await axios_instance.post(apiUrls.HR_REGISTER_OTP_VERIFY, payload);
      setLoading(false);
      setMessage("Employee added successfully!");
      setStep(1);
      setFormData({ email: "", username: "", password: "", otp: "" });
    } catch (error) {
      setLoading(false);
      setMessage(error.response?.data?.message || "Failed to verify OTP.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
    <h2 className="text-xl font-bold text-gray-800 mb-4">Register New Employee</h2>

      {step === 1 && (
        <div>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm shadow-sm focus:outline-none "
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700">
            Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm shadow-sm focus:outline-none "
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700">
            Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm shadow-sm focus:outline-none "
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700">
            Select User Type <span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              id="type"
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm shadow-sm focus:outline-none "
            >
              <option value="ADMIN">ADMIN</option>
              <option value="EMPLOYEE">EMPLOYEE</option>
              <option value="HR">HR</option>
              <option value="MANAGER">MANAGER</option>
            </select>
          </div>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            className="px-6 py-2 bg-gray-400 text-white rounded-md"
          >
            Reset
          </button>
          <button
            onClick={handleSendOtp}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">Enter OTP</label>
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              placeholder="Enter OTP"
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm shadow-sm focus:outline-none "
              required
            />
            {errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp}</p>}
          </div>
          <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            className="px-6 py-2 bg-gray-400 text-white rounded-md"
          >
            Reset
          </button>
          <button
            onClick={handleVerifyOtp}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md"
          >
            {loading ? "Verifying OTP..." : "Verify OTP"}
          </button>
          </div>
        </div>
      )}

      {message && <p className="mt-6 text-center text-red-500 font-medium">{message}</p>}
    </div>
  );
};

export default AddEmployee;
