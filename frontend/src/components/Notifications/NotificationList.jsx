import React from "react";
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

const NotificationList = ({ notifications }) => {
  const getIcon = (type) => {
    switch (type) {
      case "like":
        return (
          <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-full">
            <FiHeart className="h-4 w-4 text-red-500" />
          </div>
        );
      case "retweet":
        return (
          <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-full">
            <FiRepeat className="h-4 w-4 text-green-500" />
          </div>
        );
      case "follow":
        return (
          <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-full">
            <FiUserPlus className="h-4 w-4 text-blue-500" />
          </div>
        );
      case "mention":
        return (
          <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-full">
            <FiAtSign className="h-4 w-4 text-purple-500" />
          </div>
        );
      case "reply":
        return (
          <div className="p-2 bg-twitter-blue/10 rounded-full">
            <FiMessageCircle className="h-4 w-4 text-twitter-blue" />
          </div>
        );
      default:
        return (
          <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
            <FiStar className="h-4 w-4 text-yellow-500" />
          </div>
        );
    }
  };

  const getMessage = (notification) => {
    switch (notification.type) {
      case "like":
        return (
          <>
            <strong>{notification.sender.name}</strong> liked your tweet
          </>
        );
      case "retweet":
        return (
          <>
            <strong>{notification.sender.name}</strong> retweeted your tweet
          </>
        );
      case "follow":
        return (
          <>
            <strong>{notification.sender.name}</strong> followed you
          </>
        );
      case "mention":
        return (
          <>
            <strong>{notification.sender.name}</strong> mentioned you in a tweet
          </>
        );
      case "reply":
        return (
          <>
            <strong>{notification.sender.name}</strong> replied to your tweet
          </>
        );
      default:
        return (
          <>
            <strong>{notification.sender.name}</strong> interacted with you
          </>
        );
    }
  };

  if (notifications.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔔</div>
        <h3 className="text-xl font-bold mb-2">No notifications yet</h3>
        <p className="text-gray-500">
          When you get notifications, they'll show up here.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100 dark:divide-gray-800">
      {notifications.map((notification) => (
        <div
          key={notification._id}
          className={`p-4 hover:bg-gray-50 dark:hover:bg-twitter-dark transition ${
            !notification.read ? "bg-blue-50 dark:bg-blue-900/10" : ""
          }`}
        >
          <div className="flex space-x-3">
            <div className="flex-shrink-0">{getIcon(notification.type)}</div>

            <div className="flex-1 min-w-0">
              <Link
                to={`/${notification.sender.username}`}
                className="flex items-start space-x-3"
              >
                <img
                  src={
                    notification.sender.profilePicture ||
                    "https://via.placeholder.com/40"
                  }
                  alt={notification.sender.name}
                  className="h-10 w-10 rounded-full flex-shrink-0"
                />

                <div className="flex-1">
                  <p className="text-sm">{getMessage(notification)}</p>

                  {notification.tweet && (
                    <div className="mt-2 p-3 bg-gray-50 dark:bg-twitter-dark rounded-lg text-sm text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-800">
                      {notification.tweet.content}
                    </div>
                  )}

                  <p className="text-xs text-gray-500 mt-2">
                    {formatDistanceToNow(new Date(notification.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </Link>
            </div>

            {!notification.read && (
              <span className="h-2 w-2 bg-twitter-blue rounded-full flex-shrink-0 mt-2"></span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
