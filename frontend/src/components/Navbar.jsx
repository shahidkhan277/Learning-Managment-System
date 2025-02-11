import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import axiosClient from "../axiosClient";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice"; // Import logout action

const Navbar = () => {
  const dispatch = useDispatch(); // Initialize dispatch
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to toggle dropdown

  const handleLogout = async () => {
    try {
      await axiosClient.post("/logout"); // Call API
      localStorage.removeItem("token"); // Remove token
      dispatch(logout()); // Update Redux state
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold text-primary">LMS</h1>

      {/* Profile Dropdown */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 focus:outline-none"
        >
          <FaUserCircle size={24} className="text-primary" />
          <span className="text-gray-700 dark:text-gray-300">Admin</span>
          <IoMdArrowDropdown size={20} className="text-gray-500" />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 shadow-md rounded-md z-10">
            <button
              onClick={() => console.log("Profile clicked")}
              className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
