import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { MdPerson, MdEmail, MdVpnKey, MdVisibility, MdVisibilityOff } from "react-icons/md"; // Import React Icons for username, email, password

function Register() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function submitHandle(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const response = await fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    if (response?.ok) {
      setSuccess(true);
    } else {
      setError(data.message || "Registration failed. Please try again.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-gray-800">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm"
        onSubmit={submitHandle}
      >
        <legend className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Register
        </legend>
        {error && <span className="block text-red-500 text-center mb-4">{error}</span>}

        <div className="mb-4 relative">
          <MdPerson className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Username"
            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-4 relative">
          <MdEmail className="absolute left-3 top-3 text-gray-500" />
          <input
            type="email"
            placeholder="Email"
            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4 relative">
          <MdVpnKey className="absolute left-3 top-3 text-gray-500" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div
            className="absolute right-3 top-3 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
          </div>
        </div>

        <div className="mb-6 relative">
          <MdVpnKey className="absolute left-3 top-3 text-gray-500" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div
            className="absolute right-3 top-3 cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <MdVisibilityOff /> : <MdVisibility />}
          </div>
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="w-full p-3 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Register
          </button>
        </div>
        <div className="flex justify-center text-blue-700 hover:text-blue-500">
          <button
            type="button"
            onClick={() => history.push("/login")}
          >Already have an account?</button>
        </div>
        {success && <Redirect to="/login" />}
      </form>
    </div>
  );
}

export default Register;
