import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import CompanyLayout from "./layouts/CompanyLayout";
import AdminLayout from "./layouts/AdminLayout";

// Import admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import Companies from "./pages/admin/Companies";
import Students from "./pages/admin/Students";
import JobPostings from "./pages/admin/JobPostings";
import Placements from "./pages/admin/Placements";
import Notices from "./pages/admin/Notices";
import Schedule from "./pages/admin/Schedule";
import Reports from "./pages/admin/Reports";

// Import company pages
import CompanyDashboard from "./pages/company/Dashboard";
import CreateJobPost from "./pages/company/CreateJobPost";
import ActiveJobOpenings from "./pages/company/ActiveJobOpenings";
import CompanyProfile from "./pages/company/Profile";
import SignIn1 from "./pages/SignIn";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<SignIn1 />} />

          {/* Company Routes */}
          <Route element={<ProtectedRoute allowedRoles={["company"]} />}>
            <Route path="/company" element={<CompanyLayout />}>
              <Route path="dashboard" element={<CompanyDashboard />} />
              <Route path="create-job" element={<CreateJobPost />} />
              <Route path="jobs" element={<ActiveJobOpenings />} />
              <Route path="profile" element={<CompanyProfile />} />
              <Route index element={<Navigate to="dashboard" replace />} />
            </Route>
          </Route>

          {/* Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="companies" element={<Companies />} />
              <Route path="students" element={<Students />} />
              <Route path="jobs" element={<JobPostings />} />
              <Route path="placements" element={<Placements />} />
              <Route path="notices" element={<Notices />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="reports" element={<Reports />} />
              <Route index element={<Navigate to="dashboard" replace />} />
            </Route>
          </Route>

          {/* Default Route */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* 404 Route */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                  <p className="text-gray-600 mb-4">Page not found</p>
                  <button
                    onClick={() => window.history.back()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Go Back
                  </button>
                </div>
              </div>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
