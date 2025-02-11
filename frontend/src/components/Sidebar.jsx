import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaTachometerAlt, FaBook, FaUsers, FaChalkboardTeacher, FaCog } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar state

  const sidebarLinks = [
    { name: "Dashboard", path: "/", icon: <FaTachometerAlt /> },
    { name: "Courses", path: "/courses", icon: <FaBook /> },
    { name: "Students", path: "/students", icon: <FaUsers /> },
    { name: "Instructors", path: "/instructors", icon: <FaChalkboardTeacher /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
  ];
  
  return (
    <div
      className={`h-screen bg-darkgray text-white flex flex-col transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4">
        <h2 className={`${isOpen ? "text-xl" : "hidden"} font-bold`}>LMS</h2>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Sidebar Links */}
      <nav className="mt-4 flex-1">
        {sidebarLinks.map((link) => (
          <Link
            to={link.path}
            key={link.name}
            className="flex items-center p-3 hover:bg-primarylight transition duration-200"
          >
            <span className="text-lg ml-2">{link.icon}</span>
            <span className={`ml-4 ${!isOpen && "hidden"}`}>{link.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
