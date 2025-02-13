import React from "react";
import { Link } from "react-router-dom";
import { FaUserTie, FaUserGraduate, FaPlus } from "react-icons/fa";

const Permissions = () => {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-darkgray ">
          Manage Permissions
        </h1>
        <Link
          to="/settings/permissions/create"
          className="flex items-center bg-primary text-white px-4 py-2 rounded-md hover:bg-primarylight transition"
        >
          <FaPlus className="mr-2" />
          Add Permission
        </Link>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Teacher Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center">
          <FaUserTie size={50} className="text-primary mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Teacher Permissions
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center my-3">
            Manage permissions for teachers.
          </p>
          <Link
            to="/permissions/teacher"
            className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primarylight transition"
          >
            View Permissions
          </Link>
        </div>

        {/* Student Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center">
          <FaUserGraduate size={50} className="text-primary mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Student Permissions
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center my-3">
            Manage permissions for students.
          </p>
          <Link
            to="/permissions/student"
            className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primarylight transition"
          >
            View Permissions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Permissions;
