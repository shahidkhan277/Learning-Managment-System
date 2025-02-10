import React, { useState } from "react";
import InputField from "../components/InputField";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setServerError("");
    setLoading(true);
  
    let newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }
  
    try {
      // 1️⃣ Request CSRF token before login
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true, // Important for Laravel Sanctum
      });
  
      // 2️⃣ Now send the login request
      const response = await axios.post(
        "http://localhost:8000/api/login",
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // Crucial for Sanctum authentication
        }
      );
  
      // 3️⃣ Store user info in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
  
      navigate("/"); // Redirect to Dashboard
    } catch (error) {
      console.error("Login error:", error.response?.data);
      setServerError(error.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-primary text-center mb-2">
          Learning Management System
        </h1>
        <h2 className="text-xl font-semibold mb-6 text-center text-gray-700 dark:text-gray-300">
          Login to Your Account
        </h2>
        {serverError && <p className="text-red-500 text-center">{serverError}</p>}

        <form onSubmit={handleSubmit}>
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

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-primary" />
              <span className="ml-2 text-gray-700 dark:text-gray-400 text-sm">
                Remember me
              </span>
            </label>
            <a href="#" className="text-sm text-primarylight hover:text-primary">
              Forgot password?
            </a>
          </div>

          <button
            className="w-full bg-primary hover:bg-primarylight text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "LOGIN"}
            </button>
        </form>

        <p className="text-center text-gray-700 dark:text-gray-300 text-sm mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primarylight hover:text-primary">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
