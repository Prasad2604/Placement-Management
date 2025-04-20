import { Sidebar } from "flowbite-react";
import { FaHome, FaBriefcase, FaChartLine, FaUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { authService } from "../../services/authService";

export default function CompanySidebar() {
  const location = useLocation();
  const currentPath = location.pathname.split("/")[2] || "dashboard";
  const user = authService.getCurrentUser();

  const navItems = [
    { path: "dashboard", label: "Dashboard", icon: FaHome },
    { path: "create-job", label: "Create Job Post", icon: FaBriefcase },
    { path: "jobs", label: "Active Job Openings", icon: FaChartLine },
  ];

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="md:w-64 bg-white shadow-lg h-screen"
    >
      <div className="p-5 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800 text-center">
          Company Dashboard
        </h1>
        <p className="text-sm text-gray-500 text-center mt-1">
          Welcome back, {user?.company?.name || "Company"}!
        </p>
      </div>

      <div className="p-4">
        <Sidebar className="w-full">
          <Sidebar.Items>
            <Sidebar.ItemGroup className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link to={`/company/${item.path}`} key={item.path}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Sidebar.Item
                      icon={item.icon}
                      className={`rounded-lg transition-colors duration-200 ${
                        currentPath === item.path
                          ? "bg-blue-50 text-blue-600"
                          : "hover:bg-gray-50"
                      }`}
                      active={currentPath === item.path}
                    >
                      <span className="font-medium">{item.label}</span>
                    </Sidebar.Item>
                  </motion.div>
                </Link>
              ))}
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
        <Link to="/company/profile">
          <div className="flex items-center space-x-3 px-3 py-2 bg-gray-50 rounded-lg mb-2 hover:bg-gray-100">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <FaUserCircle className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">
                Company Profile
              </p>
              <p className="text-xs text-gray-500">Manage your details</p>
            </div>
          </div>
        </Link>
        <div
          className="flex items-center space-x-3 px-3 py-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
          onClick={() => authService.logout()}
        >
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <FaUserCircle className="text-red-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">Sign Out</p>
            <p className="text-xs text-gray-500">Exit company panel</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
