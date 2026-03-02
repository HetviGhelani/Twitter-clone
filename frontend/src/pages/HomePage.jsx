import React from "react";
import { useQuery } from "@tanstack/react-query";
import CreateTweet from "../components/Tweets/CreateTweet";
import TweetList from "../components/Tweets/TweetList";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { FiLoader } from "react-icons/fi";

const HomePage = () => {
  const { user } = useAuth();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["feed"],
    queryFn: async () => {
      const response = await api.get("/tweets?page=1&limit=20");
      return response.data;
    },
    enabled: !!user,
  });

  const tweets = data?.data?.tweets || [];

  // Manual refetch when needed
  const handleRefresh = () => {
    refetch();
  };

  if (!user) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">
          Welcome to Twitter Clone
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Please login to see your feed
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FiLoader className="h-8 w-8 animate-spin text-twitter-blue" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 mb-4">
          Error loading feed. Please try again.
        </p>
        <button
          onClick={handleRefresh}
          className="bg-twitter-blue text-white px-6 py-2 rounded-full hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="sticky top-0 bg-white dark:bg-twitter-darker bg-opacity-80 backdrop-blur-md z-10 border-b border-gray-200 dark:border-gray-800">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-xl font-bold dark:text-white">Home</h1>
          <button
            onClick={handleRefresh}
            className="text-twitter-blue hover:bg-blue-50 dark:hover:bg-twitter-dark p-2 rounded-full"
            title="Refresh"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
      </div>

      <CreateTweet />

      {tweets.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🐦</div>
          <h3 className="text-xl font-bold mb-2 dark:text-white">
            No tweets yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Be the first to tweet something!
          </p>
        </div>
      ) : (
        <TweetList tweets={tweets} />
      )}
    </div>
  );
};

export default HomePage;
