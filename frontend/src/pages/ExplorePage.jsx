import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  FiSearch,
  FiTrendingUp,
  FiUsers,
  FiHash,
  FiImage,
  FiVideo,
} from "react-icons/fi";
import api from "../services/api";
import TweetList from "../components/Tweets/TweetList";

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("for-you");

  // Mock trending topics
  const trendingTopics = [
    { category: "Technology", topic: "React 19", tweets: "125K" },
    { category: "Technology", topic: "TypeScript", tweets: "89K" },
    { category: "News", topic: "#Election2024", tweets: "2.1M" },
    { category: "Sports", topic: "Champions League", tweets: "456K" },
    { category: "Entertainment", topic: "#Oscars", tweets: "789K" },
    { category: "Gaming", topic: "GTA 6", tweets: "1.2M" },
    { category: "Music", topic: "Taylor Swift", tweets: "987K" },
    { category: "Business", topic: "Bitcoin", tweets: "234K" },
  ];

  // Mock suggested users
  const suggestedUsers = [
    {
      username: "techcrunch",
      name: "TechCrunch",
      followers: "2.5M",
      verified: true,
    },
    { username: "verge", name: "The Verge", followers: "1.8M", verified: true },
    { username: "wired", name: "WIRED", followers: "1.2M", verified: true },
    {
      username: "producthunt",
      name: "Product Hunt",
      followers: "890K",
      verified: false,
    },
  ];

  // Mock tweets for different categories
  const mockTweets = [
    {
      _id: "1",
      content:
        "Just released React 19 RC! Check out the new features including Server Components and improved Suspense 🚀",
      author: {
        _id: "101",
        name: "React",
        username: "react",
        profilePicture: null,
        isVerified: true,
      },
      likes: ["user1", "user2", "user3", "user4", "user5"],
      retweets: ["user6", "user7", "user8"],
      replies: ["reply1", "reply2"],
      createdAt: new Date(),
      image: null,
    },
    {
      _id: "2",
      content:
        "TypeScript 5.4 is here! Better type checking and performance improvements",
      author: {
        _id: "102",
        name: "TypeScript",
        username: "typescript",
        profilePicture: null,
        isVerified: true,
      },
      likes: ["user9", "user10", "user11"],
      retweets: ["user12", "user13"],
      replies: ["reply3"],
      createdAt: new Date(Date.now() - 1000 * 60 * 30),
      image: null,
    },
  ];

  const { data: searchResults, refetch } = useQuery({
    queryKey: ["search", searchQuery],
    queryFn: () => api.get(`/users/search?q=${searchQuery}`),
    enabled: false,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      refetch();
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-twitter-darker bg-opacity-80 backdrop-blur-md z-10 border-b border-gray-200 dark:border-gray-800">
        <div className="p-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch}>
            <div className="relative">
              <FiSearch className="absolute left-4 top-3 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Twitter"
                className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-twitter-dark rounded-full focus:outline-none focus:ring-2 focus:ring-twitter-blue focus:bg-white dark:focus:bg-twitter-darker transition dark:text-white"
              />
            </div>
          </form>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto hide-scrollbar border-b dark:border-gray-800">
          {[
            { id: "for-you", label: "For you", icon: FiTrendingUp },
            { id: "trending", label: "Trending", icon: FiHash },
            { id: "news", label: "News", icon: FiImage },
            { id: "sports", label: "Sports", icon: FiVideo },
            { id: "entertainment", label: "Entertainment", icon: FiUsers },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 font-medium whitespace-nowrap transition ${
                activeTab === tab.id
                  ? "text-twitter-blue border-b-2 border-twitter-blue"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-twitter-dark"
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
        {/* Left Column - Tweets */}
        <div className="lg:col-span-2">
          {searchResults ? (
            <div className="space-y-4">
              <h2 className="font-bold text-xl dark:text-white">
                Search Results
              </h2>
              {searchResults.data.data.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">
                  No results found
                </p>
              ) : (
                searchResults.data.data.map((user) => (
                  <Link
                    key={user._id}
                    to={`/${user.username}`}
                    className="flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-twitter-dark rounded-lg transition"
                  >
                    <img
                      src={
                        user.profilePicture || "https://via.placeholder.com/48"
                      }
                      alt={user.name}
                      className="h-12 w-12 rounded-full"
                    />
                    <div>
                      <div className="font-bold dark:text-white">
                        {user.name}
                      </div>
                      <div className="text-gray-500 dark:text-gray-400">
                        @{user.username}
                      </div>
                      {user.bio && (
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {user.bio}
                        </div>
                      )}
                    </div>
                  </Link>
                ))
              )}
            </div>
          ) : (
            <>
              <h2 className="font-bold text-xl mb-4 dark:text-white">
                {activeTab
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </h2>
              <TweetList tweets={mockTweets} />
            </>
          )}
        </div>

        {/* Right Column - Trends & Suggestions */}
        <div className="hidden lg:block space-y-4">
          {/* Trending */}
          <div className="bg-gray-50 dark:bg-twitter-dark rounded-2xl p-4">
            <h3 className="font-bold text-xl mb-4 dark:text-white">Trending</h3>
            <div className="space-y-4">
              {trendingTopics.map((trend, index) => (
                <div
                  key={index}
                  className="hover:bg-gray-100 dark:hover:bg-twitter-darker -mx-4 px-4 py-2 cursor-pointer"
                >
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {trend.category}
                  </p>
                  <p className="font-bold dark:text-white">{trend.topic}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {trend.tweets} Tweets
                  </p>
                </div>
              ))}
            </div>
            <button className="text-twitter-blue mt-2 text-sm hover:underline">
              Show more
            </button>
          </div>

          {/* Who to follow */}
          <div className="bg-gray-50 dark:bg-twitter-dark rounded-2xl p-4">
            <h3 className="font-bold text-xl mb-4 dark:text-white">
              Who to follow
            </h3>
            <div className="space-y-4">
              {suggestedUsers.map((user, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={`https://via.placeholder.com/48`}
                      alt={user.name}
                      className="h-12 w-12 rounded-full"
                    />
                    <div>
                      <div className="flex items-center space-x-1">
                        <span className="font-bold dark:text-white">
                          {user.name}
                        </span>
                        {user.verified && (
                          <span className="text-twitter-blue text-sm">✓</span>
                        )}
                      </div>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        @{user.username}
                      </span>
                    </div>
                  </div>
                  <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-800 dark:hover:bg-gray-200">
                    Follow
                  </button>
                </div>
              ))}
            </div>
            <button className="text-twitter-blue mt-2 text-sm hover:underline">
              Show more
            </button>
          </div>

          {/* Footer Links - Changed anchors to buttons */}
          <div className="text-xs text-gray-500 dark:text-gray-400 px-4">
            <div className="flex flex-wrap gap-2">
              <button className="hover:underline focus:outline-none">
                Terms of Service
              </button>
              <button className="hover:underline focus:outline-none">
                Privacy Policy
              </button>
              <button className="hover:underline focus:outline-none">
                Cookie Policy
              </button>
              <button className="hover:underline focus:outline-none">
                Accessibility
              </button>
              <button className="hover:underline focus:outline-none">
                Ads info
              </button>
              <span>© 2024 Twitter Clone</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
