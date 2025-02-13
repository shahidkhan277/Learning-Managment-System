import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaBook,
  FaUsers,
  FaChalkboardTeacher,
  FaCog,
  FaChevronDown,
  FaChevronUp,
  FaUserShield,
  FaUser,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar state
  const [openDropdown, setOpenDropdown] = useState(null); // Tracks which dropdown is open

  // Define sidebar links dynamically
  const sidebarLinks = [
    { name: "Dashboard", path: "/", icon: <FaTachometerAlt /> },
    { name: "Courses", path: "/courses", icon: <FaBook /> },
    { name: "Students", path: "/students", icon: <FaUsers /> },
    { name: "Instructors", path: "/instructors", icon: <FaChalkboardTeacher /> },
    {
      name: "Settings",
      icon: <FaCog />,
      children: [
        { name: "Permissions", path: "/settings/permissions", icon: <FaUserShield /> },
        { name: "Profile", path: "/settings/profile", icon: <FaUser /> },
      ],
    },
  ];

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

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
      <nav className="ml-2 mt-4 flex-1">
        {sidebarLinks.map((link) => (
          <div key={link.name} className="relative">
            {/* Parent Item */}
            <button
              onClick={() => link.children ? toggleDropdown(link.name) : null}
              className="flex items-center w-full p-3 hover:bg-primarylight transition duration-200"
            >
              <span className="text-lg">{link.icon}</span>
              <span className={`ml-4 mx-4 ${!isOpen && "hidden"}`}>{link.name}</span>
              {link.children && (
                <span className="ml-auto">
                  {openDropdown === link.name ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              )}
            </button>

            {/* Dropdown Menu */}
            {link.children && openDropdown === link.name && (
              <div className="ml-6 transition-all duration-300">
                {link.children.map((child) => (
                  <Link
                    to={child.path}
                    key={child.name}
                    className="flex items-center p-3 hover:bg-primary ease-in-out duration-300"
                  >
                    <span className="text-lg">{child.icon}</span>
                    <span className={`ml-4 ${!isOpen && "hidden"}`}>{child.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
