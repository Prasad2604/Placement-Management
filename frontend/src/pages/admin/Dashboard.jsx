import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaBuilding,
  FaUserGraduate,
  FaBriefcase,
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Card from "../../Components/ui/Card";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalCompanies: 0,
    totalStudents: 0,
    totalPlacements: 0,
    placedStudents: 0,
  });

  const [pendingCompanies, setPendingCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [recentActivities, setRecentActivities] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Authentication token not found");
          navigate("/login");
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };

        // Fetch placement stats and companies data in parallel
        const [statsResponse, companiesResponse] = await Promise.all([
          axios.get("http://localhost:5000/admin/placement-stats", config),
          axios.get("http://localhost:5000/admin/companies", config),
        ]);

        console.log("Stats Response:", statsResponse.data);
        console.log("Companies Response:", companiesResponse.data);

        if (statsResponse.data.stats) {
          setStats(statsResponse.data.stats);
        }

        if (companiesResponse.data.companies) {
          // Filter pending companies
          const pendingComps = companiesResponse.data.companies.filter(
            (company) => !company.status || company.status === "pending"
          );
          setPendingCompanies(pendingComps);
        }

        if (statsResponse.data.recentActivities) {
          setRecentActivities(statsResponse.data.recentActivities);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        if (error.response?.status === 403) {
          toast.error("Admin access required");
          navigate("/login");
        } else {
          const errorMessage =
            error.response?.data?.message || "Failed to fetch dashboard data";
          toast.error(errorMessage);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const handleApproval = async (companyId, isApproved) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token not found");
        navigate("/login");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const endpoint = isApproved ? "approve" : "reject";
      const response = await axios.post(
        `http://localhost:5000/admin/companies/${companyId}/${endpoint}`,
        {},
        config
      );

      if (response.data.message) {
        // Remove company from pending list
        setPendingCompanies((prev) =>
          prev.filter((company) => company._id !== companyId)
        );

        toast.success(response.data.message);

        // Refresh stats
        const statsResponse = await axios.get(
          "http://localhost:5000/admin/placement-stats",
          config
        );
        if (statsResponse.data.stats) {
          setStats(statsResponse.data.stats);
        }
      }
    } catch (error) {
      console.error("Error updating company status:", error);
      if (error.response?.status === 403) {
        toast.error("Admin access required");
        navigate("/login");
      } else {
        const errorMessage =
          error.response?.data?.message || "Failed to update company status";
        toast.error(errorMessage);
      }
    }
  };

  const StatCard = ({ title, value, icon, trend }) => (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
          {trend && (
            <p
              className={`mt-2 text-sm ${
                trend > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}% from last month
            </p>
          )}
        </div>
        <div className="p-3 bg-primary-100 rounded-full">{icon}</div>
      </div>
    </Card>
  );

  const RecentActivity = ({ title, items }) => (
    <Card className="p-6">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <div className="mt-4 space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-0"
          >
            <div>
              <p className="text-sm font-medium text-gray-900">{item.title}</p>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
            <span className="text-sm text-gray-500">{item.time}</span>
          </div>
        ))}
      </div>
    </Card>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b pb-4"
      >
        <h1 className="text-2xl font-semibold text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back! Here's an overview of the placement system.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Companies"
          value={stats.totalCompanies}
          icon={
            <svg
              className="w-6 h-6 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              ></path>
            </svg>
          }
        />
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          icon={
            <svg
              className="w-6 h-6 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              ></path>
            </svg>
          }
        />
        <StatCard
          title="Total Placements"
          value={stats.totalPlacements}
          icon={
            <svg
              className="w-6 h-6 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
          }
        />
        <StatCard
          title="Placed Students"
          value={stats.placedStudents}
          icon={
            <svg
              className="w-6 h-6 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              ></path>
            </svg>
          }
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow-md p-6 mt-6"
      >
        <h2 className="text-xl font-semibold mb-4">
          Pending Company Approvals
        </h2>
        {pendingCompanies.length === 0 ? (
          <p className="text-gray-500">No pending company approvals</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Website
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pendingCompanies.map((company) => (
                  <tr key={company._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {company.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {company.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          {company.website}
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleApproval(company._id, true)}
                        className="text-green-600 hover:text-green-900 mr-4"
                      >
                        <FaCheckCircle className="inline-block mr-1" /> Approve
                      </button>
                      <button
                        onClick={() => handleApproval(company._id, false)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTimesCircle className="inline-block mr-1" /> Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentActivity
          title="Recent Placements"
          items={
            recentActivities?.placements.map((p) => ({
              title: `New Placement`,
              description: `Student placed at Company`,
              time: new Date(p.createdAt).toLocaleDateString(),
            })) || []
          }
        />
        <RecentActivity
          title="Pending Companies"
          items={
            recentActivities?.pendingCompanies.map((c) => ({
              title: c.name,
              description: `Registration pending approval`,
              time: new Date(c.createdAt).toLocaleDateString(),
            })) || []
          }
        />
      </div>
    </div>
  );
}
