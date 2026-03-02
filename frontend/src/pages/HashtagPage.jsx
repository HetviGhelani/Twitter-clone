import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FiHash, FiArrowLeft } from "react-icons/fi";
import api from "../services/api";
import TweetList from "../components/Tweets/TweetList";
import { useAuth } from "../context/AuthContext";

const HashtagPage = () => {
  const { tag } = useParams();
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["hashtag", tag],
    queryFn: () => api.get(`/tweets/hashtag/${tag}`),
    enabled: !!user,
  });

  const tweets = data?.data.data || [];

  if (!user) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">#{tag}</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Please login to see tweets
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-twitter-blue"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-twitter-darker bg-opacity-80 backdrop-blur-md z-10 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center p-4">
          <Link
            to="/explore"
            className="mr-4 hover:bg-gray-100 dark:hover:bg-twitter-dark rounded-full p-2 transition"
          >
            <FiArrowLeft className="h-5 w-5 dark:text-white" />
          </Link>
          <div>
            <h1 className="text-xl font-bold flex items-center dark:text-white">
              <FiHash className="mr-1" /> {tag}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {tweets.length} {tweets.length === 1 ? "tweet" : "tweets"}
            </p>
          </div>
        </div>
      </div>

      {/* Tweets */}
      {tweets.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold mb-2 dark:text-white">
            No tweets found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            There are no tweets with #{tag} yet.
          </p>
        </div>
      ) : (
        <TweetList tweets={tweets} />
      )}
    </div>
  );
};

export default HashtagPage;
