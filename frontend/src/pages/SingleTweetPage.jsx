import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { FiArrowLeft } from "react-icons/fi";
import api from "../services/api";
import TweetCard from "../components/Tweets/TweetCard";
import ReplyModal from "../components/Tweets/ReplyModal";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const SingleTweetPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["tweet", id],
    queryFn: () => api.get(`/tweets/${id}`),
  });

  const { data: repliesData } = useQuery({
    queryKey: ["replies", id],
    queryFn: () => api.get(`/tweets/${id}/replies`),
    enabled: !!id,
  });

  const tweet = data?.data.data;
  const replies = repliesData?.data.data || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-twitter-blue"></div>
      </div>
    );
  }

  if (error || !tweet) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Tweet not found</p>
        <Link to="/" className="text-twitter-blue mt-4 inline-block">
          Go back home
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 bg-white bg-opacity-80 backdrop-blur-md z-10 border-b border-gray-200">
        <div className="flex items-center p-4">
          <Link
            to="/"
            className="mr-4 hover:bg-gray-100 rounded-full p-2 transition"
          >
            <FiArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-bold">Tweet</h1>
        </div>
      </div>

      {/* Main Tweet */}
      <div className="border-b border-gray-200">
        <div className="p-4">
          <div className="flex space-x-3">
            <Link to={`/${tweet.author.username}`}>
              <img
                src={
                  tweet.author.profilePicture ||
                  "https://via.placeholder.com/48"
                }
                alt={tweet.author.name}
                className="h-12 w-12 rounded-full"
              />
            </Link>

            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <Link
                  to={`/${tweet.author.username}`}
                  className="hover:underline"
                >
                  <span className="font-bold">{tweet.author.name}</span>
                </Link>
                <Link to={`/${tweet.author.username}`}>
                  <span className="text-gray-500">
                    @{tweet.author.username}
                  </span>
                </Link>
              </div>

              <p className="mt-2 text-xl whitespace-pre-wrap">
                {tweet.content}
              </p>

              {tweet.image && (
                <div className="mt-3 rounded-xl overflow-hidden border border-gray-200">
                  <img
                    src={tweet.image}
                    alt="Tweet attachment"
                    className="w-full h-auto"
                  />
                </div>
              )}

              <div className="mt-3 text-gray-500">
                {formatDistanceToNow(new Date(tweet.createdAt), {
                  addSuffix: true,
                })}
              </div>

              <div className="flex gap-4 mt-3 pt-3 border-t">
                <span>
                  <strong>{tweet.retweets?.length || 0}</strong> Retweets
                </span>
                <span>
                  <strong>{tweet.likes?.length || 0}</strong> Likes
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Reply Button */}
        <div className="p-4 border-t">
          <button
            onClick={() => {
              if (!user) {
                toast.error("Please login to reply");
                return;
              }
              setIsReplyModalOpen(true);
            }}
            className="w-full py-3 text-twitter-blue font-bold border border-gray-200 rounded-full hover:bg-blue-50 transition"
          >
            Reply to this tweet
          </button>
        </div>
      </div>

      {/* Replies */}
      <div>
        <h2 className="font-bold p-4 border-b">Replies</h2>
        {replies.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No replies yet</p>
        ) : (
          replies.map((reply) => <TweetCard key={reply._id} tweet={reply} />)
        )}
      </div>

      <ReplyModal
        isOpen={isReplyModalOpen}
        onClose={() => setIsReplyModalOpen(false)}
        originalTweet={tweet}
      />
    </div>
  );
};

export default SingleTweetPage;
