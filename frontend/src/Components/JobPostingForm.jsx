import { Label, TextInput, Button, Select } from "flowbite-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaBuilding,
  FaCalendar,
  FaUsers,
  FaMoneyBillWave,
} from "react-icons/fa";

export default function JobPostingForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    studentCount: "",
    salaryLPA: "",
    tech: "",
    branches: "All",
    eligibilityCGPA: "",
    eligibilityAmcat: "",
    eligibilityBack: "",
    driveMode: "Hybrid",
    applicationDeadline: "",
    jobDescription: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto"
    >
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl font-bold text-gray-800"
        >
          Create New Job Posting
        </motion.h1>
        <p className="text-gray-600 mt-2">
          Fill in the details below to create a new job opportunity
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="jobTitle" className="text-gray-700 font-medium">
                  Job Title
                </Label>
                <div className="relative">
                  <FaBriefcase className="absolute left-3 top-3 text-gray-400" />
                  <TextInput
                    id="jobTitle"
                    className="pl-10"
                    placeholder="e.g. Software Engineer"
                    value={formData.jobTitle}
                    onChange={(e) => handleChange("jobTitle", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="companyName"
                  className="text-gray-700 font-medium"
                >
                  Company Name
                </Label>
                <div className="relative">
                  <FaBuilding className="absolute left-3 top-3 text-gray-400" />
                  <TextInput
                    id="companyName"
                    className="pl-10"
                    placeholder="Your company name"
                    value={formData.companyName}
                    onChange={(e) =>
                      handleChange("companyName", e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="studentCount"
                  className="text-gray-700 font-medium"
                >
                  Number of Positions
                </Label>
                <div className="relative">
                  <FaUsers className="absolute left-3 top-3 text-gray-400" />
                  <TextInput
                    id="studentCount"
                    className="pl-10"
                    placeholder="e.g. 5"
                    value={formData.studentCount}
                    onChange={(e) =>
                      handleChange("studentCount", e.target.value)
                    }
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="salaryLPA"
                  className="text-gray-700 font-medium"
                >
                  Salary (LPA)
                </Label>
                <div className="relative">
                  <FaMoneyBillWave className="absolute left-3 top-3 text-gray-400" />
                  <TextInput
                    id="salaryLPA"
                    className="pl-10"
                    placeholder="e.g. 12"
                    value={formData.salaryLPA}
                    onChange={(e) => handleChange("salaryLPA", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="applicationDeadline"
                  className="text-gray-700 font-medium"
                >
                  Application Deadline
                </Label>
                <div className="relative">
                  <FaCalendar className="absolute left-3 top-3 text-gray-400" />
                  <TextInput
                    id="applicationDeadline"
                    type="date"
                    className="pl-10"
                    value={formData.applicationDeadline}
                    onChange={(e) =>
                      handleChange("applicationDeadline", e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="driveMode"
                  className="text-gray-700 font-medium"
                >
                  Drive Mode
                </Label>
                <Select
                  id="driveMode"
                  value={formData.driveMode}
                  onChange={(e) => handleChange("driveMode", e.target.value)}
                  required
                  className="w-full"
                >
                  <option value="Hybrid">Hybrid</option>
                  <option value="Virtual">Virtual</option>
                  <option value="On-site">On-site</option>
                  <option value="In-campus">In-campus</option>
                </Select>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Create Job Post
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
