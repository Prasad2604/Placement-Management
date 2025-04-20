import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CompanySidebar from "../../Components/layout/CompanySidebar";
import {
  FaBriefcase,
  FaUsers,
  FaCalendarAlt,
  FaChartLine,
} from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "../../Components/ui/Card";
import Button from "../../Components/ui/Button";
import { useAuth } from "../../context/AuthContext";

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

const JobPostingCard = ({ job }) => (
  <Card className="p-6">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
        <p className="mt-1 text-sm text-gray-500">{job.location}</p>
      </div>
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${
          job.status === "active"
            ? "bg-green-100 text-green-800"
            : job.status === "closed"
            ? "bg-red-100 text-red-800"
            : "bg-yellow-100 text-yellow-800"
        }`}
      >
        {job.status}
      </span>
    </div>
    <div className="mt-4">
      <div className="flex items-center text-sm text-gray-500">
        <svg
          className="w-4 h-4 mr-2"
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
        {job.applications} applications
      </div>
      <div className="mt-4 flex justify-end space-x-3">
        <Button variant="secondary" size="sm">
          View Applications
        </Button>
        <Button variant="primary" size="sm">
          Edit Job
        </Button>
      </div>
    </div>
  </Card>
);

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsResponse, jobsResponse] = await Promise.all([
          axios.get("http://localhost:5000/company/stats"),
          axios.get("http://localhost:5000/company/jobs"),
        ]);

        setStats(statsResponse.data);
        setJobs(jobsResponse.data.jobs);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch dashboard data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <CompanySidebar activePage="home" />

      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-gray-600">Welcome back to your dashboard</p>
            </div>
            <Link to="/company/jobs/new">
              <Button variant="primary">Post New Job</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Active Jobs"
              value={stats?.activeJobs || 0}
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
              title="Total Applications"
              value={stats?.totalApplications || 0}
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
              }
            />
            <StatCard
              title="Shortlisted"
              value={stats?.shortlistedCandidates || 0}
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
            <StatCard
              title="Hired"
              value={stats?.hiredCandidates || 0}
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
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Recent Job Postings
            </h2>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {jobs.map((job) => (
                <JobPostingCard key={job._id} job={job} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
