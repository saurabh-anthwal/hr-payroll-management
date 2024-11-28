import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";

function Navbar() {
  const history = useHistory();
  const location = useLocation(); // Get the current path
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userName = localStorage.getItem("userName") || "User";
  
  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userName");
    history.push("/");
  };

  const isActive = (path) => location.pathname === path; // Check if path is active

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="https://dataclaps.com/wp-content/uploads/2020/09/Screenshot-2023-03-18-at-2.36.25-AM.png"
            alt="Logo"
            className="w-28"
          />
        </Link>

        {/* Navbar Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/home"
            className={`${
              isActive("/home") ? "text-white font-bold" : "text-gray-300"
            } hover:text-white`}
          >
            Home
          </Link>
          <Link
            to="/salary"
            className={`${
              isActive("/salary") ? "text-white font-bold" : "text-gray-300"
            } hover:text-white`}
          >
            Salary
          </Link>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              Employees
            </button>
            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute bg-gray-700 mt-2 rounded shadow-lg">
                <Link
                  to="/add-employee"
                  className={`block px-4 py-2 text-sm ${
                    isActive("/add-employee")
                      ? "text-white font-bold bg-gray-600"
                      : "text-gray-300"
                  } hover:text-white hover:bg-gray-600`}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Add Employee
                </Link>
                <Link
                  to="/view-employees"
                  className={`block px-4 py-2 text-sm ${
                    isActive("/view-employees")
                      ? "text-white font-bold bg-gray-600"
                      : "text-gray-300"
                  } hover:text-white hover:bg-gray-600`}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  View Employees
                </Link>
              </div>
            )}
          </div>
          <Link
            to="/admin-panel"
            className={`${
              isActive("/admin-panel") ? "text-white font-bold" : "text-gray-300"
            } hover:text-white`}
          >
            Admin Panel
          </Link>
        </div>

        {/* User Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-gray-300">Welcome, <span className="text-white font-bold">{userName}</span></span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded"
          >
            <RiLogoutCircleRLine size={20} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden bg-gray-800">
        <div className="flex justify-end p-3">
          <button
            className="text-gray-300 hover:text-white"
            onClick={() => {
              const menu = document.getElementById("mobileMenu");
              menu.classList.toggle("hidden");
            }}
          >
            ☰
          </button>
        </div>
        <div id="mobileMenu" className="hidden space-y-2 px-4 pb-4">
          <Link
            to="/home"
            className={`block ${
              isActive("/home") ? "text-white font-bold" : "text-gray-300"
            } hover:text-white`}
          >
            Home
          </Link>
          <Link
            to="/salary"
            className={`block ${
              isActive("/salary") ? "text-white font-bold" : "text-gray-300"
            } hover:text-white`}
          >
            Salary
          </Link>
          <Link
            to="/add-employee"
            className={`block ${
              isActive("/add-employee") ? "text-white font-bold" : "text-gray-300"
            } hover:text-white`}
          >
            Add Employee
          </Link>
          <Link
            to="/view-employees"
            className={`block ${
              isActive("/view-employees") ? "text-white font-bold" : "text-gray-300"
            } hover:text-white`}
          >
            View Employees
          </Link>
          <Link
            to="/admin-panel"
            className={`block ${
              isActive("/admin-panel") ? "text-white font-bold" : "text-gray-300"
            } hover:text-white`}
          >
            Admin Panel
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
