import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { FiImage, FiSmile, FiX, FiGlobe } from "react-icons/fi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";
import toast from "react-hot-toast";

const CreateTweet = () => {
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Create tweet mutation
  const createTweetMutation = useMutation({
    mutationFn: async (tweetData) => {
      const response = await api.post("/tweets", tweetData);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch feed
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      // Reset form
      setContent("");
      setImageFile(null);
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
        setImagePreview(null);
      }
      toast.success("Tweet posted successfully!");
    },
    onError: (error) => {
      console.error("Tweet error:", error);
      toast.error(error.response?.data?.message || "Failed to post tweet");
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim() && !imageFile) {
      toast.error("Tweet cannot be empty");
      return;
    }

    setIsUploading(true);

    try {
      let imageUrl = null;

      // Upload image if selected
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const uploadResponse = await api.post("/upload/tweet", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (uploadResponse.data.success) {
          imageUrl = uploadResponse.data.data.url;
        }
      }

      // Create tweet with or without image
      await createTweetMutation.mutateAsync({
        content: content.trim(),
        image: imageUrl,
      });
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Failed to post tweet. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const charactersLeft = 280 - content.length;
  const isOverLimit = content.length > 280;

  return (
    <div className="border-b border-gray-200 dark:border-gray-800 p-4">
      <div className="flex space-x-3">
        <img
          src={user?.profilePicture || "https://via.placeholder.com/48"}
          alt={user?.name}
          className="h-12 w-12 rounded-full flex-shrink-0"
        />

        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's happening?"
              className="w-full border-0 focus:ring-0 text-xl placeholder-gray-500 resize-none focus:outline-none dark:bg-twitter-darker dark:text-white"
              rows="3"
              disabled={isUploading || createTweetMutation.isPending}
            />

            {/* Image Preview */}
            {imagePreview && (
              <div className="relative mt-2 inline-block">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="rounded-2xl max-h-80 border border-gray-200 dark:border-gray-700"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-black bg-opacity-60 text-white rounded-full p-1 hover:bg-opacity-80 transition"
                  disabled={isUploading || createTweetMutation.isPending}
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* Privacy indicator */}
            <div className="flex items-center text-twitter-blue text-sm font-bold mt-2">
              <FiGlobe className="mr-1" /> Everyone can reply
            </div>

            {/* Action bar */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-800">
              <div className="flex space-x-3">
                <label className="cursor-pointer text-twitter-blue hover:text-blue-600 transition p-2 rounded-full hover:bg-blue-50 dark:hover:bg-twitter-dark">
                  <FiImage className="h-5 w-5" />
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={isUploading || createTweetMutation.isPending}
                  />
                </label>
                <button
                  type="button"
                  className="text-twitter-blue hover:text-blue-600 transition p-2 rounded-full hover:bg-blue-50 dark:hover:bg-twitter-dark"
                  disabled={isUploading || createTweetMutation.isPending}
                >
                  <FiSmile className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <span
                  className={`text-sm ${isOverLimit ? "text-red-500 font-bold" : "text-gray-500 dark:text-gray-400"}`}
                >
                  {charactersLeft}
                </span>

                <button
                  type="submit"
                  disabled={
                    (!content.trim() && !imageFile) ||
                    isOverLimit ||
                    isUploading ||
                    createTweetMutation.isPending
                  }
                  className="bg-twitter-blue text-white font-bold py-2 px-5 rounded-full hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading || createTweetMutation.isPending ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin h-4 w-4 mr-2"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Posting
                    </span>
                  ) : (
                    "Tweet"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTweet;
