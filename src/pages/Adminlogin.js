import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import API_BASE_URL from "../config";

const AdminAuth = () => {
  let navigate=useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const host=API_BASE_URL;
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      if (isLogin) {
        // Login API call
        const response = await axios.post(`${host}/api/admin/login`, {
          phone: formData.phone,
          password: formData.password,
        });

        if(response.data.success){
          localStorage.setItem('token_admin', response.data.token);
          localStorage.setItem('adminId', response.data.admin.id);
        }
        setMessage(response.data.message || "Login successful!");
        navigate("/admin-dashboard");
      } else {
        // Signup API call
        const response = await axios.post(`${host}/api/admin/register`, formData);
        if(response.data.success){
          localStorage.setItem('token_admin', response.data.authToken);
          localStorage.setItem('adminId', response.data.id);
        }
        setMessage(response.data.message || "Signup successful!");
        navigate("/admin-dashboard");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isLogin ? "Admin Login" : "Admin Signup"}
        </h2>
        {message && (
          <div
            className={`mb-4 p-2 text-center text-sm text-white rounded ${
              message.includes("successful") ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={!isLogin}
              />
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-semibold mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 font-semibold focus:outline-none"
          >
            {isLogin ? "Signup here" : "Login here"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AdminAuth;
