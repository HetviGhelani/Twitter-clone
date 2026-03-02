import React, { useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import {
  FiHeart,
  FiRepeat,
  FiUserPlus,
  FiAtSign,
  FiMessageCircle,
  FiStar,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const NotificationsPage = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState("all");
  const [loading] = useState(false);

  // Mock notifications data
  const mockNotifications = [
    {
      id: 1,
      type: "like",
      user: {
        username: "johndoe",
        name: "John Doe",
        profilePicture: "https://via.placeholder.com/40",
        _id: "101",
      },
      tweet: {
        _id: "t1",
        content: "This is a sample tweet about React hooks...",
      },
      createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    },
    {
      id: 2,
      type: "retweet",
      user: {
        username: "janedoe",
        name: "Jane Doe",
        profilePicture: "https://via.placeholder.com/40",
        _id: "102",
      },
      tweet: {
        _id: "t2",
        content: "Another sample tweet about JavaScript...",
      },
      createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    },
    {
      id: 3,
      type: "follow",
      user: {
        username: "bobsmith",
        name: "Bob Smith",
        profilePicture: "https://via.placeholder.com/40",
        _id: "103",
      },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
    {
      id: 4,
      type: "mention",
      user: {
        username: "alicewonder",
        name: "Alice Wonder",
        profilePicture: "https://via.placeholder.com/40",
        _id: "104",
      },
      tweet: {
        _id: "t4",
        content: "Hey @you check out this cool thread!",
      },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    },
    {
      id: 5,
      type: "reply",
      user: {
        username: "charliebrown",
        name: "Charlie Brown",
        profilePicture: "https://via.placeholder.com/40",
        _id: "105",
      },
      tweet: {
        _id: "t5",
        content: "I completely agree with your point!",
      },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    },
    {
      id: 6,
      type: "like",
      user: {
        username: "emmawatson",
        name: "Emma Watson",
        profilePicture: "https://via.placeholder.com/40",
        _id: "106",
      },
      tweet: {
        _id: "t6",
        content: "Great article on web development trends...",
      },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    },
  ];

  // Filter notifications based on selected filter
  const getFilteredNotifications = () => {
    if (filter === "all") return mockNotifications;
    return mockNotifications.filter((n) => n.type === filter);
  };

  const notifications = getFilteredNotifications();

  const getNotificationIcon = (type) => {
    switch (type) {
      case "like":
        return (
          <div className="p-2 bg-red-100 rounded-full">
            <FiHeart className="h-5 w-5 text-red-500" />
          </div>
        );
      case "retweet":
        return (
          <div className="p-2 bg-green-100 rounded-full">
            <FiRepeat className="h-5 w-5 text-green-500" />
          </div>
        );
      case "follow":
        return (
          <div className="p-2 bg-blue-100 rounded-full">
            <FiUserPlus className="h-5 w-5 text-blue-500" />
          </div>
        );
      case "mention":
        return (
          <div className="p-2 bg-purple-100 rounded-full">
            <FiAtSign className="h-5 w-5 text-purple-500" />
          </div>
        );
      case "reply":
        return (
          <div className="p-2 bg-twitter-blue bg-opacity-10 rounded-full">
            <FiMessageCircle className="h-5 w-5 text-twitter-blue" />
          </div>
        );
      default:
        return (
          <div className="p-2 bg-yellow-100 rounded-full">
            <FiStar className="h-5 w-5 text-yellow-500" />
          </div>
        );
    }
  };

  const getNotificationText = (notification) => {
    switch (notification.type) {
      case "like":
        return (
          <span>
            <Link
              to={`/${notification.user.username}`}
              className="font-bold hover:underline"
            >
              {notification.user.name}
            </Link>{" "}
            liked your tweet
          </span>
        );
      case "retweet":
        return (
          <span>
            <Link
              to={`/${notification.user.username}`}
              className="font-bold hover:underline"
            >
              {notification.user.name}
            </Link>{" "}
            retweeted your tweet
          </span>
        );
      case "follow":
        return (
          <span>
            <Link
              to={`/${notification.user.username}`}
              className="font-bold hover:underline"
            >
              {notification.user.name}
            </Link>{" "}
            followed you
          </span>
        );
      case "mention":
        return (
          <span>
            <Link
              to={`/${notification.user.username}`}
              className="font-bold hover:underline"
            >
              {notification.user.name}
            </Link>{" "}
            mentioned you in a tweet
          </span>
        );
      case "reply":
        return (
          <span>
            <Link
              to={`/${notification.user.username}`}
              className="font-bold hover:underline"
            >
              {notification.user.name}
            </Link>{" "}
            replied to your tweet
          </span>
        );
      default:
        return (
          <span>
            <Link
              to={`/${notification.user.username}`}
              className="font-bold hover:underline"
            >
              {notification.user.name}
            </Link>{" "}
            interacted with you
          </span>
        );
    }
  };

  if (!user) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🔔</div>
        <h2 className="text-2xl font-bold mb-4">Notifications</h2>
        <p className="text-gray-600">Please login to see your notifications</p>
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
      <div className="sticky top-0 bg-white bg-opacity-80 backdrop-blur-md z-10 border-b border-gray-200">
        <h1 className="text-xl font-bold p-4">Notifications</h1>

        {/* Filter Tabs */}
        <div className="flex border-b overflow-x-auto hide-scrollbar">
          {[
            { id: "all", label: "All" },
            { id: "mentions", label: "Mentions" },
            { id: "likes", label: "Likes" },
            { id: "retweets", label: "Retweets" },
            { id: "follows", label: "Follows" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`flex-1 py-3 font-medium capitalize transition ${
                filter === tab.id
                  ? "text-twitter-blue border-b-2 border-twitter-blue"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-twitter-blue"></div>
        </div>
      ) : (
        /* Notifications List */
        <div className="divide-y divide-gray-100">
          {notifications.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔔</div>
              <h3 className="text-xl font-bold mb-2">No notifications yet</h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                {filter === "all"
                  ? "When you get notifications, they'll show up here."
                  : `No ${filter} notifications yet.`}
              </p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="p-4 hover:bg-gray-50 transition"
              >
                <div className="flex space-x-3">
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start space-x-3">
                      <Link to={`/${notification.user.username}`}>
                        <img
                          src={
                            notification.user.profilePicture ||
                            "https://via.placeholder.com/40"
                          }
                          alt={notification.user.name}
                          className="h-10 w-10 rounded-full hover:opacity-90 transition"
                        />
                      </Link>

                      <div className="flex-1">
                        <p className="text-sm">
                          {getNotificationText(notification)}
                        </p>

                        {notification.tweet && (
                          <Link to={`/tweet/${notification.tweet._id}`}>
                            <div className="mt-2 p-3 bg-gray-50 rounded-lg text-gray-600 text-sm hover:bg-gray-100 transition">
                              {notification.tweet.content}
                            </div>
                          </Link>
                        )}

                        <p className="text-xs text-gray-500 mt-2">
                          {formatDistanceToNow(
                            new Date(notification.createdAt),
                            { addSuffix: true },
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
