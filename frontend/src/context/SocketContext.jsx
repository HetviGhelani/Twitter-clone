import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within SocketProvider");
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]); // This will be used later
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const token = localStorage.getItem("token");

      const newSocket = io(
        process.env.REACT_APP_API_URL?.replace("/api", "") ||
          "http://localhost:5000",
        {
          auth: { token },
          transports: ["websocket", "polling"],
        },
      );

      setSocket(newSocket);

      // Handle connection
      newSocket.on("connect", () => {
        console.log("Connected to socket server");
      });

      // Handle online users - will implement later
      newSocket.on("online-users", (users) => {
        setOnlineUsers(users);
      });

      // Handle new tweet notifications
      newSocket.on("new-tweet", (tweet) => {
        toast.custom(
          (t) => (
            <div
              className={`${t.visible ? "animate-enter" : "animate-leave"} max-w-md w-full bg-white dark:bg-twitter-dark shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={
                        tweet.author.profilePicture ||
                        "https://via.placeholder.com/40"
                      }
                      alt=""
                    />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {tweet.author.name}
                    </p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      posted a new tweet
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-twitter-blue hover:text-blue-500 focus:outline-none"
                >
                  Close
                </button>
              </div>
            </div>
          ),
          {
            duration: 4000,
            position: "top-right",
          },
        );
      });

      // Handle notifications
      newSocket.on("notification", (notification) => {
        setNotifications((prev) => [notification, ...prev]);

        let message = "";
        switch (notification.type) {
          case "like":
            message = `${notification.user.name} liked your tweet`;
            break;
          case "retweet":
            message = `${notification.user.name} retweeted your tweet`;
            break;
          case "follow":
            message = `${notification.user.name} followed you`;
            break;
          case "reply":
            message = `${notification.user.name} replied to your tweet`;
            break;
          default:
            message = `New notification`;
        }

        toast.success(message, {
          icon: "🔔",
          duration: 4000,
        });
      });

      // Handle typing indicator
      newSocket.on("typing", ({ user, isTyping }) => {
        console.log(`${user.name} is ${isTyping ? "typing" : "not typing"}`);
      });

      // Handle private messages
      newSocket.on("private-message", (message) => {
        toast.custom(
          (t) => (
            <div
              className={`${t.visible ? "animate-enter" : "animate-leave"} max-w-md w-full bg-white dark:bg-twitter-dark shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={
                        message.sender.profilePicture ||
                        "https://via.placeholder.com/40"
                      }
                      alt=""
                    />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {message.sender.name}
                    </p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {message.content}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-twitter-blue hover:text-blue-500 focus:outline-none"
                >
                  View
                </button>
              </div>
            </div>
          ),
          {
            duration: 4000,
            position: "top-right",
          },
        );
      });

      // Handle message sent confirmation
      newSocket.on("message-sent", (message) => {
        console.log("Message sent:", message);
      });

      return () => {
        newSocket.close();
      };
    }
  }, [user]);

  // Emit events
  const emitNewTweet = (tweet) => {
    if (socket) {
      socket.emit("new-tweet", tweet);
    }
  };

  const emitLike = (tweet, likedBy) => {
    if (socket) {
      socket.emit("like-tweet", { tweet, likedBy });
    }
  };

  const emitRetweet = (tweet, retweetedBy) => {
    if (socket) {
      socket.emit("retweet-tweet", { tweet, retweetedBy });
    }
  };

  const emitFollow = (follower, following) => {
    if (socket) {
      socket.emit("follow-user", { follower, following });
    }
  };

  const emitReply = (originalTweet, reply, repliedBy) => {
    if (socket) {
      socket.emit("reply-tweet", { originalTweet, reply, repliedBy });
    }
  };

  const emitTyping = (recipientId, isTyping) => {
    if (socket) {
      socket.emit("typing", { recipientId, isTyping });
    }
  };

  const sendPrivateMessage = (recipientId, message) => {
    if (socket) {
      socket.emit("private-message", { recipientId, message });
    }
  };

  const value = {
    socket,
    onlineUsers,
    notifications,
    emitNewTweet,
    emitLike,
    emitRetweet,
    emitFollow,
    emitReply,
    emitTyping,
    sendPrivateMessage,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
