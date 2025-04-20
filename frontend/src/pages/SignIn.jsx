import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaUserGraduate,
  FaBuilding,
  FaUserTie,
  FaUser,
} from "react-icons/fa";
import { authService } from "../services/authService";
import { toast } from "react-toastify";

export default function SignIn() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("student");
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get("type") || "student";
    setActiveTab(tab);
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response;
      if (activeTab === "company") {
        response = await authService.loginCompany(
          formData.email,
          formData.password
        );
        navigate("/company/dashboard");
      } else if (activeTab === "admin") {
        response = await authService.loginAdmin(
          formData.username,
          formData.password
        );
        navigate("/admin/dashboard");
      } else {
        // Handle student login when implemented
        toast.info("Student login not implemented yet");
        return;
      }

      toast.success(
        `Welcome back, ${response.company?.name || response.admin?.username}!`
      );
    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "student", label: "Student", icon: FaUserGraduate },
    { id: "company", label: "Company", icon: FaBuilding },
    { id: "admin", label: "Admin", icon: FaUserTie },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-blue-600 to-blue-800 text-white"
      >
        <div className="relative z-10 flex flex-col h-full p-12">
          <div className="flex-grow">
            <h1 className="text-5xl font-bold mb-6">Welcome Back!</h1>
            <p className="text-xl mb-8 text-blue-100">
              Sign in to access your account and manage your placement
              activities.
            </p>
            <div className="space-y-6 text-lg text-blue-100">
              {activeTab === "student" && (
                <p>
                  Access your student portal to view job opportunities and track
                  your applications.
                </p>
              )}
              {activeTab === "company" && (
                <p>
                  Manage your job postings and review student applications
                  through the company portal.
                </p>
              )}
              {activeTab === "admin" && (
                <p>
                  Access the admin dashboard to oversee placement activities and
                  manage system settings.
                </p>
              )}
            </div>
          </div>
          <div className="text-sm text-blue-200">
            © 2024 Placement Management System. All rights reserved.
          </div>
        </div>
      </motion.div>

      {/* Right Panel - Sign In Form */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="flex-1 flex flex-col justify-center items-center p-8 bg-gray-50"
      >
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Welcome back! Please enter your details
            </p>
          </div>

          {/* Tabs */}
          <div className="flex rounded-full bg-white p-1 shadow-sm border border-gray-200">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center justify-center gap-2 flex-1 py-2.5 px-4 rounded-full text-sm font-medium transition-all duration-200
                  ${
                    activeTab === id
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {activeTab === "admin" ? "Username" : "Email"}
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {activeTab === "admin" ? (
                      <FaUser className="h-5 w-5 text-gray-400" />
                    ) : (
                      <FaEnvelope className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <input
                    type={activeTab === "admin" ? "text" : "email"}
                    name={activeTab === "admin" ? "username" : "email"}
                    value={
                      activeTab === "admin" ? formData.username : formData.email
                    }
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={`Enter your ${
                      activeTab === "admin" ? "username" : "email"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3 px-4 rounded-lg text-white font-medium transition-all duration-200
                ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow"
                }`}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            {activeTab === "company" && (
              <p className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-blue-600 hover:text-blue-700"
                >
                  Register here
                </Link>
              </p>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
}
