import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import {
  FiHome,
  FiHash,
  FiBell,
  FiMail,
  FiSearch,
  FiUser,
  FiLogOut,
  FiSun,
  FiMoon,
  FiMenu,
  FiX,
  FiTwitter,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const navigationItems = [
    { name: "Home", href: "/", icon: FiHome },
    { name: "Explore", href: "/explore", icon: FiHash },
    { name: "Notifications", href: "/notifications", icon: FiBell, badge: 3 },
    { name: "Messages", href: "/messages", icon: FiMail, badge: 5 },
    {
      name: "Profile",
      href: user ? `/${user.username}` : "/profile",
      icon: FiUser,
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setShowSearch(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <>
      {/* Desktop Navbar (hidden on mobile, shown on lg screens) */}
      <nav className="hidden lg:block sticky top-0 z-40 bg-white dark:bg-twitter-darker border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <FiTwitter className="h-8 w-8 text-twitter-blue" />
              <span className="text-xl font-bold text-twitter-blue hidden sm:block">
                Twitter Clone
              </span>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <form onSubmit={handleSearch} className="relative">
                <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Twitter"
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-twitter-dark rounded-full focus:outline-none focus:ring-2 focus:ring-twitter-blue focus:bg-white dark:focus:bg-twitter-darker dark:text-white transition"
                />
              </form>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-twitter-dark transition"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <FiSun className="h-5 w-5" />
                ) : (
                  <FiMoon className="h-5 w-5" />
                )}
              </button>

              {/* User Menu */}
              {user && (
                <div className="relative group">
                  <button className="flex items-center space-x-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-twitter-dark transition">
                    <img
                      src={
                        user.profilePicture || "https://via.placeholder.com/32"
                      }
                      alt={user.name}
                      className="h-8 w-8 rounded-full"
                    />
                    <span className="hidden xl:block text-sm font-medium dark:text-white">
                      {user.name}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-twitter-dark rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <Link
                      to={`/${user.username}`}
                      className="flex items-center space-x-2 px-4 py-3 hover:bg-gray-50 dark:hover:bg-twitter-darker transition"
                    >
                      <FiUser className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-4 py-3 hover:bg-gray-50 dark:hover:bg-twitter-darker text-red-500 transition"
                    >
                      <FiLogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation (shown on mobile, hidden on lg) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-twitter-darker border-t border-gray-200 dark:border-gray-800 z-40">
        <div className="flex justify-around items-center h-16">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-twitter-blue dark:hover:text-twitter-blue transition"
            >
              <item.icon className="h-6 w-6" />
              {item.badge > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-twitter-blue text-white text-xs rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Top Bar (shown on mobile) */}
      <div className="lg:hidden sticky top-0 z-40 bg-white dark:bg-twitter-darker border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between px-4 h-14">
          {/* Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-twitter-dark transition"
          >
            <FiMenu className="h-5 w-5" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <FiTwitter className="h-7 w-7 text-twitter-blue" />
          </Link>

          {/* Right Icons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-twitter-dark transition"
            >
              <FiSearch className="h-5 w-5" />
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-twitter-dark transition"
            >
              {isDarkMode ? (
                <FiSun className="h-5 w-5" />
              ) : (
                <FiMoon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-4 pb-3"
            >
              <form onSubmit={handleSearch} className="relative">
                <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Twitter"
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-twitter-dark rounded-full focus:outline-none focus:ring-2 focus:ring-twitter-blue dark:text-white"
                  autoFocus
                />
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Side Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-64 bg-white dark:bg-twitter-darker shadow-xl z-50 lg:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Menu Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                  <span className="font-bold text-lg dark:text-white">
                    Menu
                  </span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-twitter-dark transition"
                  >
                    <FiX className="h-5 w-5" />
                  </button>
                </div>

                {/* User Info */}
                {user && (
                  <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                    <Link
                      to={`/${user.username}`}
                      className="flex items-center space-x-3"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <img
                        src={
                          user.profilePicture ||
                          "https://via.placeholder.com/48"
                        }
                        alt={user.name}
                        className="h-12 w-12 rounded-full"
                      />
                      <div>
                        <p className="font-bold dark:text-white">{user.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          @{user.username}
                        </p>
                      </div>
                    </Link>
                  </div>
                )}

                {/* Navigation Links */}
                <div className="flex-1 py-4">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-twitter-dark transition"
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="dark:text-white">{item.name}</span>
                      {item.badge > 0 && (
                        <span className="ml-auto bg-twitter-blue text-white text-xs px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>

                {/* Logout Button */}
                {user && (
                  <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:bg-opacity-20 rounded-lg transition"
                    >
                      <FiLogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
