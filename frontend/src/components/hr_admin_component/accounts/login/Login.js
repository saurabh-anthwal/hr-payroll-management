import React, { useState, useEffect } from "react";
import { MdPerson, MdVpnKey, MdVisibility, MdVisibilityOff } from "react-icons/md"; // Importing React Icons
import { Redirect, useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  async function submitHandle(e) {
    e.preventDefault();

    const response = await fetch(`http://127.0.0.1:8000/api/admin-login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response?.ok) {
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      localStorage.setItem("userName", data.username);
      history.push("/home");
    } else {
      setError("Invalid credentials.");
    }
  }

  useEffect(() => {
    setError("");
  }, [username, password]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-gray-800">
      <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm" onSubmit={submitHandle}>
        <legend className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</legend>
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

        <div className="mb-6 relative">
          <MdVpnKey className="absolute left-3 top-3 text-gray-500" />
          <input
            type={showPassword ? "text" : "password"} // Toggle between text and password types
            placeholder="Password"
            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-500"
            onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
          >
            {showPassword ? <MdVisibilityOff /> : <MdVisibility />} {/* Show/Hide Icon */}
          </button>
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="w-full p-3 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Login
          </button>
        </div>
        <div className="flex justify-center text-blue-700 hover:text-blue-500">
          <button
            type="button"
            onClick={() => history.push("/register")}
          >Create new account?</button>
        </div>
      </form>
    </div>
  );
}

export function Logout() {
  return <Redirect to="/" />;
}

export default Login;
