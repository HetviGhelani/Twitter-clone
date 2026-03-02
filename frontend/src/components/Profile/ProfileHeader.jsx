import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FiCalendar,
  FiMapPin,
  FiLink,
  FiEdit2,
  FiUsers,
  FiUserPlus,
  FiUserCheck,
  FiMoreHorizontal,
  FiBell,
  FiBellOff,
} from "react-icons/fi";
import { format } from "date-fns";
import toast from "react-hot-toast";

const ProfileHeader = ({
  profile,
  isOwnProfile,
  onFollow,
  onEdit,
  tweetCount,
}) => {
  const { user } = useAuth();
  const [isFollowing, setIsFollowing] = useState(profile?.isFollowing || false);
  const [followLoading, setFollowLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [notifications, setNotifications] = useState(false);

  const handleFollow = async () => {
    if (!user) {
      toast.error("Please login to follow users");
      return;
    }

    setFollowLoading(true);
    try {
      await onFollow();
      setIsFollowing(!isFollowing);
    } finally {
      setFollowLoading(false);
    }
  };

  const toggleNotifications = () => {
    setNotifications(!notifications);
    toast.success(
      notifications ? "Notifications turned off" : "Notifications turned on",
    );
    setShowMenu(false);
  };

  if (!profile) return null;

  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="h-48 md:h-60 bg-gradient-to-r from-twitter-blue to-purple-600 relative overflow-hidden">
        {profile.coverPicture ? (
          <img
            src={profile.coverPicture}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500">
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          </div>
        )}

        {/* Cover Image Overlay */}
        {isOwnProfile && (
          <button
            className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-opacity-70 transition flex items-center space-x-2"
            onClick={() => toast.success("Cover photo upload coming soon!")}
          >
            <FiEdit2 className="h-4 w-4" />
            <span>Edit cover</span>
          </button>
        )}
      </div>

      {/* Profile Info */}
      <div className="px-4 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex justify-between items-start">
          {/* Profile Picture */}
          <div className="relative -mt-12 md:-mt-16">
            <div className="relative group">
              <img
                src={
                  profile.profilePicture || "https://via.placeholder.com/120"
                }
                alt={profile.name}
                className="h-24 w-24 md:h-32 md:w-32 rounded-full border-4 border-white dark:border-twitter-darker"
              />
              {isOwnProfile && (
                <button
                  onClick={() =>
                    toast.success("Profile picture upload coming soon!")
                  }
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <FiEdit2 className="h-6 w-6 text-white" />
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 mt-2">
            {isOwnProfile ? (
              <button
                onClick={onEdit}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full font-bold hover:bg-gray-100 dark:hover:bg-twitter-dark transition flex items-center space-x-2"
              >
                <FiEdit2 className="h-4 w-4" />
                <span>Edit profile</span>
              </button>
            ) : (
              <>
                {/* Follow/Unfollow Button */}
                <button
                  onClick={handleFollow}
                  disabled={followLoading}
                  className={`px-4 py-2 rounded-full font-bold transition flex items-center space-x-2 ${
                    isFollowing
                      ? "border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-twitter-dark"
                      : "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                  } disabled:opacity-50`}
                >
                  {followLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin h-4 w-4 mr-2"
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
                      {isFollowing ? "Unfollowing..." : "Following..."}
                    </span>
                  ) : (
                    <>
                      {isFollowing ? (
                        <>
                          <FiUserCheck className="h-5 w-5" />
                          <span>Following</span>
                        </>
                      ) : (
                        <>
                          <FiUserPlus className="h-5 w-5" />
                          <span>Follow</span>
                        </>
                      )}
                    </>
                  )}
                </button>

                {/* More Options Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="p-2 border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-twitter-dark transition"
                  >
                    <FiMoreHorizontal className="h-5 w-5" />
                  </button>

                  {showMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-twitter-dark rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20">
                      <button
                        onClick={toggleNotifications}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-twitter-darker flex items-center space-x-2 transition"
                      >
                        {notifications ? (
                          <>
                            <FiBellOff className="h-4 w-4" />
                            <span>Turn off notifications</span>
                          </>
                        ) : (
                          <>
                            <FiBell className="h-4 w-4" />
                            <span>Turn on notifications</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() =>
                          toast.success("Report feature coming soon!")
                        }
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-twitter-darker flex items-center space-x-2 text-red-500 transition"
                      >
                        <span>Report user</span>
                      </button>
                      <button
                        onClick={() =>
                          toast.success("Block feature coming soon!")
                        }
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-twitter-darker flex items-center space-x-2 text-red-500 transition"
                      >
                        <span>Block @{profile.username}</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* User Details */}
        <div className="mt-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold dark:text-white">
              {profile.name}
            </h2>
            {profile.isVerified && (
              <span className="text-twitter-blue" title="Verified account">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484z" />
                </svg>
              </span>
            )}
          </div>

          <p className="text-gray-500 dark:text-gray-400">
            @{profile.username}
          </p>

          {/* Bio */}
          {profile.bio && (
            <p className="mt-3 text-gray-700 dark:text-gray-300 whitespace-pre-wrap max-w-2xl">
              {profile.bio}
            </p>
          )}

          {/* Location, Website, Join Date */}
          <div className="flex flex-wrap gap-4 mt-3 text-gray-500 dark:text-gray-400 text-sm">
            {profile.location && (
              <span className="flex items-center gap-1">
                <FiMapPin className="h-4 w-4" />
                {profile.location}
              </span>
            )}
            {profile.website && (
              <span className="flex items-center gap-1">
                <FiLink className="h-4 w-4" />
                <a
                  href={
                    profile.website.startsWith("http")
                      ? profile.website
                      : `https://${profile.website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-twitter-blue hover:underline"
                >
                  {profile.website.replace(/^https?:\/\//, "")}
                </a>
              </span>
            )}
            <span className="flex items-center gap-1">
              <FiCalendar className="h-4 w-4" />
              Joined {format(new Date(profile.createdAt), "MMMM yyyy")}
            </span>
          </div>

          {/* Follow Stats */}
          <div className="flex gap-4 mt-4">
            <Link
              to={`/${profile.username}/following`}
              className="flex items-center space-x-1 hover:underline"
            >
              <span className="font-bold text-gray-900 dark:text-white">
                {profile.following?.length || 0}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                Following
              </span>
            </Link>
            <Link
              to={`/${profile.username}/followers`}
              className="flex items-center space-x-1 hover:underline"
            >
              <span className="font-bold text-gray-900 dark:text-white">
                {profile.followers?.length || 0}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                Followers
              </span>
            </Link>
          </div>

          {/* Tweet Stats */}
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-medium text-gray-900 dark:text-white">
              {tweetCount}
            </span>{" "}
            Tweets
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
