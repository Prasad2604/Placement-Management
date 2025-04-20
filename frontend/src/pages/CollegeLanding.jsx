import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaUserGraduate,
  FaBriefcase,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaBell,
} from "react-icons/fa";

export default function CollegeLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    {
      title: "Total Students",
      value: "1,234",
      icon: FaUserGraduate,
      color: "bg-blue-500",
    },
    {
      title: "Companies Registered",
      value: "45",
      icon: FaBriefcase,
      color: "bg-green-500",
    },
    {
      title: "Placement Rate",
      value: "92%",
      icon: FaChartLine,
      color: "bg-purple-500",
    },
  ];

  const recentActivities = [
    {
      title: "New Company Registration",
      company: "Tech Corp",
      time: "2 hours ago",
    },
    {
      title: "Placement Drive Scheduled",
      company: "Innovation Labs",
      time: "5 hours ago",
    },
    {
      title: "Students Selected",
      company: "Digital Solutions",
      count: 15,
      time: "1 day ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img
                src="/img/PICT_logo_1.png"
                alt="PICT Logo"
                className="h-10 w-10"
              />
              <h1 className="ml-3 text-xl font-semibold text-gray-800">
                Admin Dashboard
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-400 hover:text-gray-500 relative"
              >
                <FaBell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </motion.button>

              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
                >
                  <img
                    src="/img/admin-avatar.png"
                    alt="Admin"
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Admin
                  </span>
                </motion.button>

                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1"
                  >
                    <a
                      href="#settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaCog className="mr-3" /> Settings
                    </a>
                    <a
                      href="#logout"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaSignOutAlt className="mr-3" /> Logout
                    </a>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search students, companies, or placement drives..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Activities
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50"
              >
                <div>
                  <h3 className="font-medium text-gray-800">
                    {activity.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {activity.company}
                    {activity.count && ` • ${activity.count} students`}
                  </p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
