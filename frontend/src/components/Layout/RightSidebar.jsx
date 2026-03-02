import React from "react";
import { FiSearch, FiHash, FiMoreHorizontal } from "react-icons/fi"; // Removed unused Link and FiUsers

const RightSidebar = () => {
  // Mock trending topics
  const trendingTopics = [
    { category: "Technology · Trending", topic: "React 19", tweets: "125K" },
    { category: "Technology · Trending", topic: "JavaScript", tweets: "89K" },
    { category: "Programming · Trending", topic: "#WebDev", tweets: "56K" },
    {
      category: "AI · Trending",
      topic: "#ArtificialIntelligence",
      tweets: "234K",
    },
    { category: "Gaming · Trending", topic: "GTA 6", tweets: "1.2M" },
    { category: "News · Trending", topic: "#TechNews", tweets: "78K" },
  ];

  // Mock who to follow
  const whoToFollow = [
    {
      name: "Vercel",
      username: "vercel",
      verified: true,
      bio: "The Frontend Cloud",
      followers: "245K",
    },
    {
      name: "React",
      username: "reactjs",
      verified: true,
      bio: "The library for web and native user interfaces",
      followers: "1.2M",
    },
    {
      name: "Tailwind CSS",
      username: "tailwindcss",
      verified: true,
      bio: "A utility-first CSS framework",
      followers: "890K",
    },
    {
      name: "TypeScript",
      username: "typescript",
      verified: true,
      bio: "JavaScript with syntax for types",
      followers: "567K",
    },
  ];

  return (
    <div className="sticky top-0 h-screen overflow-y-auto hide-scrollbar">
      <div className="p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <FiSearch className="absolute left-4 top-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search Twitter"
            className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-twitter-dark rounded-full focus:outline-none focus:ring-2 focus:ring-twitter-blue focus:bg-white dark:focus:bg-twitter-darker dark:text-white transition text-sm"
          />
        </div>

        {/* Premium Banner */}
        <div className="bg-gray-50 dark:bg-twitter-dark rounded-2xl p-4">
          <h2 className="font-bold text-xl mb-1 dark:text-white">
            Subscribe to Premium
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
            Subscribe to unlock new features and if eligible, receive a share of
            ad revenue.
          </p>
          <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full font-bold text-sm hover:bg-gray-800 dark:hover:bg-gray-200 transition">
            Subscribe
          </button>
        </div>

        {/* Trending Section */}
        <div className="bg-gray-50 dark:bg-twitter-dark rounded-2xl overflow-hidden">
          <h2 className="font-bold text-xl p-4 dark:text-white">
            Trending for you
          </h2>
          {trendingTopics.slice(0, 5).map((topic, index) => (
            <div
              key={index}
              className="hover:bg-gray-100 dark:hover:bg-twitter-darker px-4 py-3 cursor-pointer transition group"
            >
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {topic.category}
                </p>
                <FiMoreHorizontal className="h-4 w-4 text-gray-500 opacity-0 group-hover:opacity-100 transition" />
              </div>
              <p className="font-bold dark:text-white mt-0.5 flex items-center">
                <FiHash className="mr-1 text-gray-500" /> {topic.topic}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {topic.tweets} Tweets
              </p>
            </div>
          ))}
          <button className="text-twitter-blue hover:bg-gray-100 dark:hover:bg-twitter-darker w-full text-left p-4 transition text-sm font-medium">
            Show more
          </button>
        </div>

        {/* Who to Follow Section */}
        <div className="bg-gray-50 dark:bg-twitter-dark rounded-2xl overflow-hidden">
          <h2 className="font-bold text-xl p-4 dark:text-white">
            Who to follow
          </h2>
          {whoToFollow.map((user, index) => (
            <div
              key={index}
              className="hover:bg-gray-100 dark:hover:bg-twitter-darker px-4 py-3 transition"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={`https://via.placeholder.com/48`}
                    alt={user.name}
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <div className="flex items-center space-x-1">
                      <span className="font-bold dark:text-white hover:underline cursor-pointer">
                        {user.name}
                      </span>
                      {user.verified && (
                        <span className="text-twitter-blue text-sm">✓</span>
                      )}
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 text-sm block">
                      @{user.username}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {user.followers} followers
                    </span>
                  </div>
                </div>
                <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-1.5 rounded-full text-sm font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition">
                  Follow
                </button>
              </div>
            </div>
          ))}
          <button className="text-twitter-blue hover:bg-gray-100 dark:hover:bg-twitter-darker w-full text-left p-4 transition text-sm font-medium">
            Show more
          </button>
        </div>

        {/* Footer Links */}
        <div className="text-xs text-gray-500 dark:text-gray-400 px-2">
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            <button className="hover:underline">Terms of Service</button>
            <button className="hover:underline">Privacy Policy</button>
            <button className="hover:underline">Cookie Policy</button>
            <button className="hover:underline">Accessibility</button>
            <button className="hover:underline">Ads info</button>
            <button className="hover:underline">More ···</button>
          </div>
          <p className="mt-2">© 2024 Twitter Clone</p>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
