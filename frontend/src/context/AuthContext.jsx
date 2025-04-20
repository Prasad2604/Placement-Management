import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Set up axios interceptor for adding token to requests
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        // Set default axios header
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Redirect to appropriate dashboard if on login page
        if (
          window.location.pathname === "/login" ||
          window.location.pathname === "/signin"
        ) {
          navigate(`/${parsedUser.role}/dashboard`);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        logout();
      }
    }
    setLoading(false);
  }, [navigate]);

  const login = async (username, password, role) => {
    try {
      setError(null);
      setLoading(true);

      const endpoint =
        role === "admin"
          ? "http://localhost:5000/auth/login/admin"
          : "http://localhost:5000/auth/login/company";

      const response = await axios.post(endpoint, {
        username: role === "admin" ? username : undefined,
        email: role === "company" ? username : undefined,
        password,
      });

      const { token, [role]: userData } = response.data;

      // Add role to user data
      const userWithRole = { ...userData, role };

      // Store token and user data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userWithRole));

      // Set axios default header
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(userWithRole);

      // Navigate to appropriate dashboard
      navigate(`/${role}/dashboard`);

      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    navigate("/login");
  };

  const value = {
    user,
    login,
    logout,
    loading,
    error,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isCompany: user?.role === "company",
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
