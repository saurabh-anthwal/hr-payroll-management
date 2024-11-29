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
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="https://dataclaps.com/wp-content/uploads/2020/09/Screenshot-2023-03-18-at-2.36.25-AM.png"
            alt="Logo"
            className="w-28"
          />
        </Link>

        {/* Navbar Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/home"
            className={`${
              isActive("/home") ? "text-indigo-600 font-semibold" : "text-gray-600"
            } hover:text-indigo-700 transition-colors duration-300`}
          >
            Home
          </Link>
          <Link
            to="/salary"
            className={`${
              isActive("/salary") ? "text-indigo-600 font-semibold" : "text-gray-600"
            } hover:text-indigo-700 transition-colors duration-300`}
          >
            Salary
          </Link>

          {/* Dropdown for Employees */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`${
                isActive("/add-employee") || isActive("/view-employees")
                  ? "text-indigo-600 font-semibold"
                  : "text-gray-600"
              } hover:text-indigo-700 transition-colors duration-300 focus:outline-none`}
            >
              Employees
            </button>
            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute bg-white shadow-lg rounded-lg mt-2 w-48 z-20">
                <Link
                  to="/add-employee"
                  className={`block px-4 py-2 text-sm ${
                    isActive("/add-employee")
                      ? "text-indigo-600 font-semibold"
                      : "text-gray-600"
                  } hover:bg-indigo-50 hover:text-indigo-700`}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Add Employee
                </Link>
                <Link
                  to="/view-employees"
                  className={`block px-4 py-2 text-sm ${
                    isActive("/view-employees")
                      ? "text-indigo-600 font-semibold"
                      : "text-gray-600"
                  } hover:bg-indigo-50 hover:text-indigo-700`}
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
              isActive("/admin-panel") ? "text-indigo-600 font-semibold" : "text-gray-600"
            } hover:text-indigo-700 transition-colors duration-300`}
          >
            Admin Panel
          </Link>
        </div>

        {/* User Section */}
        <div className="flex items-center space-x-6">
          <span className="text-gray-600">Welcome, <span className="text-black font-semibold">{userName}</span></span>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
          >
            <RiLogoutCircleRLine size={20} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden bg-white shadow-md">
        <div className="flex justify-between p-4">
          <button
            className="text-gray-600 hover:text-indigo-600"
            onClick={() => {
              const menu = document.getElementById("mobileMenu");
              menu.classList.toggle("hidden");
            }}
          >
            ☰
          </button>
        </div>
        <div id="mobileMenu" className="hidden space-y-4 px-6 pb-4">
          <Link
            to="/home"
            className={`block ${
              isActive("/home") ? "text-indigo-600 font-semibold" : "text-gray-600"
            } hover:text-indigo-700 transition-colors duration-300`}
          >
            Home
          </Link>
          <Link
            to="/salary"
            className={`block ${
              isActive("/salary") ? "text-indigo-600 font-semibold" : "text-gray-600"
            } hover:text-indigo-700 transition-colors duration-300`}
          >
            Salary
          </Link>
          <Link
            to="/add-employee"
            className={`block ${
              isActive("/add-employee") ? "text-indigo-600 font-semibold" : "text-gray-600"
            } hover:text-indigo-700 transition-colors duration-300`}
          >
            Add Employee
          </Link>
          <Link
            to="/view-employees"
            className={`block ${
              isActive("/view-employees") ? "text-indigo-600 font-semibold" : "text-gray-600"
            } hover:text-indigo-700 transition-colors duration-300`}
          >
            View Employees
          </Link>
          <Link
            to="/admin-panel"
            className={`block ${
              isActive("/admin-panel") ? "text-indigo-600 font-semibold" : "text-gray-600"
            } hover:text-indigo-700 transition-colors duration-300`}
          >
            Admin Panel
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
