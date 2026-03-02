import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiUser,
  FiLock,
  FiBell,
  FiShield,
  FiEye,
  FiMoon,
  FiSun,
  FiHelpCircle,
  FiLogOut,
  FiTrash2,
  FiDownload,
  FiSmartphone,
  FiKey,
} from "react-icons/fi"; // Removed FiGlobe, FiMail, FiUsers
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import toast from "react-hot-toast";

const SettingsPage = ({ tab = "profile" }) => {
  const { tab: routeTab } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();

  const activeTab = routeTab || tab;

  const settingsTabs = [
    { id: "profile", name: "Profile", icon: FiUser },
    { id: "account", name: "Account", icon: FiLock },
    { id: "privacy", name: "Privacy & safety", icon: FiShield },
    { id: "notifications", name: "Notifications", icon: FiBell },
    { id: "accessibility", name: "Accessibility", icon: FiEye },
    { id: "security", name: "Security", icon: FiKey },
    { id: "data", name: "Data usage", icon: FiDownload },
    { id: "apps", name: "Apps & sessions", icon: FiSmartphone },
    { id: "help", name: "Help & support", icon: FiHelpCircle },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/login");
    toast.success("Logged out successfully");
  };

  const handleDeactivate = () => {
    toast.error("This feature is coming soon!");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>

            {/* Profile Picture */}
            <div className="flex items-center space-x-4">
              <img
                src={user?.profilePicture || "https://via.placeholder.com/64"}
                alt={user?.name}
                className="h-16 w-16 rounded-full"
              />
              <div>
                <button className="bg-twitter-blue text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-blue-600">
                  Change photo
                </button>
                <p className="text-xs text-gray-500 mt-1">
                  Maximum file size: 5MB
                </p>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                defaultValue={user?.name}
                className="w-full px-4 py-2 border rounded-lg dark:bg-twitter-dark dark:border-gray-700"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium mb-1">Bio</label>
              <textarea
                rows="3"
                defaultValue={user?.bio}
                className="w-full px-4 py-2 border rounded-lg dark:bg-twitter-dark dark:border-gray-700"
              />
              <p className="text-xs text-gray-500 mt-1">
                160 characters remaining
              </p>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                defaultValue={user?.location}
                className="w-full px-4 py-2 border rounded-lg dark:bg-twitter-dark dark:border-gray-700"
              />
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-medium mb-1">Website</label>
              <input
                type="url"
                defaultValue={user?.website}
                className="w-full px-4 py-2 border rounded-lg dark:bg-twitter-dark dark:border-gray-700"
              />
            </div>

            <button className="bg-twitter-blue text-white px-6 py-3 rounded-full font-bold hover:bg-blue-600">
              Save changes
            </button>
          </div>
        );

      case "privacy":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Privacy & Safety</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold">Protect your tweets</h3>
                  <p className="text-sm text-gray-500">
                    Only followers you approve can see your tweets
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-twitter-blue"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold">Discoverability</h3>
                  <p className="text-sm text-gray-500">
                    Let others find you by your email
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-twitter-blue"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold">Photo tagging</h3>
                  <p className="text-sm text-gray-500">
                    Allow others to tag you in photos
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-twitter-blue"></div>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="font-bold mb-2">Muted accounts</h3>
              <p className="text-sm text-gray-500">
                You haven't muted any accounts
              </p>
            </div>

            <div className="pt-4 border-t">
              <h3 className="font-bold mb-2">Blocked accounts</h3>
              <p className="text-sm text-gray-500">
                You haven't blocked any accounts
              </p>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Notifications Settings</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold">Push notifications</h3>
                  <p className="text-sm text-gray-500">
                    Receive notifications on this device
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-twitter-blue"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold">Email notifications</h3>
                  <p className="text-sm text-gray-500">
                    Receive notifications via email
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-twitter-blue"></div>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="font-bold mb-4">Notify me about</h3>

              <div className="space-y-3">
                <div className="flex items-center">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <label className="ml-2">Likes on your tweets</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <label className="ml-2">Retweets of your tweets</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <label className="ml-2">New followers</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <label className="ml-2">Replies to your tweets</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <label className="ml-2">Mentions</label>
                </div>
              </div>
            </div>
          </div>
        );

      case "display":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Display Settings</h2>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold">Dark mode</h3>
                <p className="text-sm text-gray-500">
                  Switch between light and dark theme
                </p>
              </div>
              <button
                onClick={toggleDarkMode}
                className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-full flex items-center space-x-2"
              >
                {isDarkMode ? (
                  <>
                    <FiSun className="h-5 w-5" />
                    <span>Light</span>
                  </>
                ) : (
                  <>
                    <FiMoon className="h-5 w-5" />
                    <span>Dark</span>
                  </>
                )}
              </button>
            </div>

            <div className="pt-4 border-t">
              <h3 className="font-bold mb-4">Font size</h3>
              <div className="flex space-x-4">
                {["Small", "Medium", "Large"].map((size) => (
                  <button
                    key={size}
                    className="px-4 py-2 border rounded-full hover:bg-gray-100 dark:hover:bg-twitter-dark"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Security Settings</h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-bold">Password</h3>
                <button className="text-twitter-blue text-sm mt-1">
                  Change password
                </button>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-bold mb-2">Two-factor authentication</h3>
                <button className="bg-twitter-blue text-white px-4 py-2 rounded-full text-sm font-bold">
                  Set up
                </button>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-bold mb-2">Login sessions</h3>
                <p className="text-sm text-gray-500">
                  Manage your active sessions
                </p>
                <button className="text-twitter-blue text-sm mt-2">
                  Review
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-500">
              Settings for "{activeTab}" coming soon...
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-twitter-darker">
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-twitter-darker border-b border-gray-200 dark:border-gray-800 p-4 z-10">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="hover:bg-gray-100 dark:hover:bg-twitter-dark rounded-full p-2 transition"
          >
            <FiArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-bold">Settings</h1>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-200 dark:border-gray-800 min-h-screen p-4">
          <nav className="space-y-1">
            {settingsTabs.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  to={`/settings/${item.id}`}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-full transition ${
                    activeTab === item.id
                      ? "bg-twitter-blue bg-opacity-10 text-twitter-blue font-bold"
                      : "hover:bg-gray-100 dark:hover:bg-twitter-dark"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-800">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:bg-opacity-20 rounded-full w-full transition"
            >
              <FiLogOut className="h-5 w-5" />
              <span>Log out</span>
            </button>

            <button
              onClick={handleDeactivate}
              className="flex items-center space-x-3 px-4 py-3 text-gray-500 hover:bg-gray-100 dark:hover:bg-twitter-dark rounded-full w-full transition"
            >
              <FiTrash2 className="h-5 w-5" />
              <span>Deactivate account</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default SettingsPage;
