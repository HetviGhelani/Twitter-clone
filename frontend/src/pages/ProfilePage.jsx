import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import TweetList from "../components/Tweets/TweetList";
import EditProfileModal from "../components/Profile/EditProfileModal";
import { FiCalendar, FiMapPin, FiLink, FiEdit2 } from "react-icons/fi";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { useSocket } from "../context/SocketContext";

const ProfilePage = () => {
  const { username } = useParams();
  const { user: currentUser } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const { emitFollow } = useSocket();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["profile", username],
    queryFn: () => api.get(`/users/${username}`),
  });

  const profile = data?.data.data.user;
  const tweets = data?.data.data.tweets || [];

  // Check if current user is following this profile
  React.useEffect(() => {
    if (profile && currentUser) {
      setIsFollowing(profile.followers?.includes(currentUser._id));
    }
  }, [profile, currentUser]);

  const handleFollow = async () => {
    if (!currentUser) {
      toast.error("Please login to follow users");
      return;
    }

    setFollowLoading(true);
    try {
      if (isFollowing) {
        await api.delete(`/follow/${profile._id}`);
        setIsFollowing(false);
        toast.success(`Unfollowed @${profile.username}`);
      } else {
        await api.post(`/follow/${profile._id}`);
        setIsFollowing(true);

        // Emit socket event for follow notification
        emitFollow(
          {
            _id: currentUser._id,
            name: currentUser.name,
            username: currentUser.username,
            profilePicture: currentUser.profilePicture,
          },
          {
            _id: profile._id,
            name: profile.name,
            username: profile.username,
          },
        );

        toast.success(`Following @${profile.username}`);
      }
      refetch();
    } catch (error) {
      toast.error("Failed to update follow status");
    } finally {
      setFollowLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-twitter-blue"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">User not found</p>
      </div>
    );
  }

  const isOwnProfile = currentUser?.username === username;

  return (
    <div>
      {/* Cover Image */}
      <div className="h-48 bg-gradient-to-r from-twitter-blue to-purple-600 relative">
        {profile.coverPicture && (
          <img
            src={profile.coverPicture}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Profile Info */}
      <div className="px-4 pb-4 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div className="relative -mt-12">
            <img
              src={profile.profilePicture || "https://via.placeholder.com/120"}
              alt={profile.name}
              className="h-24 w-24 rounded-full border-4 border-white"
            />
          </div>

          {isOwnProfile ? (
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="mt-2 px-4 py-2 border border-gray-300 rounded-full font-bold hover:bg-gray-100 transition flex items-center gap-2"
            >
              <FiEdit2 className="h-4 w-4" />
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleFollow}
              disabled={followLoading}
              className={`mt-2 px-4 py-2 rounded-full font-bold transition ${
                isFollowing
                  ? "border border-gray-300 hover:bg-gray-100"
                  : "bg-black text-white hover:bg-gray-800"
              } disabled:opacity-50`}
            >
              {followLoading
                ? "Loading..."
                : isFollowing
                  ? "Following"
                  : "Follow"}
            </button>
          )}
        </div>

        <div className="mt-2">
          <h2 className="text-xl font-bold">{profile.name}</h2>
          <p className="text-gray-500">@{profile.username}</p>

          {profile.bio && (
            <p className="mt-2 whitespace-pre-wrap">{profile.bio}</p>
          )}

          <div className="flex flex-wrap gap-4 mt-3 text-gray-500 text-sm">
            {profile.location && (
              <span className="flex items-center gap-1">
                <FiMapPin /> {profile.location}
              </span>
            )}
            {profile.website && (
              <span className="flex items-center gap-1">
                <FiLink />
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
              <FiCalendar />
              Joined {format(new Date(profile.createdAt), "MMMM yyyy")}
            </span>
          </div>

          <div className="flex gap-4 mt-3">
            <span>
              <strong className="text-black">
                {profile.following?.length || 0}
              </strong>{" "}
              <span className="text-gray-500">Following</span>
            </span>
            <span>
              <strong className="text-black">
                {profile.followers?.length || 0}
              </strong>{" "}
              <span className="text-gray-500">Followers</span>
            </span>
          </div>
        </div>
      </div>

      {/* Tweets */}
      <div className="mt-4">
        <h3 className="px-4 font-bold mb-2">Tweets</h3>
        {tweets.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No tweets yet</p>
        ) : (
          <TweetList tweets={tweets} />
        )}
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={profile}
      />
    </div>
  );
};

export default ProfilePage;
