import React from "react";
import { motion } from "framer-motion";
import {
  FaTrash,
  FaEdit,
  FaCalendar,
  FaBuilding,
  FaMoneyBillWave,
  FaUsers,
} from "react-icons/fa";
import SidebarComponent from "../Components/CompanySidebar";

export default function ActiveJobOpenings({ jobPosts, setJobPosts }) {
  // Function to handle the deletion of a job opening
  const handleDelete = (index) => {
    // Ask for confirmation before deleting the job opening
    const confirmed = window.confirm(
      "Are you sure you want to delete this job opening?"
    );

    if (confirmed) {
      // Remove the job opening from the list
      const updatedJobPosts = [...jobPosts];
      updatedJobPosts.splice(index, 1);
      setJobPosts(updatedJobPosts);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <SidebarComponent activePage="activeJobs" />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 p-8"
      >
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-gray-800"
            >
              Active Job Openings
            </motion.h1>
            <p className="text-gray-600 mt-2">
              Manage your current job postings
            </p>
          </div>

          {jobPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12 bg-white rounded-xl shadow-sm"
            >
              <FaUsers className="mx-auto text-4xl text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-700">
                No Active Job Postings
              </h3>
              <p className="text-gray-500 mt-2">
                Create your first job posting to get started
              </p>
            </motion.div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid gap-6"
            >
              {jobPosts.map((job, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-xl font-bold text-gray-800">
                            {job.jobTitle}
                          </h2>
                          <div className="flex items-center mt-2 text-gray-600">
                            <FaBuilding className="mr-2" />
                            <span>{job.companyName}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center text-gray-600">
                            <FaMoneyBillWave className="mr-2" />
                            <span>₹{job.salaryLPA} LPA</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <FaUsers className="mr-2" />
                            <span>{job.studentCount} Positions</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <FaCalendar className="mr-2" />
                            <span>{job.applicationDeadline}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        >
                          <FaEdit className="text-xl" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDelete(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <FaTrash className="text-xl" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            job.driveMode === "Hybrid"
                              ? "bg-blue-100 text-blue-800"
                              : job.driveMode === "Virtual"
                              ? "bg-green-100 text-green-800"
                              : job.driveMode === "On-site"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {job.driveMode}
                        </span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        View Details →
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
