import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient, { initializeCsrfToken } from "../axiosClient";
import axios from "axios";

const CreatePermissions = () => {
    const [role, setRole] = useState(""); // Selected Role (Teacher/Student)
    const [name, setName] = useState(""); // Permission Name
    const [error, setError] = useState({
        role: "",
        name: "",
        general: "",
    });
    const [loading, setLoading] = useState(false);

  
    

    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({ role: "", name: "", general: "" });
    
        let formErrors = {};
        if (!role) formErrors.role = "Role is required.";
        if (!name) formErrors.name = "Permission name is required.";
    
        if (Object.keys(formErrors).length > 0) {
            setError(formErrors);
            return;
        }
    
        try {
            setLoading(true);  
            await initializeCsrfToken();
            // 🔹 Make API request
            const response = await axiosClient.post(
                "/permissions",
                { role, name },
                {
                    headers: {
                        "Content-Type": "application/json",
                        withCredentials: true,
                        withXSRFToken: true,
                    },
                }
            );
    
            if (response.status === 201) {
                navigate("/settings/permissions");
            } else {
                setError((prev) => ({
                    ...prev,
                    general: "Failed to create permission.",
                }));
            }
        } catch (err) {
            console.error("Error creating permission:", err.response?.data || err);
            setError((prev) => ({
                ...prev,
                general: err.response?.data?.message || "Failed to create permission.",
            }));
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="max-w-xl mx-auto  mt-10 p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-200 mb-6">
                Add New Permission
            </h2>

            {error.general && (
                <p className="text-red-500 mb-3">{error.general}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Role Selection */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
                        Select Role
                    </label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className={`w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white ${
                            error.role ? "border-red-500" : "border-gray-300"
                        }`}
                    >
                        <option value="">Choose a role</option>
                        <option value="teacher">Teacher</option>
                        <option value="student">Student</option>
                    </select>
                    {error.role && (
                        <p className="text-red-500 text-sm mt-1">
                            {error.role}
                        </p>
                    )}
                </div>

                {/* Permission Name */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
                        Permission Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter permission name"
                        className={`w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white ${
                            error.name
                                ? "border-red-500"
                                : "border-gray-300"
                        }`}
                    />
                    {error.name && (
                        <p className="text-red-500 text-sm mt-1">
                            {error.name}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-white py-2 rounded-md hover:bg-primarylight transition disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Save Permission"}
                </button>
            </form>
        </div>
    );
};

export default CreatePermissions;
