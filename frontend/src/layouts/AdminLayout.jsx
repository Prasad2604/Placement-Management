import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
  FaHome,
  FaBuilding,
  FaUsers,
  FaBriefcase,
  FaGraduationCap,
  FaBell,
  FaCalendar,
  FaChartBar,
} from "react-icons/fa";
import Sidebar from "../Components/layout/Sidebar";

export default function AdminLayout() {
  const location = useLocation();

  const menuItems = [
    {
      path: "/admin/dashboard",
      name: "Dashboard",
      icon: FaHome,
    },
    {
      path: "/admin/companies",
      name: "Companies",
      icon: FaBuilding,
    },
    {
      path: "/admin/students",
      name: "Students",
      icon: FaUsers,
    },
    {
      path: "/admin/jobs",
      name: "Job Postings",
      icon: FaBriefcase,
    },
    {
      path: "/admin/placements",
      name: "Placements",
      icon: FaGraduationCap,
    },
    {
      path: "/admin/notices",
      name: "Notices",
      icon: FaBell,
    },
    {
      path: "/admin/schedule",
      name: "Schedule",
      icon: FaCalendar,
    },
    {
      path: "/admin/reports",
      name: "Reports",
      icon: FaChartBar,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        menuItems={menuItems}
        currentPath={location.pathname}
        userType="admin"
      />
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
