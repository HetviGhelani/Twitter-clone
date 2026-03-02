import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FiArrowLeft, FiUserCheck, FiUserPlus } from "react-icons/fi";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const FollowersPage = () => {
  const { username } = useParams();
  const { user } = useAuth();
  const [following, setFollowing] = useState({});

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["followers", username],
    queryFn: () => api.get(`/users/${username}/followers`),
  });

  const followers = data?.data.data || [];

  const handleFollow = async (userId) => {
    try {
      if (following[userId]) {
        await api.delete(`/follow/${userId}`);
        setFollowing((prev) => ({ ...prev, [userId]: false }));
        toast.success("Unfollowed");
      } else {
        await api.post(`/follow/${userId}`);
        setFollowing((prev) => ({ ...prev, [userId]: true }));
        toast.success("Following");
      }
      refetch();
    } catch (error) {
      toast.error("Failed to update follow status");
    }
  };

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
      <div className="sticky top-0 bg-white dark:bg-twitter-darker border-b border-gray-200 dark:border-gray-800 p-4 z-10">
        <div className="flex items-center space-x-4">
          <Link
            to={`/${username}`}
            className="hover:bg-gray-100 dark:hover:bg-twitter-dark rounded-full p-2"
          >
            <FiArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold">Followers</h1>
            <p className="text-sm text-gray-500">@{username}</p>
          </div>
        </div>
      </div>

      {/* Followers List */}
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {followers.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-xl font-bold mb-2">No followers yet</h3>
            <p className="text-gray-500">
              When someone follows @{username}, they'll show up here.
            </p>
          </div>
        ) : (
          followers.map((follower) => (
            <div
              key={follower._id}
              className="p-4 hover:bg-gray-50 dark:hover:bg-twitter-dark transition"
            >
              <div className="flex items-center justify-between">
                <Link
                  to={`/${follower.username}`}
                  className="flex items-center space-x-3 flex-1"
                >
                  <img
                    src={
                      follower.profilePicture ||
                      "https://via.placeholder.com/48"
                    }
                    alt={follower.name}
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <div className="flex items-center space-x-1">
                      <span className="font-bold">{follower.name}</span>
                      {follower.isVerified && (
                        <span className="text-twitter-blue text-sm">✓</span>
                      )}
                    </div>
                    <span className="text-gray-500 text-sm">
                      @{follower.username}
                    </span>
                    {follower.bio && (
                      <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                        {follower.bio}
                      </p>
                    )}
                  </div>
                </Link>

                {user && user.username !== follower.username && (
                  <button
                    onClick={() => handleFollow(follower._id)}
                    className={`ml-4 px-4 py-2 rounded-full text-sm font-bold transition ${
                      following[follower._id] || follower.isFollowing
                        ? "border border-gray-300 hover:bg-gray-100"
                        : "bg-black text-white hover:bg-gray-800"
                    }`}
                  >
                    {following[follower._id] || follower.isFollowing ? (
                      <span className="flex items-center space-x-1">
                        <FiUserCheck className="h-4 w-4" />
                        <span>Following</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-1">
                        <FiUserPlus className="h-4 w-4" />
                        <span>Follow</span>
                      </span>
                    )}
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FollowersPage;
