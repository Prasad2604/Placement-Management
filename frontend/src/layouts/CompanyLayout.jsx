import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { FaHome, FaPlus, FaBriefcase, FaUser } from "react-icons/fa";
import Sidebar from "../Components/layout/Sidebar";

// Import company pages
import CompanyDashboard from "../pages/company/Dashboard";
import CreateJobPost from "../pages/company/CreateJobPost";
import ActiveJobOpenings from "../pages/company/ActiveJobOpenings";
import CompanyProfile from "../pages/company/Profile";

export default function CompanyLayout() {
  const location = useLocation();

  const menuItems = [
    {
      path: "/company/dashboard",
      name: "Dashboard",
      icon: FaHome,
    },
    {
      path: "/company/create-job",
      name: "Create Job Post",
      icon: FaPlus,
    },
    {
      path: "/company/jobs",
      name: "Active Jobs",
      icon: FaBriefcase,
    },
    {
      path: "/company/profile",
      name: "Profile",
      icon: FaUser,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        menuItems={menuItems}
        currentPath={location.pathname}
        userType="company"
      />
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
