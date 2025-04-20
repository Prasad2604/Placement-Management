import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaBuilding, FaUsers, FaBriefcase } from "react-icons/fa";

export default function CompanyDashboard() {
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    selectedCandidates: 0,
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/company/dashboard/stats"
        );
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchDashboardStats();
  }, []);

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-lg shadow-md p-6 flex items-center ${color}`}
    >
      <div className="rounded-full p-3 mr-4 bg-opacity-20">
        <Icon className="text-2xl" />
      </div>
      <div>
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b pb-4"
      >
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening with your job postings.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Job Posts"
          value={stats.totalJobs}
          icon={FaBriefcase}
          color="text-blue-600"
        />
        <StatCard
          title="Active Jobs"
          value={stats.activeJobs}
          icon={FaBuilding}
          color="text-green-600"
        />
        <StatCard
          title="Total Applications"
          value={stats.totalApplications}
          icon={FaUsers}
          color="text-purple-600"
        />
        <StatCard
          title="Selected Candidates"
          value={stats.selectedCandidates}
          icon={FaUsers}
          color="text-yellow-600"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow-md p-6 mt-6"
      >
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        {/* Add recent activity content here */}
      </motion.div>
    </div>
  );
}
