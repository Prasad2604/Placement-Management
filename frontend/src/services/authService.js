import axiosInstance from "./axiosConfig";

export const authService = {
  // Company login
  loginCompany: async (email, password) => {
    try {
      const response = await axiosInstance.post("/auth/login/company", {
        email,
        password,
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...response.data.company,
            role: "company",
          })
        );
      }
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { message: "An error occurred during login" }
      );
    }
  },

  // Admin login
  loginAdmin: async (username, password) => {
    try {
      const response = await axiosInstance.post("/auth/login/admin", {
        username,
        password,
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...response.data.admin,
            role: "admin",
          })
        );
      }
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { message: "An error occurred during login" }
      );
    }
  },

  // Company registration
  registerCompany: async (companyData) => {
    try {
      const response = await axiosInstance.post(
        "/auth/register/company",
        companyData
      );
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "An error occurred during registration",
        }
      );
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axiosInstance.defaults.headers.common["Authorization"];
    window.location.href = "/signin";
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  },

  // Get current token from localStorage
  getToken: () => {
    return localStorage.getItem("token");
  },

  // Check if user is logged in
  isLoggedIn: () => {
    return !!localStorage.getItem("token") && !!localStorage.getItem("user");
  },

  // Check if token is expired
  isTokenExpired: (token) => {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp < Date.now() / 1000;
    } catch (error) {
      return true;
    }
  },
};
