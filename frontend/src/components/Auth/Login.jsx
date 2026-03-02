import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FiMail, FiLock, FiTwitter } from "react-icons/fi";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(formData.email, formData.password);

    if (result.success) {
      toast.success("Logged in successfully!");
      navigate("/");
    } else {
      toast.error(result.error || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-twitter-darker py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-md w-full space-y-8">
        {/* Header with Logo and Brand Name */}
        <div>
          <div className="flex justify-center">
            <div className="flex items-center space-x-3">
              <FiTwitter className="h-12 w-12 text-twitter-blue" />
              <span className="text-3xl font-bold text-twitter-blue">
                Twitter Clone
              </span>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or{" "}
            <Link
              to="/register"
              className="font-medium text-twitter-blue hover:text-blue-500 transition"
            >
              create a new account
            </Link>
          </p>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {/* Email Field */}
            <div className="relative">
              <FiMail className="absolute top-3 left-3 text-gray-400 dark:text-gray-500" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-twitter-dark focus:outline-none focus:ring-2 focus:ring-twitter-blue focus:border-transparent transition duration-200"
                placeholder="Email address"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <FiLock className="absolute top-3 left-3 text-gray-400 dark:text-gray-500" />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-twitter-dark focus:outline-none focus:ring-2 focus:ring-twitter-blue focus:border-transparent transition duration-200"
                placeholder="Password"
              />
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={() => toast.error("Password reset coming soon!")}
              className="text-sm text-twitter-blue hover:text-blue-500 transition"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-twitter-blue hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-twitter-blue disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </div>

          {/* Demo Credentials */}
          <div className="mt-4 p-4 bg-gray-100 dark:bg-twitter-dark rounded-lg">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
              Demo credentials:
            </p>
            <div className="space-y-1 text-xs">
              <p>
                <span className="font-medium">Email:</span> demo@example.com
              </p>
              <p>
                <span className="font-medium">Password:</span> demo123
              </p>
            </div>
          </div>
        </form>

        {/* Footer Links */}
        <div className="text-center text-xs text-gray-500 dark:text-gray-400">
          <div className="flex justify-center space-x-4">
            <Link to="/terms" className="hover:text-twitter-blue transition">
              Terms
            </Link>
            <Link to="/privacy" className="hover:text-twitter-blue transition">
              Privacy
            </Link>
            <Link to="/help" className="hover:text-twitter-blue transition">
              Help
            </Link>
          </div>
          <p className="mt-2">© 2026 Twitter Clone. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
