import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        // Verify token with backend
        verifyToken(storedToken);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  const verifyToken = async (token) => {
    try {
      await api.get("/auth/me");
    } catch (error) {
      console.error("Token verification failed:", error);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  const login = async (email, password) => {
    try {
      console.log("Attempting login with:", { email }); // Debug log

      const response = await api.post("/auth/login", { email, password });
      console.log("Login response:", response.data); // Debug log

      if (response.data && response.data.success) {
        const userData = response.data.data;
        localStorage.setItem("token", userData.token);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        toast.success("Logged in successfully!");
        return { success: true };
      } else {
        throw new Error(response.data?.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const register = async (userData) => {
    try {
      console.log("Attempting registration with:", {
        name: userData.name,
        username: userData.username,
        email: userData.email,
      }); // Debug log

      const response = await api.post("/auth/register", userData);
      console.log("Registration response:", response.data); // Debug log

      if (response.data && response.data.success) {
        const userData = response.data.data;
        localStorage.setItem("token", userData.token);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        toast.success("Account created successfully!");
        return { success: true };
      } else {
        throw new Error(response.data?.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      const errorMessage =
        error.response?.data?.message || error.message || "Registration failed";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully");
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
