import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import {
  FiHome,
  FiHash,
  FiBell,
  FiMail,
  FiBookmark,
  FiList,
  FiUser,
  FiMoreHorizontal,
  FiTwitter,
  FiSun,
  FiMoon,
} from "react-icons/fi";

const Sidebar = () => {
  const { user } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();

  const navigation = [
    { name: "Home", href: "/", icon: FiHome },
    { name: "Explore", href: "/explore", icon: FiHash },
    { name: "Notifications", href: "/notifications", icon: FiBell },
    { name: "Messages", href: "/messages", icon: FiMail },
    { name: "Bookmarks", href: "/bookmarks", icon: FiBookmark },
    { name: "Lists", href: "/lists", icon: FiList },
    {
      name: "Profile",
      href: user ? `/${user.username}` : "/profile",
      icon: FiUser,
    },
    { name: "More", href: "/more", icon: FiMoreHorizontal },
  ];

  return (
    <div className="h-screen flex flex-col justify-between py-2">
      <div className="space-y-2">
        {/* Logo with Text */}
        <NavLink
          to="/"
          className="flex items-center space-x-2 p-3 rounded-full hover:bg-gray-100 dark:hover:bg-twitter-dark w-fit transition group"
        >
          <FiTwitter className="h-8 w-8 text-twitter-blue" />
          <span className="text-2xl font-bold text-twitter-blue hidden xl:inline">
            Twitter Clone
          </span>
        </NavLink>

        {/* Navigation */}
        <nav className="space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center space-x-4 p-3 rounded-full hover:bg-gray-100 dark:hover:bg-twitter-dark transition group ${
                  isActive
                    ? "font-bold text-twitter-blue"
                    : "text-gray-700 dark:text-gray-300"
                }`
              }
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xl hidden xl:inline">{item.name}</span>
              {/* Show only first letter on smaller screens */}
              <span className="xl:hidden text-xl">{item.name.charAt(0)}</span>
            </NavLink>
          ))}
        </nav>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className="flex items-center space-x-4 p-3 rounded-full hover:bg-gray-100 dark:hover:bg-twitter-dark transition w-full text-gray-700 dark:text-gray-300"
        >
          {isDarkMode ? (
            <>
              <FiSun className="h-6 w-6" />
              <span className="text-xl hidden xl:inline">Light Mode</span>
              <span className="xl:hidden text-xl">☀️</span>
            </>
          ) : (
            <>
              <FiMoon className="h-6 w-6" />
              <span className="text-xl hidden xl:inline">Dark Mode</span>
              <span className="xl:hidden text-xl">🌙</span>
            </>
          )}
        </button>

        {/* Tweet Button */}
        <button className="bg-twitter-blue text-white font-bold py-3 px-8 rounded-full hover:bg-blue-600 transition w-full text-lg mt-4 hidden xl:block">
          Tweet
        </button>
        {/* Mobile Tweet Button */}
        <button className="bg-twitter-blue text-white font-bold p-3 rounded-full hover:bg-blue-600 transition xl:hidden mt-4 mx-auto block">
          <FiTwitter className="h-5 w-5" />
        </button>
      </div>

      {/* User Menu */}
      {user && (
        <NavLink
          to={`/${user.username}`}
          className="flex items-center space-x-3 p-3 rounded-full hover:bg-gray-100 dark:hover:bg-twitter-dark transition mb-2"
        >
          <img
            src={user.profilePicture || "https://via.placeholder.com/40"}
            alt={user.name}
            className="h-10 w-10 rounded-full"
          />
          <div className="flex-1 min-w-0 hidden xl:block">
            <div className="font-bold truncate dark:text-white">
              {user.name}
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-sm truncate">
              @{user.username}
            </div>
          </div>
          <FiMoreHorizontal className="h-5 w-5 text-gray-500 dark:text-gray-400 hidden xl:block" />
        </NavLink>
      )}
    </div>
  );
};

export default Sidebar;
