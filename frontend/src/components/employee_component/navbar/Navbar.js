import React from "react";
import { HiOutlineUser } from "react-icons/hi2";
import { IoLogOutOutline } from "react-icons/io5";
import { useHistory } from "react-router-dom";

const Navbar = () => {
  const history = useHistory()
  const handleLogout = ()=>{
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("type")
    history.push("/")
  }
  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-3 px-5">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="https://dataclaps.com/wp-content/uploads/2020/09/Screenshot-2023-03-18-at-2.36.25-AM.png"
            alt="Logo"
            className="w-28"
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center space-x-6">
          <button className="text-white font-semibold uppercase hover:bg-blue-700 px-4 py-2 rounded">
            Home
          </button>
          <button className="text-white font-semibold uppercase hover:bg-blue-700 px-4 py-2 rounded">
            Salary
          </button>
          <button className="text-white font-semibold hover:bg-blue-700 p-2 rounded">
            <HiOutlineUser size={20} />
          </button>
          <button onClick={handleLogout} className="text-white font-semibold hover:bg-blue-700 p-2 rounded">
            <IoLogOutOutline size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
