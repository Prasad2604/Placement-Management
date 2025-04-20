import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaLock,
  FaUserTie,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { authService } from "../services/authService";

export default function RegisterCompany() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    website: "",
    phone: "",
    contactPerson: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      await authService.registerCompany(formData);
      toast.success("Registration successful! Please login to continue.");
      navigate("/signin?type=company");
    } catch (error) {
      toast.error(error.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="hidden lg:flex lg:w-1/2 relative bg-gradient-primary"
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
          <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm shadow-inner-light mb-8">
            <img
              src="/img/PICT_logo_1.png"
              alt="PICT Logo"
              className="w-32 h-32"
            />
          </div>
          <h1 className="text-4xl font-display font-bold mb-4 text-center">
            Join PICT <br /> Placement Portal
          </h1>
          <p className="text-xl font-display text-center max-w-md opacity-90">
            Connect with top talent and streamline your recruitment process
          </p>
          <div className="mt-12 w-full max-w-md">
            <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-6 text-center">
                Why Choose PICT?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-primary-500/20">
                    <FaUserTie className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">Top Talent Pool</h4>
                    <p className="text-sm opacity-80">
                      Access to highly skilled PICT graduates
                    </p>
                  </div>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-primary-500/20">
                    <FaBuilding className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">Efficient Process</h4>
                    <p className="text-sm opacity-80">
                      Streamlined recruitment workflow
                    </p>
                  </div>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-primary-500/20">
                    <FaEnvelope className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">Direct Communication</h4>
                    <p className="text-sm opacity-80">
                      Seamless interaction with placement cell
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right Panel - Registration Form */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="flex-1 flex flex-col justify-center items-center p-8 bg-gray-50"
      >
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-display font-bold text-gray-900">
              Register Your Company
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Create an account to start hiring PICT talent
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="bg-white shadow-sm rounded-xl border border-gray-200 p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <div className="mt-1 relative">
                  <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full rounded-lg border border-gray-300 bg-white p-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm"
                    placeholder="Enter company name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1 relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full rounded-lg border border-gray-300 bg-white p-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm"
                    placeholder="Enter company email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Website
                </label>
                <div className="mt-1 relative">
                  <FaGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="pl-10 w-full rounded-lg border border-gray-300 bg-white p-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm"
                    placeholder="Enter company website"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact Person
                </label>
                <div className="mt-1 relative">
                  <FaUserTie className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full rounded-lg border border-gray-300 bg-white p-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm"
                    placeholder="Enter contact person name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <div className="mt-1 relative">
                  <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full rounded-lg border border-gray-300 bg-white p-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm"
                    placeholder="Enter contact number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full rounded-lg border border-gray-300 bg-white p-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm"
                    placeholder="Create a password"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full rounded-lg border border-gray-300 bg-white p-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-200
                ${
                  loading
                    ? "bg-primary-400 cursor-not-allowed"
                    : "bg-primary-600 hover:bg-primary-700 shadow-sm hover:shadow"
                }`}
            >
              {loading ? "Registering..." : "Register Company"}
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/signin?type=company"
                className="font-medium text-primary-600 hover:text-primary-700"
              >
                Sign in here
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
