import React, { useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import {
  FiHeart,
  FiRepeat,
  FiMessageCircle,
  FiShare,
  FiMoreHorizontal,
  FiTrash2,
  FiEdit,
  FiFlag,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";
import toast from "react-hot-toast";

const TweetCard = ({ tweet }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isLiked, setIsLiked] = useState(tweet.likes?.includes(user?._id));
  const [likesCount, setLikesCount] = useState(tweet.likes?.length || 0);
  const [isRetweeted, setIsRetweeted] = useState(
    tweet.retweets?.includes(user?._id),
  );
  const [retweetsCount, setRetweetsCount] = useState(
    tweet.retweets?.length || 0,
  );
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const isOwnTweet = user?._id === tweet.author._id;

  // Delete tweet mutation
  const deleteTweetMutation = useMutation({
    mutationFn: async () => {
      const response = await api.delete(`/tweets/${tweet._id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Tweet deleted successfully");
      setShowMenu(false);
      setShowDeleteConfirm(false);
    },
    onError: (error) => {
      console.error("Delete error:", error);
      toast.error(error.response?.data?.message || "Failed to delete tweet");
      setShowMenu(false);
      setShowDeleteConfirm(false);
    },
  });

  // Like tweet mutation
  const likeMutation = useMutation({
    mutationFn: async () => {
      const response = await api.put(`/tweets/${tweet._id}/like`);
      return response.data;
    },
    onSuccess: (data) => {
      setIsLiked(data.data.isLiked);
      setLikesCount(data.data.likes.length);
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
    onError: () => {
      toast.error("Failed to like tweet");
    },
  });

  // Retweet mutation
  const retweetMutation = useMutation({
    mutationFn: async () => {
      const response = await api.put(`/tweets/${tweet._id}/retweet`);
      return response.data;
    },
    onSuccess: (data) => {
      setIsRetweeted(data.data.isRetweeted);
      setRetweetsCount(data.data.retweets.length);
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
    onError: () => {
      toast.error("Failed to retweet");
    },
  });

  const handleLike = () => {
    if (!user) {
      toast.error("Please login to like tweets");
      return;
    }
    likeMutation.mutate();
  };

  const handleRetweet = () => {
    if (!user) {
      toast.error("Please login to retweet");
      return;
    }
    retweetMutation.mutate();
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
    setShowMenu(false);
  };

  const confirmDelete = () => {
    deleteTweetMutation.mutate();
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      if (showMenu) setShowMenu(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showMenu]);

  return (
    <>
      <div className="border-b border-gray-200 dark:border-gray-800 p-4 hover:bg-gray-50 dark:hover:bg-twitter-dark transition relative">
        <div className="flex space-x-3">
          {/* Avatar */}
          <Link to={`/${tweet.author.username}`} className="flex-shrink-0">
            <img
              src={
                tweet.author.profilePicture || "https://via.placeholder.com/48"
              }
              alt={tweet.author.name}
              className="h-12 w-12 rounded-full hover:opacity-90 transition"
            />
          </Link>

          {/* Tweet Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 flex-wrap">
                <Link
                  to={`/${tweet.author.username}`}
                  className="hover:underline"
                >
                  <span className="font-bold dark:text-white">
                    {tweet.author.name}
                  </span>
                </Link>
                {tweet.author.isVerified && (
                  <span className="text-twitter-blue text-sm">✓</span>
                )}
                <Link
                  to={`/${tweet.author.username}`}
                  className="hover:underline"
                >
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    @{tweet.author.username}
                  </span>
                </Link>
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  ·
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm hover:underline">
                  {formatDistanceToNow(new Date(tweet.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>

              {/* Menu Button */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMenu();
                  }}
                  className="text-gray-500 hover:text-twitter-blue p-2 rounded-full hover:bg-blue-50 dark:hover:bg-twitter-dark"
                >
                  <FiMoreHorizontal className="h-4 w-4" />
                </button>

                {/* Dropdown Menu */}
                {showMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-twitter-dark rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20">
                    {isOwnTweet ? (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete();
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-twitter-darker flex items-center space-x-2 text-red-500 first:rounded-t-lg transition"
                        >
                          <FiTrash2 className="h-4 w-4" />
                          <span>Delete</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowMenu(false);
                            // Add edit functionality later
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-twitter-darker flex items-center space-x-2 text-gray-700 dark:text-gray-300 transition"
                        >
                          <FiEdit className="h-4 w-4" />
                          <span>Edit</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowMenu(false);
                            // Add follow functionality
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-twitter-darker flex items-center space-x-2 text-twitter-blue first:rounded-t-lg transition"
                        >
                          <FiRepeat className="h-4 w-4" />
                          <span>Follow @{tweet.author.username}</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowMenu(false);
                            // Add report functionality
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-twitter-darker flex items-center space-x-2 text-red-500 transition"
                        >
                          <FiFlag className="h-4 w-4" />
                          <span>Report tweet</span>
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Tweet Text */}
            <Link to={`/tweet/${tweet._id}`}>
              <p className="mt-2 text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words">
                {tweet.content}
              </p>
            </Link>

            {/* Tweet Image */}
            {tweet.image && (
              <div className="mt-3 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <img
                  src={tweet.image}
                  alt="Tweet attachment"
                  className="w-full h-auto max-h-96 object-cover"
                  loading="lazy"
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between mt-3 max-w-md">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Reply functionality
                }}
                className="flex items-center space-x-2 text-gray-500 hover:text-twitter-blue group"
              >
                <div className="p-2 rounded-full group-hover:bg-blue-50 dark:group-hover:bg-twitter-dark">
                  <FiMessageCircle className="h-5 w-5" />
                </div>
                <span className="text-sm">{tweet.replies?.length || 0}</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRetweet();
                }}
                className={`flex items-center space-x-2 group ${
                  isRetweeted
                    ? "text-green-500"
                    : "text-gray-500 hover:text-green-500"
                }`}
              >
                <div
                  className={`p-2 rounded-full ${
                    isRetweeted
                      ? "bg-green-50 dark:bg-green-900 dark:bg-opacity-20"
                      : "group-hover:bg-green-50 dark:group-hover:bg-twitter-dark"
                  }`}
                >
                  <FiRepeat className="h-5 w-5" />
                </div>
                <span className="text-sm">{retweetsCount}</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike();
                }}
                className={`flex items-center space-x-2 group ${
                  isLiked ? "text-red-500" : "text-gray-500 hover:text-red-500"
                }`}
              >
                <div
                  className={`p-2 rounded-full ${
                    isLiked
                      ? "bg-red-50 dark:bg-red-900 dark:bg-opacity-20"
                      : "group-hover:bg-red-50 dark:group-hover:bg-twitter-dark"
                  }`}
                >
                  <FiHeart
                    className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`}
                  />
                </div>
                <span className="text-sm">{likesCount}</span>
              </button>

              <button className="flex items-center space-x-2 text-gray-500 hover:text-twitter-blue group">
                <div className="p-2 rounded-full group-hover:bg-blue-50 dark:group-hover:bg-twitter-dark">
                  <FiShare className="h-5 w-5" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-twitter-dark rounded-2xl p-6 max-w-md mx-4">
            <h3 className="text-xl font-bold mb-4 dark:text-white">
              Delete Tweet?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This can't be undone and it will be removed from your profile, the
              timeline of any accounts that follow you, and from Twitter search
              results.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={confirmDelete}
                disabled={deleteTweetMutation.isPending}
                className="flex-1 bg-red-500 text-white font-bold py-3 px-4 rounded-full hover:bg-red-600 transition disabled:opacity-50"
              >
                {deleteTweetMutation.isPending ? "Deleting..." : "Delete"}
              </button>
              <button
                onClick={cancelDelete}
                className="flex-1 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold py-3 px-4 rounded-full hover:bg-gray-100 dark:hover:bg-twitter-darker transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TweetCard;
