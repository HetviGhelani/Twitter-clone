import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";
import toast from "react-hot-toast";
import { formatDistanceToNow } from "date-fns";

const ReplyModal = ({ isOpen, onClose, originalTweet }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const replyMutation = useMutation({
    mutationFn: (replyData) => api.post("/tweets", replyData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tweet", originalTweet._id] });
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      setContent("");
      toast.success("Reply posted!");
      onClose();
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error("Reply cannot be empty");
      return;
    }

    setLoading(true);
    try {
      await replyMutation.mutateAsync({
        content,
        replyTo: originalTweet._id,
      });
    } catch (error) {
      toast.error("Failed to post reply");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const charactersLeft = 280 - content.length;
  const isOverLimit = content.length > 280;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg mx-4">
        {/* Header */}
        <div className="flex items-center p-4 border-b">
          <button
            onClick={onClose}
            className="hover:bg-gray-100 rounded-full p-2 transition"
          >
            <FiX className="h-5 w-5" />
          </button>
          <h2 className="ml-4 text-xl font-bold">Reply</h2>
        </div>

        {/* Original Tweet */}
        <div className="p-4 border-b bg-gray-50">
          <div className="flex space-x-3">
            <img
              src={
                originalTweet.author.profilePicture ||
                "https://via.placeholder.com/40"
              }
              alt={originalTweet.author.name}
              className="h-10 w-10 rounded-full"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold">{originalTweet.author.name}</span>
                <span className="text-gray-500">
                  @{originalTweet.author.username}
                </span>
                <span className="text-gray-500">·</span>
                <span className="text-gray-500">
                  {formatDistanceToNow(new Date(originalTweet.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
              <p className="mt-1">{originalTweet.content}</p>
            </div>
          </div>
        </div>

        {/* Reply Form */}
        <form onSubmit={handleSubmit} className="p-4">
          <div className="flex space-x-3">
            <img
              src={
                originalTweet.author.profilePicture ||
                "https://via.placeholder.com/40"
              }
              alt="Your avatar"
              className="h-10 w-10 rounded-full"
            />

            <div className="flex-1">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Tweet your reply"
                className="w-full border-0 focus:ring-0 text-lg placeholder-gray-500 resize-none focus:outline-none"
                rows="4"
                autoFocus
              />

              <div className="flex items-center justify-between mt-3 pt-3 border-t">
                <div className="text-twitter-blue">
                  {/* Add image upload here later */}
                </div>

                <div className="flex items-center space-x-4">
                  <span
                    className={`text-sm ${isOverLimit ? "text-red-500" : "text-gray-500"}`}
                  >
                    {charactersLeft}
                  </span>

                  <button
                    type="submit"
                    disabled={!content.trim() || loading || isOverLimit}
                    className="bg-twitter-blue text-white font-bold py-2 px-5 rounded-full hover:bg-blue-600 transition disabled:opacity-50 text-sm"
                  >
                    {loading ? "Replying..." : "Reply"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReplyModal;
