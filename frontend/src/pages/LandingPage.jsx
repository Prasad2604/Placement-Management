import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import DirectorMessage from "../Components/DirectorMessage";
import Overview from "../Components/Overview";
import ContactUs from "../Components/ContactUs";
import {
  FaUserGraduate,
  FaBuilding,
  FaUserTie,
  FaChartLine,
  FaBars,
  FaTimes,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const userTypes = [
    {
      title: "Student",
      icon: FaUserGraduate,
      path: "/signin",
      color: "from-blue-600 to-blue-400",
    },
    {
      title: "Company",
      icon: FaBuilding,
      path: "/company",
      color: "from-purple-600 to-purple-400",
    },
    {
      title: "Coordinator",
      icon: FaUserTie,
      path: "/coordinator",
      color: "from-green-600 to-green-400",
    },
  ];

  const stats = [
    { label: "Students Placed", value: "700+", color: "text-blue-600" },
    { label: "Companies Visited", value: "100+", color: "text-purple-600" },
    { label: "Average Package", value: "12 LPA", color: "text-green-600" },
    { label: "Highest Package", value: "44 LPA", color: "text-red-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img
                  src="/img/PICT_logo_1.png"
                  alt="PICT Logo"
                  className="h-12 w-auto"
                />
                <span className="ml-2 text-xl font-bold text-gray-800">
                  PICT Placement Portal
                </span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                to="#about"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                About
              </Link>
              <Link
                to="#director"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                Director's Message
              </Link>
              <Link
                to="#contact"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                Contact
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="text-gray-600 hover:text-blue-600 focus:outline-none"
              >
                {isMenuOpen ? (
                  <FaTimes className="h-6 w-6" />
                ) : (
                  <FaBars className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                to="#about"
                className="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                About
              </Link>
              <Link
                to="#director"
                className="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                Director's Message
              </Link>
              <Link
                to="#contact"
                className="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen pt-16 md:pt-0 flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/img/PICT_img_1.jpg"
            alt="PICT Campus"
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12 md:py-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-3xl md:text-6xl font-bold text-white leading-tight">
              Welcome to PICT's
              <br />
              <span className="text-blue-400">Placement Portal</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Your gateway to career opportunities. Connect with top companies
              and kickstart your professional journey.
            </p>

            {/* User Type Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12 max-w-5xl mx-auto">
              {userTypes.map((type, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Link to={type.path}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`bg-gradient-to-r ${type.color} p-4 md:p-6 rounded-xl shadow-lg text-white hover:shadow-xl transition-all duration-300`}
                    >
                      <type.icon className="w-8 h-8 md:w-12 md:h-12 mb-3 md:mb-4 mx-auto" />
                      <h3 className="text-lg md:text-xl font-semibold">
                        {type.title}
                      </h3>
                      <p className="text-xs md:text-sm mt-2 text-gray-100">
                        Click to login
                      </p>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <h3 className={`text-2xl md:text-4xl font-bold ${stat.color}`}>
                  {stat.value}
                </h3>
                <p className="text-sm md:text-base text-gray-600 mt-2">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Overview />

      {/* Enhanced Director's Message Section */}
      <section id="director" className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 md:p-8 shadow-lg"
          >
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
              <div className="w-full md:w-1/3">
                <img
                  src="/img/director.jpeg"
                  alt="Director"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
              <div className="w-full md:w-2/3">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  Director's Message
                </h2>
                <p className="text-sm md:text-base text-gray-600 mb-4">
                  "At PICT, we are committed to providing our students with the
                  best opportunities for their professional growth. Our
                  placement cell works tirelessly to connect our talented
                  students with leading companies in the industry."
                </p>
                <p className="text-sm md:text-base text-gray-600">
                  "We believe in nurturing not just technical skills but also
                  developing well-rounded professionals who can make a
                  significant impact in their chosen fields."
                </p>
                <div className="mt-6">
                  <p className="font-semibold text-gray-800">
                    Dr. P. T. Kulkarni
                  </p>
                  <p className="text-gray-600">Director, PICT</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Contact Us
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              Get in touch with us for any queries or support
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-50 p-6 rounded-lg shadow-lg text-center"
            >
              <FaEnvelope className="w-8 h-8 md:w-12 md:h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg md:text-xl font-semibold mb-2">Email</h3>
              <p className="text-sm md:text-base text-gray-600">
                placement@pict.edu
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-50 p-6 rounded-lg shadow-lg text-center"
            >
              <FaPhone className="w-8 h-8 md:w-12 md:h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg md:text-xl font-semibold mb-2">Phone</h3>
              <p className="text-sm md:text-base text-gray-600">
                +91 1234567890
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-50 p-6 rounded-lg shadow-lg text-center"
            >
              <FaMapMarkerAlt className="w-8 h-8 md:w-12 md:h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg md:text-xl font-semibold mb-2">Address</h3>
              <p className="text-sm md:text-base text-gray-600">
                Survey No. 27, Near Trimurti Chowk, Dhankawadi, Pune - 411043
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>&copy; 2024 PICT Placement Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
