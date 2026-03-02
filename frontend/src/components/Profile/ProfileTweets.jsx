import React, { useState } from "react";
import { Link } from "react-router-dom";
import TweetCard from "../Tweets/TweetCard";
import { FiGrid, FiHeart, FiImage, FiCalendar } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const ProfileTweets = ({ tweets, username, isLoading }) => {
  const [activeTab, setActiveTab] = useState("tweets");
  const [filter, setFilter] = useState("");

  const tabs = [
    { id: "tweets", label: "Tweets", icon: FiGrid },
    { id: "replies", label: "Tweets & replies", icon: FiCalendar },
    { id: "media", label: "Media", icon: FiImage },
    { id: "likes", label: "Likes", icon: FiHeart },
  ];

  const filteredTweets = () => {
    let filtered = tweets || [];

    switch (activeTab) {
      case "replies":
        filtered = filtered.filter((t) => t.isReply);
        break;
      case "media":
        filtered = filtered.filter((t) => t.image);
        break;
      case "likes":
        filtered = filtered.filter((t) => t.isLiked);
        break;
      default:
        filtered = filtered.filter((t) => !t.isReply);
    }

    if (filter) {
      filtered = filtered.filter((t) =>
        t.content.toLowerCase().includes(filter.toLowerCase()),
      );
    }

    return filtered;
  };

  const displayTweets = filteredTweets();

  // Loading skeletons
  if (isLoading) {
    return (
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 animate-pulse">
            <div className="flex space-x-3">
              <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Profile Tabs */}
      <div className="sticky top-0 bg-white dark:bg-twitter-darker bg-opacity-80 backdrop-blur-md z-10 border-b border-gray-200 dark:border-gray-800">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 font-medium transition relative ${
                  activeTab === tab.id
                    ? "text-twitter-blue"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">
                  <Icon className="h-5 w-5 mx-auto" />
                </span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-twitter-blue"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Search/Filter Bar */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter tweets..."
          className="w-full px-4 py-2 bg-gray-100 dark:bg-twitter-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-twitter-blue dark:text-white"
        />
      </div>

      {/* Tweets List */}
      <AnimatePresence mode="wait">
        {displayTweets.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">
              {activeTab === "media"
                ? "📸"
                : activeTab === "likes"
                  ? "❤️"
                  : activeTab === "replies"
                    ? "💬"
                    : "🐦"}
            </div>
            <h3 className="text-xl font-bold mb-2 dark:text-white">
              {activeTab === "tweets" && `@${username} hasn't tweeted yet`}
              {activeTab === "replies" && `@${username} hasn't replied yet`}
              {activeTab === "media" && `@${username} hasn't posted media yet`}
              {activeTab === "likes" &&
                `@${username} hasn't liked any tweets yet`}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
              {activeTab === "tweets" &&
                "When they do, their tweets will show up here."}
              {activeTab === "replies" &&
                "When they reply to others, it will show up here."}
              {activeTab === "media" && "Photos and videos will appear here."}
              {activeTab === "likes" && "Tweets they like will show up here."}
            </p>

            {activeTab === "tweets" && (
              <Link
                to="/explore"
                className="inline-block mt-4 bg-twitter-blue text-white px-6 py-3 rounded-full font-bold hover:bg-blue-600 transition"
              >
                Explore Tweets
              </Link>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="tweets"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="divide-y divide-gray-100 dark:divide-gray-800"
          >
            {displayTweets.map((tweet, index) => (
              <motion.div
                key={tweet._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <TweetCard tweet={tweet} />
              </motion.div>
            ))}

            {/* Load More Button */}
            {displayTweets.length > 0 && (
              <div className="p-4 text-center">
                <button
                  onClick={() => toast.success("Loading more tweets...")}
                  className="text-twitter-blue hover:bg-blue-50 dark:hover:bg-twitter-dark px-6 py-2 rounded-full transition font-medium"
                >
                  Load more
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Pinned Tweet Component
export const PinnedTweet = ({ tweet }) => {
  return (
    <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 border-b border-gray-200 dark:border-gray-800">
      <div className="px-4 pt-3 text-xs text-twitter-blue font-bold flex items-center space-x-2">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 12L12 2 2 12h3v8h14v-8h3zM8 14v-4l4-4 4 4v4h-3v-3h-2v3H8z" />
        </svg>
        <span>Pinned Tweet</span>
      </div>
      <TweetCard tweet={tweet} />
    </div>
  );
};

// Media Grid Component
export const MediaGrid = ({ tweets }) => {
  const mediaTweets = tweets.filter((t) => t.image);

  if (mediaTweets.length === 0) return null;

  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-800">
      <h3 className="font-bold text-lg mb-4 dark:text-white">Media</h3>
      <div className="grid grid-cols-3 gap-1">
        {mediaTweets.slice(0, 6).map((tweet) => (
          <Link
            key={tweet._id}
            to={`/tweet/${tweet._id}`}
            className="aspect-square overflow-hidden rounded-lg hover:opacity-90 transition"
          >
            <img
              src={tweet.image}
              alt="Tweet media"
              className="w-full h-full object-cover"
            />
          </Link>
        ))}
      </div>
      {mediaTweets.length > 6 && (
        <button className="text-twitter-blue mt-3 text-sm hover:underline">
          Show all {mediaTweets.length} media
        </button>
      )}
    </div>
  );
};

export default ProfileTweets;
