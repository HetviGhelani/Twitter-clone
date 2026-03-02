import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FiSettings,
  FiHelpCircle,
  FiMoon,
  FiGlobe,
  FiShield,
  FiBookmark,
  FiBell,
  FiLock,
  FiEye,
  FiLogOut,
  FiUser,
  FiFlag,
  FiFileText,
  FiBriefcase,
} from "react-icons/fi"; // Removed FiUsers

const MorePage = () => {
  const { user, logout } = useAuth();

  const menuSections = [
    {
      title: "Account",
      items: [
        { icon: FiUser, label: "Profile", href: `/${user?.username}` },
        { icon: FiBookmark, label: "Bookmarks", href: "/bookmarks" },
        { icon: FiBell, label: "Notifications", href: "/notifications" },
        {
          icon: FiLock,
          label: "Privacy and safety",
          href: "/settings/privacy",
        },
        {
          icon: FiEye,
          label: "Accessibility",
          href: "/settings/accessibility",
        },
      ],
    },
    {
      title: "Content",
      items: [
        {
          icon: FiGlobe,
          label: "Content preferences",
          href: "/settings/content",
        },
        { icon: FiMoon, label: "Display", href: "/settings/display" },
        { icon: FiShield, label: "Security", href: "/settings/security" },
      ],
    },
    {
      title: "Support",
      items: [
        { icon: FiHelpCircle, label: "Help center", href: "/help" },
        { icon: FiFlag, label: "Report an issue", href: "/report" },
        { icon: FiFileText, label: "Terms of service", href: "/terms" },
        { icon: FiBriefcase, label: "Privacy policy", href: "/privacy" },
      ],
    },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-twitter-darker bg-opacity-80 backdrop-blur-md z-10 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-xl font-bold p-4 dark:text-white">
          Settings & Support
        </h1>
      </div>

      {/* Account Info */}
      {user && (
        <Link
          to={`/${user.username}`}
          className="flex items-center space-x-3 p-4 border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-twitter-dark transition"
        >
          <img
            src={user.profilePicture || "https://via.placeholder.com/48"}
            alt={user.name}
            className="h-12 w-12 rounded-full"
          />
          <div className="flex-1">
            <div className="font-bold dark:text-white">{user.name}</div>
            <div className="text-gray-500 dark:text-gray-400">
              @{user.username}
            </div>
          </div>
          <FiSettings className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </Link>
      )}

      {/* Menu Sections */}
      {menuSections.map((section, idx) => (
        <div key={idx} className="border-b dark:border-gray-800">
          <h2 className="font-bold px-4 pt-4 pb-2 text-gray-700 dark:text-gray-300">
            {section.title}
          </h2>
          {section.items.map((item, itemIdx) => (
            <Link
              key={itemIdx}
              to={item.href}
              className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-twitter-dark transition"
            >
              <item.icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <span className="dark:text-gray-300">{item.label}</span>
            </Link>
          ))}
        </div>
      ))}

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:bg-opacity-20 transition"
      >
        <FiLogOut className="h-5 w-5" />
        <span className="font-bold">Log out @{user?.username}</span>
      </button>

      {/* Version Info */}
      <div className="p-4 text-xs text-gray-500 dark:text-gray-400">
        <p>Version 1.0.0</p>
        <p className="mt-1">© 2024 Twitter Clone. All rights reserved.</p>
      </div>
    </div>
  );
};

export default MorePage;
