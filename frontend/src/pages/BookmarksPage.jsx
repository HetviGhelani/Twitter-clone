import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiBookmark,
  FiMoreHorizontal,
  FiTrash2,
  FiArrowLeft,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import TweetCard from "../components/Tweets/TweetCard";

const BookmarksPage = () => {
  const { user } = useAuth();
  const [selectedTweets, setSelectedTweets] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  // Mock bookmarked tweets
  const mockBookmarks = [
    {
      _id: "1",
      content:
        "This is a great thread about React hooks and how to use them effectively in your projects 🚀",
      author: {
        _id: "101",
        name: "React Guru",
        username: "reactguru",
        profilePicture: null,
        isVerified: true,
      },
      likes: ["user1", "user2", "user3"],
      retweets: ["user4", "user5"],
      replies: ["reply1", "reply2"],
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
      image: null,
    },
    {
      _id: "2",
      content:
        "Just launched my new portfolio website! Check it out and let me know what you think 🎨",
      author: {
        _id: "102",
        name: "Design Master",
        username: "designmaster",
        profilePicture: null,
        isVerified: false,
      },
      likes: ["user6", "user7"],
      retweets: ["user8"],
      replies: ["reply3"],
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
      image: "https://via.placeholder.com/600x400",
    },
    {
      _id: "3",
      content:
        "JavaScript tip of the day: Use optional chaining (?.) to avoid Cannot read property errors! 🎯",
      author: {
        _id: "103",
        name: "JS Tips",
        username: "jstips",
        profilePicture: null,
        isVerified: true,
      },
      likes: ["user9", "user10", "user11", "user12"],
      retweets: ["user13", "user14"],
      replies: ["reply4", "reply5", "reply6"],
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      image: null,
    },
  ];

  const bookmarks = mockBookmarks;

  const handleSelectTweet = (tweetId) => {
    setSelectedTweets((prev) => {
      if (prev.includes(tweetId)) {
        const newSelected = prev.filter((id) => id !== tweetId);
        if (newSelected.length === 0) {
          setIsSelectionMode(false);
        }
        return newSelected;
      } else {
        return [...prev, tweetId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedTweets.length === bookmarks.length) {
      setSelectedTweets([]);
      setIsSelectionMode(false);
    } else {
      setSelectedTweets(bookmarks.map((t) => t._id));
      setIsSelectionMode(true);
    }
  };

  const handleRemoveBookmarks = () => {
    console.log("Removing bookmarks:", selectedTweets);
    setSelectedTweets([]);
    setIsSelectionMode(false);
    setShowMenu(false);
    alert(
      `${selectedTweets.length} bookmark${selectedTweets.length !== 1 ? "s" : ""} removed`,
    );
  };

  const enterSelectionMode = () => {
    setIsSelectionMode(true);
  };

  const exitSelectionMode = () => {
    setIsSelectionMode(false);
    setSelectedTweets([]);
    setShowMenu(false);
  };

  if (!user) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🔖</div>
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Bookmarks</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Please login to see your bookmarks
        </p>
        <Link
          to="/login"
          className="inline-block mt-4 bg-twitter-blue text-white px-6 py-3 rounded-full font-bold hover:bg-blue-600"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-twitter-darker bg-opacity-80 backdrop-blur-md z-10 border-b border-gray-200 dark:border-gray-800">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center space-x-4">
            {isSelectionMode ? (
              <button
                onClick={exitSelectionMode}
                className="p-2 hover:bg-gray-100 dark:hover:bg-twitter-dark rounded-full"
              >
                <FiArrowLeft className="h-5 w-5 dark:text-white" />
              </button>
            ) : (
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-twitter-dark rounded-full">
                <FiBookmark className="h-5 w-5 text-twitter-blue" />
              </button>
            )}
            <div>
              <h1 className="text-xl font-bold dark:text-white">
                {isSelectionMode ? "Select bookmarks" : "Bookmarks"}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                @{user.username}
              </p>
            </div>
          </div>

          {isSelectionMode ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSelectAll}
                className="text-twitter-blue text-sm font-bold px-3 py-2 hover:bg-blue-50 dark:hover:bg-twitter-dark rounded-full"
              >
                {selectedTweets.length === bookmarks.length
                  ? "Deselect all"
                  : "Select all"}
              </button>
              {selectedTweets.length > 0 && (
                <div className="relative">
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-twitter-dark rounded-full"
                  >
                    <FiMoreHorizontal className="h-5 w-5 dark:text-white" />
                  </button>

                  {showMenu && (
                    <div className="dropdown-menu">
                      <button
                        onClick={handleRemoveBookmarks}
                        className="dropdown-item text-red-500"
                      >
                        <FiTrash2 className="h-4 w-4" />
                        <span>
                          Remove {selectedTweets.length} bookmark
                          {selectedTweets.length !== 1 ? "s" : ""}
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={enterSelectionMode}
              className="p-2 hover:bg-gray-100 dark:hover:bg-twitter-dark rounded-full"
              title="Select bookmarks"
            >
              <FiMoreHorizontal className="h-5 w-5 dark:text-white" />
            </button>
          )}
        </div>

        {/* Info bar when in selection mode */}
        {isSelectionMode && (
          <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 px-4 py-2 text-sm text-blue-800 dark:text-blue-300 flex justify-between items-center">
            <span>
              {selectedTweets.length === 0
                ? "Tap on bookmarks to select"
                : `${selectedTweets.length} bookmark${selectedTweets.length !== 1 ? "s" : ""} selected`}
            </span>
            {selectedTweets.length > 0 && (
              <button
                onClick={handleRemoveBookmarks}
                className="text-red-600 dark:text-red-400 font-bold text-sm hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>
        )}
      </div>

      {/* Bookmarks List */}
      {bookmarks.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔖</div>
          <h3 className="text-2xl font-bold mb-2 dark:text-white">
            Save tweets for later
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-6">
            Don't let the good ones fly away! Bookmark Tweets to easily find
            them again in the future.
          </p>
          <Link
            to="/explore"
            className="inline-block bg-twitter-blue text-white px-6 py-3 rounded-full font-bold hover:bg-blue-600"
          >
            Explore Tweets
          </Link>
        </div>
      ) : (
        <div>
          {/* Tweets */}
          {bookmarks.map((tweet) => (
            <div
              key={tweet._id}
              className="relative group hover:bg-gray-50 dark:hover:bg-twitter-dark transition"
            >
              {/* Selection Checkbox - shown only in selection mode */}
              {isSelectionMode && (
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                  <input
                    type="checkbox"
                    checked={selectedTweets.includes(tweet._id)}
                    onChange={() => handleSelectTweet(tweet._id)}
                    className="h-5 w-5 text-twitter-blue rounded border-gray-300 focus:ring-twitter-blue cursor-pointer"
                  />
                </div>
              )}

              <div className={isSelectionMode ? "pl-12" : ""}>
                <TweetCard tweet={tweet} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarksPage;
