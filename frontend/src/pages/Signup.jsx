import React, { useState } from "react";
import InputField from "../components/InputField"; // Adjust path if needed
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim() || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});
    
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", formData, {
        headers: { "Content-Type": "application/json" },
      });
      

      console.log("Signup Successful:", response.data);
      navigate("/login"); // Redirect to dashboard after successful signup
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data.errors || { general: "Something went wrong" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-primary">Learning Management System</h2>
        <h3 className="text-xl font-semibold mb-4 text-center text-white">Create an Account</h3>
        
        {errors.general && <p className="text-red-500 text-sm text-center mb-4">{errors.general}</p>}

        <form onSubmit={handleSubmit}>
          <InputField
            label="Full Name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            error={errors.name}
          />
          <InputField
            label="Email"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            error={errors.email}
          />
          <InputField
            label="Password"
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            error={errors.password}
          />
          
          <button
            className="w-full bg-primary hover:bg-primarylight text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "SIGN UP"}
          </button>
        </form>

        <p className="text-center text-gray-700 text-sm mt-4">
          Already have an account? <Link to="/login" className="text-primarylight hover:text-primary">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
