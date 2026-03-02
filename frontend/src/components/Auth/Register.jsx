import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FiUser, FiMail, FiLock, FiAtSign, FiTwitter } from "react-icons/fi";
import toast from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const result = await register({
      name: formData.name,
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });

    if (result.success) {
      toast.success("Account created successfully!");
      navigate("/");
    } else {
      toast.error(result.error || "Registration failed");
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
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or{" "}
            <Link
              to="/login"
              className="font-medium text-twitter-blue hover:text-blue-500 transition"
            >
              sign in to existing account
            </Link>
          </p>
        </div>

        {/* Registration Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {/* Full Name */}
            <div className="relative">
              <FiUser className="absolute top-3 left-3 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-twitter-dark focus:outline-none focus:ring-2 focus:ring-twitter-blue focus:border-transparent transition duration-200"
                placeholder="Full Name"
              />
            </div>

            {/* Username */}
            <div className="relative">
              <FiAtSign className="absolute top-3 left-3 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                name="username"
                required
                value={formData.username}
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-twitter-dark focus:outline-none focus:ring-2 focus:ring-twitter-blue focus:border-transparent transition duration-200"
                placeholder="Username"
              />
            </div>

            {/* Email */}
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

            {/* Password */}
            <div className="relative">
              <FiLock className="absolute top-3 left-3 text-gray-400 dark:text-gray-500" />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-twitter-dark focus:outline-none focus:ring-2 focus:ring-twitter-blue focus:border-transparent transition duration-200"
                placeholder="Password (min. 6 characters)"
              />
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <FiLock className="absolute top-3 left-3 text-gray-400 dark:text-gray-500" />
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-twitter-dark focus:outline-none focus:ring-2 focus:ring-twitter-blue focus:border-transparent transition duration-200"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          {/* Terms Agreement */}
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-twitter-blue focus:ring-twitter-blue border-gray-300 rounded"
            />
            <label
              htmlFor="terms"
              className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
            >
              I agree to the{" "}
              <Link
                to="/terms"
                className="text-twitter-blue hover:text-blue-500 transition"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="text-twitter-blue hover:text-blue-500 transition"
              >
                Privacy Policy
              </Link>
            </label>
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
                  Creating account...
                </span>
              ) : (
                "Create account"
              )}
            </button>
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

export default Register;
